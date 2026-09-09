# I18N-EN — Landing in inglese

> Registro di lavoro del branch `feat/landing-en`, aperto il 09/09/2026.
> Punto 3(a) del piano `LAVORI-2026-08.md` (repo app, branch `stripe-abbonamento`).
> Il vecchio branch `feat/i18n-en` (07/07/2026) aveva l'impalcatura ma zero
> stringhe: ricreato da `main` perché era 8 commit indietro col lock di luglio.
> Il vecchio branch si può cancellare.

## Decisioni

- **Pubblico EN** (scelta di Lorenzo, 09/09): imprese di pulizie UK / Irlanda / USA.
  Analisi lampo: Schwartz 3-4, sofisticazione di mercato 4 (Jobber, ZenMaid,
  Swept, Housecall Pro). Registro onesto come l'italiano; origine italiana
  DICHIARATA, non nascosta. Flavour **UK-first** (ortografia, telefoni Ofcom,
  24h, date giorno-mese).
- **Lingue**: solo IT + EN (30/08). Lingua e valuta indipendenti.
- **URL**: italiano invariato su `/` (SEO-LOCK §1); inglese su `/en/…` con slug
  inglesi (`/en/features/staff`, `/en/thank-you`, `/en/terms`, `/en/cookies`).
  I percorsi interni restano le cartelle italiane: `/en/funzioni/operatori`
  fa 307 su `/en/features/staff`, `/features/staff` senza prefisso su
  `/funzioni/operatori`, `/it/*` su `/*`.
- **Valuta**: finché non arriva il punto 3(b), la versione EN mostra i prezzi
  in **euro** (99/129/199 €) e i widget in € con formato inglese («€26,480»).
  Il selettore valuta li cambierà entrambi. Prezzi USD/GBP: convertiti e
  arrotondati, da confermare a Lorenzo.
- **Machine-readable**: `/llms.txt` e `/pricing.md` restano italiani alla root
  (byte-identici a prima); le versioni inglesi stanno su `/en/llms.txt` e
  `/en/pricing.md`. Generatore unico in `lib/machine-readable.ts`.
- **Lead**: il form manda `lingua`; l'API salva `source: "landing-demo-en"`
  (nessuna migrazione sulla tabella `leads`) e la mail di notifica dice in
  chiaro «INGLESE: da ricontattare in inglese».
- **Legali**: traduzione di cortesia con nota «the Italian version prevails»
  in cima a Privacy / Terms / Cookies (da approvare).
- **OG image**: `alt` statico «CleanFlow» in entrambe le lingue (prima era
  «CleanFlow — il gestionale per imprese di pulizie»): `generateImageMetadata`
  viene chiamata da Next senza `locale` e andava in 500. Immagine per lingua.
- **Tipizzazione**: `global.d.ts` collega `messages/it.json` a next-intl, così
  un refuso in una chiave è un errore di compilazione.
- **Screenshot del prodotto** (`public/product/*.png`, helper `lib/product-shots.ts`):
  la versione inglese usa `<nome>-en.png`, scatti dell'app vera (account demo
  BrillaCasa, 09/09/2026) con i testi dell'interfaccia tradotti nel DOM e i
  numeri in formato inglese. In ENTRAMBE le lingue nomi ed email sono demo:
  la `operatori.png` di giugno conteneva una riga con nome/email razzisti (dato
  inserito a mano nella demo, oggi non più nel DB) ed è stata rifatta; le altre
  quattro italiane restano quelle di giugno (dati più ricchi, nessun problema).
  Nota: a settembre la demo è quasi vuota (0 lavori oggi, «Richiede attenzione
  35»): le schermate inglesi lo mostrano. Da rifare dopo un re-seed della demo.

## Checklist (1:1)

### Impalcatura
- [x] next-intl 4.14.2 + `i18n/{routing,request,navigation}.ts` + `proxy.ts` (Next 16)
- [x] `app/[locale]/layout.tsx` con metadata per lingua, `setRequestLocale`, provider
- [x] `lib/seo.ts`: canonical + hreflang (x-default = it) su ogni pagina — verificato nell'HTML
- [x] Toggle lingua nell'header (IT | EN), testato in entrambe le direzioni con slug mappati
- [x] `messages/it.json` = testi attuali, verbatim (434 chiavi)
- [x] `messages/en.json` (434 chiavi, parità verificata da script)

### Componenti home
- [x] Header · Hero · Problema · Pilastri (+4 widget) · Come funziona · Risultato
- [x] Prezzi + `lib/piani.ts` per lingua · FAQ · Team · Investitori · CTA finale · Footer
- [x] Mobile CTA · Cookie banner · Preferenze cookie · KPI counter (separatore migliaia per lingua)

### Pagine
- [x] `/demo` + form (errori, placeholder, chip) · `/grazie` · legali ×3
- [x] `/funzioni/*` ×5 (testi + widget) · `funzione-shell`
- [x] OG image per lingua · JSON-LD per lingua · sitemap con alternates hreflang
- [x] `/en/llms.txt` · `/en/pricing.md`

### Qualità
- [x] Build senza `ignoreBuildErrors`, `tsc --noEmit` pulito, 36 pagine SSG
- [x] Italiano: testo visibile IDENTICO alla produzione su tutte le 11 pagine
      (unica differenza: le etichette «it»/«en» del toggle e uno spazio
      spurio prima del punto nelle legali, che ora non c'è più) · JSON-LD
      identico · `/llms.txt` e `/pricing.md` byte-identici
- [x] Inglese: `no-ai-slop` sul copy (14 trattini lunghi tolti dalla prosa;
      tenuti i contrasti e le chiuse che sono struttura del copy approvato)
- [x] Header a 375px: logo + toggle + Log in + Book a demo su una riga
- [x] `/qa-mobile` in locale sul commit finale (09/09): 375×812 Chromium su
      home EN (tutte le sezioni), /en/demo, /en/features/staff, /en/thank-you,
      /en/terms, home IT · nessun overflow orizzontale · 1 H1 per pagina · alt
      su tutte le immagini · WebKit 375 (playwright 1.61 + webkit-2311) su /en e
      /en/demo: header blur, hero, banner puliti · tutte le 22 rotte IT/EN + 6
      file machine-readable rispondono 200 · toggle lingua in entrambe le
      direzioni · sticky CTA mobile dopo il consenso · form demo con chip da
      36-40px (invariati dall'italiano). Fix emersi: area di tocco del toggle
      allargata a ≥44px con pseudo-elemento; `localeDetection: false` perché
      un browser in inglese che apriva `/` veniva reindirizzato su /en.
- [x] Lista sostituzioni Italia-centriche approvata da Lorenzo («ok tutte», 09/09/2026)
- [x] Deploy preview Vercel → OK di Lorenzo → merge fast-forward in main
      (`e161d32`) → produzione su cleanflowapp.it il 09/09/2026 (dominio
      verificato: `/` italiano, `/en` inglese, `/it` → `/`)

## Sostituzioni Italia-centriche proposte (da approvare)

| # | Italiano | Inglese proposto | Perché |
|---|---|---|---|
| 1 | Riga trust hero: «In prova con le prime imprese di pulizie italiane» | «Built with cleaning companies in Italy. Now in English.» | L'origine si scopre comunque al footer (Olbia, VAT no.): detta prima è una prova contro il nostro interesse, nascosta è un sospetto |
| 2 | Nomi e luoghi dei widget: B&B Le Magnolie, Palestra FitZone, Studio Legale Marino, Famiglia Conti, Sig.ra Lombardi, Villetta Lombardi, Via delle Rose 3 Sesto San Giovanni, Via Manzoni 12 Monza, Viale Brianza 41 Cinisello, Elena Bianchi, Michele Negrone | Magnolia B&B, FitZone Gym, Marlow Legal, The Bennett family, Mrs Lambert, Lambert house, 3 Rose Lane Sutton, 12 Mill Street Kingston, 41 Park Avenue Newton, Emma Wright, Daniel Cole (Ahmed Haddad invariato) | Un titolare di Leeds davanti a «Sesto San Giovanni» conclude che il prodotto non è per lui |
| 3 | Telefoni demo 349 123 4003 / 02 555 0005; placeholder «Es. 333 1234567» | 07700 900403 / 020 7946 0005 (numeri fittizi riservati da Ofcom); «With country code, e.g. +44 7700 900123» | UK-first; il prefisso nel placeholder serve perché il lead arriva da 3 Paesi |
| 4 | Numero nostro «333 807 4768» | «+39 333 807 4768» (footer, CTA mobile, llms.txt) | Senza +39 da UK/USA non si chiama |
| 5 | «IVA esclusa» / «+ IVA» | «excl. VAT» / «+ VAT» | Vale UK/IE; per gli USA si deciderà «excl. tax» con la valuta USD (domanda al commercialista) |
| 6 | FAQ «CleanFlow fa anche la fatturazione elettronica?» | «Does CleanFlow do invoicing too?» → «your accounting software or your accountant» | Lo SDI non esiste fuori Italia |
| 7 | FAQ tipi di pulizie: «B&B e case vacanza, palestre, sanificazioni» | «B&Bs and holiday lets, gyms, deep cleans» | «Sanificazione» non è una categoria di servizio riconosciuta fuori Italia |
| 8 | FAQ dati: «server europei» | «servers in the EU» | Per UK/IE è un plus GDPR, per gli USA neutro |
| 9 | Terminologia: operatori · strutture · entrate · interventi · calendario · preventivi · incassi · team leader | staff (sezione) / cleaners (persone) · sites · revenue · jobs · schedule · quotes · payments · supervisor | È il lessico di Jobber/ZenMaid/Swept: quello che il pubblico usa già |
| 10 | Ortografia e formati | Britannici (organise, sanitise, centre, colour), 24h, «Mon 22 June» | UK-first; un americano li legge senza attrito, il contrario meno |
| 11 | Legali | Traduzione di cortesia + nota «This is a courtesy translation. In case of any discrepancy, the Italian version prevails.»; «P.IVA» → «VAT no.», «PEC» → «certified email (PEC)» | I documenti restano quelli italiani; la nota evita che la traduzione faccia fede |
| 12 | JSON-LD `areaServed: "IT"` · `og:locale it_IT` | `["GB","IE","US"]` · `en_GB` sulle pagine inglesi | Dichiarare a Google i mercati della versione inglese |
| 13 | Meta title «Gestionale per imprese di pulizie» · H1 | «Cleaning business software» · «Your cleaning business, finally under control.» | Keyword usata in UK e USA; la H1 è la traduzione diretta dell'approvata |
| 14 | Team «Siamo in tre. Quando chiami, rispondiamo noi.» | «There are three of us. When you call, we answer.» (invariato nella sostanza) | A sofisticazione 4 è l'argomento più forte che abbiamo: resta |
| 15 | Widget «Incassato a giugno € 26.480» | «Collected in June €26,480» (euro) | Cambierà col selettore valuta del punto 3(b) |
