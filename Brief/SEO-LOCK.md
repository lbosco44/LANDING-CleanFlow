# SEO-LOCK — CleanFlow Landing

> Creato il **31 luglio 2026**, chiusura della Fase 1 SEO.
> Complementare a [`SEO.md`](SEO.md): quello dice *cosa* vogliamo posizionare, questo dice *cosa non si può rompere*.

## A cosa serve questo file

La landing verrà **ridisegnata esteticamente**. Google non vede i pixel: vede URL, testo, gerarchia degli heading, structured data e velocità. Questo file elenca gli elementi che *devono sopravvivere* al redesign.

**Regola d'oro**: il redesign può cambiare **tutto quello che si vede**, non quello che si legge.

| ✅ Il redesign può cambiare liberamente | ⛔ Il redesign NON può toccare senza rifare la SEO |
|---|---|
| Palette, font, spaziature, ombre, bordi | Gli URL delle pagine |
| Layout, griglie, ordine visivo delle sezioni | Il testo dei titoli H1 e H2 |
| Animazioni, transizioni, micro-interazioni | I paragrafi che contengono le keyword |
| Immagini decorative, texture, sfondi | I blocchi JSON-LD |
| Componenti UI, bottoni, card | Le domande delle FAQ (vedi sotto) |
| Il *modo* in cui il testo è presentato | Il *contenuto* del testo |

Se una di queste cose deve cambiare davvero, **si può** — ma va messo a piano: serve un redirect 301, o un aggiornamento dello schema, o una nuova verifica. Non è vietato, è vietato farlo *per sbaglio*.

---

## 1. URL congelati

Questi URL sono in `sitemap.xml` e verranno indicizzati. Cambiarli senza un redirect 301 azzera il posizionamento accumulato.

| URL | Ruolo | Indicizzato |
|---|---|---|
| `/` | Home — keyword madre | ✅ priority 1.0 |
| `/funzioni/entrate` | Preventivi e incassi | ✅ 0.7 |
| `/funzioni/clienti` | Anagrafica clienti | ✅ 0.7 |
| `/funzioni/strutture` | Strutture e sedi | ✅ 0.7 |
| `/funzioni/operatori` | App operatori e turni | ✅ 0.7 |
| `/funzioni/calendario` | Calendario interventi | ✅ 0.7 |
| `/demo` | Conversione | ✅ 0.8 |
| `/privacy` `/termini` `/cookie` | Legali | ✅ 0.2 |
| `/grazie` | Post-submit | ⛔ `noindex, nofollow` — **deve restare noindex** |

**Canonical**: ogni pagina indicizzata dichiara il proprio canonical assoluto via `alternates.canonical` nel suo `export const metadata`. Una pagina nuova senza canonical è un errore: va aggiunto.

---

## 2. Gerarchia heading congelata

Regola strutturale: **un solo `<h1>` per pagina**, sezioni in `<h2>`, sotto-sezioni in `<h3>`. Mai saltare livelli per ragioni estetiche (se un titolo deve essere piccolo, si rimpicciolisce con il CSS, non si declassa da `h2` a `p`).

### `/` — Home
- **H1**: `La tua impresa di pulizie, finalmente sotto controllo.`
  → **APPROVATA in COPY.md (opzione B)**. Contiene già la keyword «impresa di pulizie». L'eyebrow immediatamente sopra (`Gestionale per imprese di pulizie`) porta il resto della keyword madre: **è testo visibile e conta**. Se il redesign elimina l'eyebrow, la keyword madre va reintrodotta altrove sopra la piega.
- **9 H2**, in ordine: `Tieni insieme tutto a mano.` · `Tutto in un'unica sala di controllo.` · `Dal cliente al lavoro fatto, in un unico flusso.` · `Meno tempo a coordinare. Più tempo per far crescere l'azienda.` · `Scegli il piano su misura per te.` · `Quello che i titolari ci chiedono.` · `Siamo in tre. Quando chiami, rispondiamo noi.` · `C'è chi ha scommesso su di noi prima dei numeri.` · `Riprenditi le tue ore.`

### Pagine funzione
| Pagina | H1 | H2 |
|---|---|---|
| `/funzioni/entrate` | `Dal preventivo all'incasso, senza fogli.` | 6 |
| `/funzioni/clienti` | `Ogni cliente al suo posto, una volta sola.` | 3 |
| `/funzioni/strutture` | `Ogni struttura con indirizzo e note d'accesso.` | 3 |
| `/funzioni/operatori` | `Chi lavora dove, e a che punto è.` | 4 |
| `/funzioni/calendario` | `Pianifichi in minuti, non a telefonate.` | 4 |

### `/demo`
- **H1**: `Una demo di 20 minuti, sui tuoi dati.` — nessun H2 (pagina form, va bene così).

---

## 3. Meta congelati

Title e description vivono nell'`export const metadata` di ogni pagina. Sono stati scritti per keyword: **non sono copy di design, non vanno "resi più belli"**.

| Pagina | Title (senza suffisso `| CleanFlow`) | Keyword servita |
|---|---|---|
| `/` | `Gestionale per imprese di pulizie` | keyword madre |
| `/funzioni/calendario` | `Calendario interventi per imprese di pulizie` | pianificazione interventi |
| `/funzioni/clienti` | `Gestione clienti per imprese di pulizie` | anagrafica clienti |
| `/funzioni/strutture` | `Gestione strutture per imprese di pulizie` | sedi/strutture |
| `/funzioni/operatori` | `App operatori e turni per imprese di pulizie` | app operatori pulizie |
| `/funzioni/entrate` | `Preventivi e incassi per imprese di pulizie` | preventivi/incassi |
| `/demo` | `Prenota una demo — 20 minuti, nessun impegno` | brand + conversione |

Vincoli: title ≤ 60 caratteri **suffisso incluso**, description ≤ 155.

---

## 4. Structured data attivo

| Schema | Dove | File |
|---|---|---|
| `Organization` (+ `areaServed: IT`) | Home | `components/site/json-ld.tsx` |
| `WebSite` | Home | idem |
| `SoftwareApplication` (+ 3 `Offer`) | Home | idem |
| `FAQPage` | Home | idem, alimentato da `faq-data.ts` |
| `BreadcrumbList` | Ogni `/funzioni/*` | `FunzioneJsonLd` in `json-ld.tsx`, montato da `funzione-shell.tsx` |

**Vincoli che Google verifica davvero:**
1. **Le FAQ nello schema devono essere identiche al testo visibile.** Oggi lo sono per costruzione: sia il componente `<Faq />` sia il JSON-LD leggono la stessa costante `FAQS` in `faq-data.ts`. **Non duplicare mai quel testo**: se il redesign riscrive le FAQ in JSX a mano, lo schema diventa una dichiarazione falsa.
2. **I prezzi nello schema devono essere visibili in pagina.** Oggi `Offer` dichiara 99 / 129 / 199 € e la sezione Prezzi li mostra. Se il redesign nasconde i prezzi (o li sposta dietro la demo), gli `offers` vanno rimossi dallo schema.
3. **Niente `aggregateRating` / `review` finché non ci sono recensioni vere.** Inventarle viola le linee guida Google e può costare una penalizzazione manuale.
4. **NON usare `LocalBusiness`.** CleanFlow è un SaaS nazionale, non un'attività locale (vedi `SEO.md` §Schema).

---

## 4-bis. File machine-readable per le AI (Fase 2)

| File | Generato da | Serve a |
|---|---|---|
| `/llms.txt` | `app/llms.txt/route.ts` | Dare a ChatGPT/Perplexity/Claude l'anagrafica del prodotto senza interpretare il layout |
| `/pricing.md` | `app/pricing.md/route.ts` | Far entrare CleanFlow nei confronti fatti dagli assistenti AI per conto di chi compra |

**Entrambi si generano da `lib/piani.ts`**, che è ora la **sorgente unica dei prezzi**. Prima gli stessi numeri erano ricopiati in tre punti (card dei prezzi, intestazione della tabella di confronto, `offers` del JSON-LD): bastava aggiornarne uno per far dichiarare a Google un prezzo diverso da quello mostrato in pagina.

⛔ **Se il redesign riscrive la sezione Prezzi, deve continuare a leggere da `lib/piani.ts`.** Reintrodurre i numeri a mano nel JSX rompe in silenzio schema, `llms.txt` e `pricing.md` tutti insieme.

Verificato il 01/08/2026: **GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended e Bingbot accedono tutti al sito (200)**. Se un giorno le AI smettessero di citare il sito, ricontrollare qui per primo: un blocco bot lato Vercel o un `Disallow` in `robots.ts` renderebbe inutile ogni altra ottimizzazione.

## 5. Tecnica da non perdere nel redesign

- `lang="it"` sull'`<html>` e `og:locale="it_IT"`.
- `metadataBase` = `https://cleanflowapp.it` in `app/layout.tsx`.
- `app/sitemap.ts` e `app/robots.ts`: se nasce una pagina nuova, **va aggiunta alla sitemap** (le `/funzioni/*` si aggiungono da sole tramite `lib/funzioni.ts`).
- **`next/font`** con `display: swap` — mai passare a `<link>` di Google Fonts o a font caricati via CSS `@import`: peggiora l'LCP.
- **`next/image`** su ogni immagine, con `priority` solo sull'immagine sopra la piega. Mai `<img>` nudo.
- **Il testo deve stare nell'HTML**, non dentro le immagini e non generato solo da JavaScript client-side. Attenzione agli effetti scroll: se una sezione esiste nel DOM solo dopo l'interazione, Google può non vederla.
- **Riservare sempre lo spazio** a immagini e widget (aspect-ratio o width/height espliciti): oggi il CLS è **0**, ed è un vantaggio da non buttare.

### Baseline prestazionale da non peggiorare
Misurata sul sito live il 31/07/2026, viewport mobile 390×844, rete non limitata (quindi **ottimistica in assoluto, valida come confronto prima/dopo**):

| Metrica | Valore |
|---|---|
| LCP | 676 ms — elemento: il bottone `Prenota una demo` (testo, nessuna immagine da scaricare) |
| CLS | 0 |
| FCP | 676 ms |
| TTFB | ~180 ms |
| Peso pagina | ~341 KB su 28 richieste |

Il dato di verità saranno i **Core Web Vitals reali in Search Console** (dati di campo CrUX), disponibili dopo qualche settimana di traffico.

---

## 6. Checklist da eseguire DOPO il redesign

Mezz'ora di verifica, non un rifacimento:

- [ ] Gli URL sono gli stessi di §1 (o esistono i redirect 301)
- [ ] Ogni pagina ha ancora il suo canonical corretto
- [ ] Un solo H1 per pagina, testo invariato rispetto a §2
- [ ] I title/description di §3 sono intatti
- [ ] I 5 schema di §4 sono ancora nell'HTML → verificare con **Rich Results Test**
- [ ] Le FAQ visibili coincidono ancora con `faq-data.ts`
- [ ] `sitemap.xml` e `robots.txt` rispondono
- [ ] `/grazie` è ancora `noindex`
- [ ] CLS ancora ≈ 0 e LCP non peggiorato rispetto a §5
- [ ] Search Console → nessun nuovo errore in «Indicizzazione delle pagine»

---

## 7. Aperti (non bloccanti per il redesign)

- `sameAs` in `Organization`: manca l'URL LinkedIn aziendale. Da aggiungere quando esiste.
- Nessun contenuto oltre le pagine prodotto: il blog/guide è la Fase 3 del piano SEO ed è **indipendente dal redesign** (pagine nuove, non toccate dal restyle della home).
