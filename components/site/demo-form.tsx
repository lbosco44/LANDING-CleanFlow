"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPERATORI = ["Solo io", "2-5", "6-15", "15+"];
const TOOLS = ["WhatsApp", "Excel", "Carta / agenda", "Un altro software", "Niente"];

export function DemoForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [op, setOp] = useState("");
  const [azienda, setAzienda] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [gdpr, setGdpr] = useState(false);
  // Honeypot anti-bot: campo invisibile agli umani. Se valorizzato → è un bot.
  const [website, setWebsite] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleTool = (t: string) =>
    setTools((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !tel.trim() || !op) {
      setErr("Compila nome, telefono e numero di operatori.");
      return;
    }
    if (!gdpr) {
      setErr("Per procedere serve il consenso al trattamento dei dati.");
      return;
    }
    setErr("");
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefono: tel,
          operatori: op,
          azienda,
          tools,
          website, // honeypot
        }),
      });
    } catch {
      // non blocchiamo l'utente: prosegue comunque
    }
    router.push("/grazie");
  }

  const labelCls = "block text-sm font-medium text-foreground";
  const inputCls =
    "mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3.5 text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring";
  const chip = (active: boolean) =>
    cn(
      "rounded-lg border px-3.5 text-sm font-medium transition-colors",
      active
        ? "border-accent bg-accent-soft text-accent-ink"
        : "border-border bg-card text-muted-foreground hover:border-accent/40"
    );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nome" className={labelCls}>
          Nome <span className="text-accent-ink">*</span>
        </label>
        <input
          id="nome"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputCls}
          placeholder="Il tuo nome"
        />
      </div>

      <div>
        <label htmlFor="tel" className={labelCls}>
          Telefono <span className="text-accent-ink">*</span>
        </label>
        <input
          id="tel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className={inputCls}
          placeholder="Es. 333 1234567"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email{" "}
          <span className="font-normal text-muted-foreground">(facoltativa)</span>
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="La tua email (per la conferma)"
        />
      </div>

      {/* Honeypot: fuori schermo, ignorato dagli umani, riempito dai bot. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Non compilare questo campo</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <span className={labelCls}>
          Quanti operatori siete? <span className="text-accent-ink">*</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {OPERATORI.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOp(o)}
              className={cn(chip(op === o), "h-10 px-4")}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="azienda" className={labelCls}>
          Nome dell&apos;impresa{" "}
          <span className="font-normal text-muted-foreground">(facoltativo)</span>
        </label>
        <input
          id="azienda"
          autoComplete="organization"
          value={azienda}
          onChange={(e) => setAzienda(e.target.value)}
          className={inputCls}
          placeholder="La tua impresa"
        />
      </div>

      <div>
        <span className={labelCls}>
          Cosa usi oggi?{" "}
          <span className="font-normal text-muted-foreground">(facoltativo)</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTool(t)}
              className={cn(chip(tools.includes(t)), "h-9")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
          className="mt-0.5 size-4 rounded border-input accent-accent"
        />
        <span>
          Ho letto la{" "}
          <a
            href="/privacy"
            className="font-medium text-accent-ink underline underline-offset-2"
          >
            Privacy policy
          </a>{" "}
          e acconsento al trattamento dei dati per essere ricontattato.
        </span>
      </label>

      {err && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {err}
        </p>
      )}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? "Invio…" : "Prenota la demo"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Ti rispondiamo entro 24 ore. Nessun call center.
      </p>
    </form>
  );
}
