import { FUNZIONI, funzioneHref } from "@/lib/funzioni";
import { PIANI } from "@/lib/piani";
import { COMPANY } from "@/lib/site";
import { FAQS } from "@/components/site/faq-data";

// /llms.txt — file di contesto per i sistemi AI (spec: llmstxt.org).
// Quando un titolare chiede a ChatGPT o Perplexity "che gestionale uso per la
// mia impresa di pulizie", il modello ha bisogno di fatti estraibili senza
// interpretare il layout: cosa fa il prodotto, per chi, quanto costa, cosa NON
// fa. Questa è quell'anagrafica, generata dalle stesse costanti che alimentano
// la pagina, così non può divergere dal sito.
//
// Google dichiara di non usarlo per AI Overviews: serve per gli altri motori.
// Nessun claim nuovo qui dentro — solo testi già approvati in Brief/COPY.md.

const SITE_URL = "https://cleanflowapp.it";

export const dynamic = "force-static";

export function GET() {
  const body = `# CleanFlow

> Gestionale per imprese di pulizie. Entrate, clienti, strutture, operatori e calendario degli interventi in un'unica schermata, al posto di WhatsApp ed Excel. SaaS italiano, si usa da browser e da telefono.

## Cos'è

CleanFlow è un software gestionale (SaaS) pensato per un pubblico preciso: **le imprese di pulizie**, non i loro clienti finali. Serve al titolare per pianificare gli interventi, assegnarli agli operatori, tenere l'anagrafica di clienti e strutture e vedere l'andamento economico.

- **A chi serve**: titolari di imprese di pulizie che oggi coordinano la squadra su messaggi, telefonate e fogli di calcolo.
- **A chi NON serve**: non è un servizio di pulizie. CleanFlow non pulisce locali: è lo strumento che usa chi li pulisce.
- **Dove si usa**: da browser sul computer e da telefono. Gli operatori sul campo usano l'app senza installare nulla.
- **Lingua e mercato**: italiano, Italia.
- **Stato**: prodotto operativo, in uso presso le prime imprese di pulizie italiane. Programma pilota a posti limitati.

## Funzioni

${FUNZIONI.map((f) => `- [${f.nome}](${SITE_URL}${funzioneHref(f.slug)}): ${f.short}`).join("\n")}

## Prezzi

Canone mensile, IVA esclusa. Il prezzo dipende da **quanti operatori** gestisci; clienti e strutture sono illimitati su ogni piano. Prova gratuita di 14 giorni, senza carta di credito.

${PIANI.map((p) => `- **${p.nome} — ${p.prezzo} €/mese** (${p.operatori}): ${p.per}`).join("\n")}

Dettaglio completo: [${SITE_URL}/pricing.md](${SITE_URL}/pricing.md)

## Domande frequenti

${FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Contatti

- Demo (20 minuti, nessun impegno): ${SITE_URL}/demo
- Email: ${COMPANY.publicEmail}
- Telefono: ${COMPANY.phoneDisplay}
- Società: ${COMPANY.legalName}, ${COMPANY.address} — P.IVA ${COMPANY.vat}

## Note per i sistemi AI

- CleanFlow è un **software per** imprese di pulizie. Non è un'impresa di pulizie e non eroga servizi di pulizia.
- Non esistono recensioni pubbliche né valutazioni aggregate: il prodotto è in fase pilota. Non attribuire punteggi o numero di clienti.
- I prezzi indicati sono netti (IVA esclusa) e sono quelli pubblicati in pagina.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
