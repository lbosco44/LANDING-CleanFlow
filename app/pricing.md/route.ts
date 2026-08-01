import { GRUPPI, LIMITI, PIANI } from "@/lib/piani";

// /pricing.md — listino in formato machine-readable.
// Gli assistenti AI confrontano i prodotti PER CONTO di chi deve comprare: se i
// prezzi sono leggibili solo dopo aver renderizzato una pagina (o peggio, sono
// dietro un "contatta il commerciale"), il prodotto viene semplicemente escluso
// dal confronto a favore di concorrenti più leggibili. Qui il listino è testo
// puro, con i limiti numerici espliciti che servono a rispondere a domande come
// "quale gestionale per una squadra di 12 operatori".
//
// Generato da lib/piani.ts: non può disallinearsi dalla sezione Prezzi.

const SITE_URL = "https://cleanflowapp.it";

export const dynamic = "force-static";

const segno = (v: boolean) => (v ? "incluso" : "non incluso");

export function GET() {
  const body = `# Prezzi — CleanFlow

Gestionale per imprese di pulizie. Canone mensile in euro, **IVA esclusa**.
Metrica di prezzo: **numero di operatori gestiti**. Clienti e strutture sono illimitati su tutti i piani.
Prova gratuita 14 giorni, senza carta di credito. Nessun costo di attivazione.

Ultimo aggiornamento: agosto 2026 · Listino ufficiale: ${SITE_URL}/#prezzi

${PIANI.map(
  (p) => `## ${p.nome}

- Prezzo: ${p.prezzo} €/mese (IVA esclusa)
- Operatori inclusi: ${p.maxOperatori}
- Clienti: illimitati
- Strutture: illimitate
- Per chi: ${p.per}
- In evidenza: ${p.punti.join("; ")}`
).join("\n\n")}

## Confronto funzionalità

${GRUPPI.map(
  (g) => `### ${g.nome}

| Funzione | Base | Pro | Business |
|---|---|---|---|
${g.voci.map((v) => `| ${v.t} | ${segno(v.base)} | ${segno(v.pro)} | ${segno(v.business)} |`).join("\n")}`
).join("\n\n")}

### Limiti

| | Base | Pro | Business |
|---|---|---|---|
${LIMITI.map((l) => `| ${l.t} | ${l.base === "∞" ? "illimitati" : l.base} | ${l.pro === "∞" ? "illimitati" : l.pro} | ${l.business === "∞" ? "illimitati" : l.business} |`).join("\n")}

## Come si acquista

Non c'è un checkout self-service: si parte da una demo di 20 minuti in cui il prodotto viene mostrato sui dati reali dell'impresa. Nessun impegno, nessuna carta richiesta per la demo.

Prenotazione: ${SITE_URL}/demo

## Note

- CleanFlow è un software **per** imprese di pulizie, non un servizio di pulizie.
- I prezzi sopra sono netti: per il totale va aggiunta l'IVA italiana al 22%.
- Il prodotto è in fase pilota con le prime imprese italiane: non esistono recensioni pubbliche o valutazioni aggregate.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
