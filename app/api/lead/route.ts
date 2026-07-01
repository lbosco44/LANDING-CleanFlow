import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Riceve il lead dal form /demo e:
//  1) lo salva nella tabella `leads` di Supabase (CRM interno, visibile in HQ)
//  2) invia una notifica interna via Resend (rete di sicurezza)
//  3) opzionalmente lo inoltra a n8n (se N8N_WEBHOOK_URL impostato)
// Env su Vercel:
//  - SUPABASE_URL          (es. https://<ref>.supabase.co)
//  - SUPABASE_ANON_KEY     (chiave pubblica; RLS consente solo INSERT su leads)
//  - RESEND_API_KEY        (segreto, key sending-only del dominio cleanflowapp.it)
//  - LEAD_NOTIFY_TO        (destinatario/i notifiche, separati da virgola)
//  - LEAD_FROM             (mittente verificato, default noreply@cleanflowapp.it)
//  - N8N_WEBHOOK_URL       (facoltativo)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nome, email, telefono, operatori, azienda, tools, website } =
      data ?? {};

    // Honeypot: se il campo invisibile è valorizzato, è un bot. Rispondiamo ok
    // (per non dare feedback all'attaccante) ma non facciamo NULLA.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Un lead senza nome o senza un contatto non serve a niente: scarto silenzioso.
    if (!nome || (!telefono && !email)) {
      return NextResponse.json({ ok: true });
    }

    const toolsArr = Array.isArray(tools) ? tools : [];

    // 1) Salvataggio in Supabase (best-effort: se fallisce, la mail resta la rete).
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from("leads").insert({
          nome,
          email: email || null,
          telefono: telefono || null,
          operatori: operatori || null,
          azienda: azienda || null,
          tools: toolsArr,
          source: "landing-demo",
        });
        if (error) console.error("Supabase lead insert error:", error.message);
      } catch (e) {
        console.error("Supabase lead insert threw:", e);
      }
    }

    // 2) Notifica email (rete di sicurezza).
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_NOTIFY_TO;
    const from = process.env.LEAD_FROM ?? "CleanFlow <noreply@cleanflowapp.it>";

    if (apiKey && to) {
      const resend = new Resend(apiKey);
      const usati = toolsArr.length ? toolsArr.join(", ") : "—";
      const rows: [string, string][] = [
        ["Nome", nome || "—"],
        ["Email", email || "—"],
        ["Telefono", telefono || "—"],
        ["Operatori", operatori || "—"],
        ["Impresa", azienda || "—"],
        ["Usa oggi", usati],
      ];
      const text =
        `Nuova richiesta di demo dalla landing CleanFlow.\n\n` +
        rows.map(([k, v]) => `${k}: ${v}`).join("\n");
      const html = `
        <div style="font-family:system-ui,sans-serif;color:#0e1430">
          <h2 style="margin:0 0 12px">Nuova richiesta di demo</h2>
          <p style="margin:0 0 16px;color:#5a6478">Arrivata dalla landing CleanFlow.</p>
          <table style="border-collapse:collapse;font-size:15px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 16px 6px 0;color:#5a6478">${k}</td><td style="padding:6px 0;font-weight:600">${v}</td></tr>`
              )
              .join("")}
          </table>
        </div>`;

      await resend.emails
        .send({
          from,
          to: to.split(",").map((s) => s.trim()),
          // Se il lead ha lasciato l'email, rispondere alla notifica scrive a lui.
          replyTo: email || undefined,
          subject: `Nuovo lead demo — ${nome || "Sconosciuto"}${
            azienda ? ` (${azienda})` : ""
          }`,
          text,
          html,
        })
        .catch((e) => console.error("Resend send error:", e));
    }

    // 3) Webhook opzionale.
    const webhook = process.env.N8N_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefono,
          operatori,
          azienda,
          tools: toolsArr,
          source: "landing-demo",
          receivedAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
