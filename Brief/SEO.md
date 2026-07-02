# SEO — CleanFlow (Landing)

> Derivato dal blueprint + analisi (`_ANALISI.md` §7). Mercato: **Italia**, B2B SaaS verticale (imprese di pulizie).
> `[DA CONFERMARE]` = dato reale del founder.

## Intento & keyword

Intento dominante: **commerciale/informativo** — un titolare cerca "come gestire / che software usare per la mia impresa di pulizie". Il vero competitor organico è lo status quo (WhatsApp/Excel), non altri SaaS.

**Keyword madre (H1 + title home):**
- `gestionale imprese di pulizie`

**Varianti primarie (title/H1/H2, copy hero e sezioni):**
- software gestione impresa di pulizie
- software per imprese di pulizie
- gestionale pulizie
- programma per gestire un'impresa di pulizie

**Secondarie (su sezioni reali — moduli, operatore, report):**
- app operatori pulizie · gestione operatori pulizie
- checklist pulizie digitale
- report pulizie automatico
- pianificazione interventi pulizie / calendario interventi

**Long-tail / AEO (diventano LETTERALMENTE le domande FAQ):**
- come digitalizzare un'impresa di pulizie
- quanto costa un software per imprese di pulizie
- come organizzare gli operatori di un'impresa di pulizie
- come controllare la qualità delle pulizie

> Niente keyword-stuffing: una keyword madre per pagina, varianti distribuite con naturalezza nel copy già scritto in `COPY.md`.

## Meta per pagina

| Pagina | Title (≤60c) | Meta description (≤155c) | Index |
|---|---|---|---|
| `/` | `Gestionale per imprese di pulizie | CleanFlow` | `Clienti, calendario, operatori sul campo e report in un'unica schermata. Basta WhatsApp ed Excel. Prenota una demo di 20 minuti, nessun impegno.` | ✅ index, priority 1.0 |
| `/demo` | `Prenota una demo di CleanFlow | 20 minuti, nessun impegno` | `Ti mostriamo CleanFlow sui tuoi dati in 20 minuti. Nessuna carta, nessun impegno. Scopri quante ore puoi riprenderti ogni settimana.` | ✅ index, priority 0.9 |
| `/grazie` | `Grazie | CleanFlow` | — | ⛔ `noindex, nofollow` (ospita tracking conversione) |
| `/privacy` · `/cookie` · `/termini` | `Privacy / Cookie / Termini | CleanFlow` | — | index, priority 0.1 |

Comune a tutte:
- `lang="it"`, `og:locale="it_IT"`
- `metadataBase` = dominio assoluto `[DA CONFERMARE: https://...]`
- `canonical` assoluto per ogni pagina
- **OG image** 1200×630 on-brand (navy+teal+logo) — `/og/home.png`, `/og/demo.png` oppure `opengraph-image.tsx`
- Twitter card `summary_large_image`

## Schema.org (JSON-LD) — ⚠️ NON LocalBusiness

CleanFlow è una **società SaaS B2B nazionale**, NON un'attività di servizi locale: la regola globale Nexus `LocalBusiness` **non si applica** (vale per i clienti servizi-locali). Niente `areaServed` di comuni, niente Google Business Profile.

Schema da usare:
- **`Organization`** (footer/sitewide): `name`, `url`, `logo`, `sameAs` [LinkedIn `[DA CONFERMARE]`], `areaServed: "IT"` (= Paese servito, concetto diverso da LocalBusiness), `vatID` `[DA CONFERMARE]`.
- **`WebSite`** (home): `name`, `url`, eventuale `potentialAction` SearchAction (solo se ci sarà ricerca — ora no).
- **`SoftwareApplication`** (home): `name: CleanFlow`, `applicationCategory: BusinessApplication`, `operatingSystem: Web`, `description`. **`offers`**: coerente con la scelta **prezzo solo-in-demo** → o si OMETTE `offers`, o si usa `offers` senza prezzo pubblico. **NON** inventare prezzi in schema se non sono in pagina.
- **`FAQPage`** (sezione FAQ): le `Question.name` devono essere **identiche** al testo visibile della FAQ in `COPY.md`.
- ⛔ **MAI** `aggregateRating` / `review` a stadio pilot (niente recensioni reali → sarebbe falso + violazione linee guida Google).

## Tecnici (Next 16)

- **Metadata API** Next per title/description/OG/canonical (no `<head>` manuale).
- **`app/robots.ts`**: `Allow: /`, `Disallow: /grazie`, riferimento alla sitemap.
- **`app/sitemap.ts`**: includere `/`, `/demo`, legali; **escludere** `/grazie`. Priority: `/`=1.0, `/demo`=0.9, legali=0.1.
- **Performance/Core Web Vitals** (impattano ranking): `next/font` (display swap) per Bricolage+Hanken; `next/image` con `priority` sull'immagine hero (LCP < 2s); riservare spazio agli screenshot (CLS < 0.05); lazy-load sotto la piega.
- **Validare** con Rich Results Test (FAQPage, Organization, SoftwareApplication) prima del deploy.
- **Heading hierarchy**: un solo `<h1>` (hero, keyword madre), `<h2>` per le sezioni.
- **Cookie banner GDPR** + consenso prima di attivare tracking/analytics su `/grazie`.

## Dati mancanti per chiudere la SEO

- Dominio definitivo `[DA CONFERMARE]`
- Ragione sociale + P.IVA + sede `[DA CONFERMARE]` (Organization + footer)
- URL LinkedIn / social `[DA CONFERMARE]` (`sameAs`)
- Asset logo `.svg` per `Organization.logo` + OG image
