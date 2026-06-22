# SITEMAP.md — CleanFlow

**Pattern A** (nuovo, da zero). Vetrina SaaS **demo-first**, stadio pilot.
Regola guida (dal blueprint del founder): *non costruire quello che non serve*. Una landing lunga che fa tutta la pitch, più l'essenziale di servizio.

## Pagine

| Pagina (URL) | Tipologia | Scopo strategico | Priorità SEO |
|---|---|---|---|
| `/` | Home — landing single page | Tutta la pitch: dal caos attuale del titolare alla prenotazione della demo. È la pagina che fa il 90% del lavoro. | **Alta** |
| `/demo` | Conversione | Form di prenotazione demo. Anche **target diretto** dei link da cold call / LinkedIn / email, così il prospetto atterra subito sull'azione. | **Alta** |
| `/grazie` | Conferma | Conferma post-prenotazione + pixel/tracking conversione. | Nessuna (`noindex`) |
| `/privacy` | Legale | Informativa privacy (GDPR — obbligatoria, si raccolgono lead). | Bassa |
| `/cookie` | Legale | Cookie policy. | Bassa |
| `/termini` | Legale | Termini di servizio. | Bassa |

## Deliberatamente NON costruite ora (future)

- `/prezzi` — per ora il prezzo vive come **sezione** della home. Pagina dedicata solo quando ci saranno più piani da spiegare e keyword "prezzo gestionale pulizie" da coprire.
- `/funzionalità` (o pagine per-modulo) — i moduli vivono come **sezioni** della home. Pagine-feature separate sono una mossa SEO da fase 2, quando avrai contenuti reali.
- `/blog` — niente blog finché non hai contenuti veri da pubblicare (è scritto nel tuo stesso blueprint). Quando arriverà, è il canale per SEO/AEO sul tema "come digitalizzare un'impresa di pulizie".

## Note tecniche
- Stack target: Next.js 15 + shadcn/ui v4 + Tailwind v4 + Vercel.
- `/demo` e `/grazie`: la `/grazie` va in `noindex` (pagina di servizio, non deve rankare).
- Le legali vanno linkate dal footer di tutte le pagine.
