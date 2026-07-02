# DESIGN.md (ASTRATTO) — CleanFlow

> ⚠️ Questo file è ASTRATTO. Le scelte concrete (palette hex, font esatti, componenti specifici) vivono nel passaggio successivo:
> **Intermezzo Design su Claude Code** via `/nexus-design`.
> Prima di Chat 2 CONTENUTI, questo file viene aggiornato con la sezione "Scelte concrete approvate".

## Purpose primario
- Categoria: **D — Lead qualification**. La landing porta a **prenotare una demo / chiamata guidata**, non a comprare d'impulso.
- Motivazione: GTM a vendita umana (cold call, LinkedIn, gruppi Facebook), prodotto venduto sul **risultato** ("ti ridò 10 ore a settimana"), compratore non tecnico e cauto. La pagina qualifica e accompagna alla demo, non chiude la vendita da sola.

## Target principale
- Chi: titolare di impresa di pulizie italiana, 1–100 dipendenti. Oggi gestisce tutto tra WhatsApp, Excel, telefonate e agenda cartacea. Non tecnico, sotto stress, senza visibilità sull'azienda.
- Dispositivo prevalente: il click arriva da **mobile** (LinkedIn, gruppi FB, follow-up di una cold call), la valutazione vera la fa da **desktop** → desktop-first per far brillare il prodotto, mobile impeccabile.
- Urgenza: **valutativo**, non frettoloso. Sta decidendo se fidarsi.
- Lingua/cultura: italiano nativo. Niente gergo SaaS inglese in pagina.

## Concept scelto
- Nome: **Sala di Controllo** (registro autorevole)
- Mood (3 parole): ordinato, lucido, autorevole
- Tono di voce: affermativo e sicuro ma concreto e parlato. Dichiarazioni nette mai gergali. La voce di chi ti semplifica la vita **e** definisce lo standard del settore — non da startup tecnica, non da underdog.

## Direzione estetica (astratta, da raffinare con /nexus-design)
- Approccio hero: **informativo / product-led** — il prodotto è l'eroe, con presenza scenica.
- Approccio servizi/moduli: **misto** — blocchi solidi di peso, raccontati per ruolo e beneficio. Mai tabella di feature.
- Approccio testimonianze: **dinamico**, usate come prova d'autorità (titolari reali + ore risparmiate). Placeholder chiaramente marcati finché non ci sono voci reali. Mai recensioni inventate.
- Approccio fotografico: ambienti italiani reali, puliti e in ordine, curati quasi editoriali-industriali. Deve trasmettere **l'effetto / il "dopo"**, non la fatica. Prodotto e dati co-protagonisti. Mai l'operatore con lo straccio.
- Atmosfera tipografica: **contrasto forte** tra un display deciso "di marca" per i titoli e un corpo tecnico pulitissimo e leggibile. Niente serif editoriale, niente monospace.
- Atmosfera cromatica: il **DNA del prodotto (navy profondo + teal)** su tela **chiara e ariosa**, con **àncore scure full-bleed** nei momenti di comando. Il teal è segnale di "sistema attivo", usato con misura ed elettrico dove conta. No gradient da template AI.
- Energia CTA: **dominante** (purpose = lead qualification/demo), sempre con **micro-rassicurazione** accanto (es. "nessuna carta · 20 minuti") per il titolare cauto.

## Archetipo animazione
- Dominante: **A — Diretto e Pulito (~70%)** — hero che converte subito, prodotto-eroe, CTA forte. Serve alla demo e all'autorità.
- Mix 70/30: **C — Storytelling Scroll-driven (~30%)** — porta il titolare lungo l'arco **caos → controllo** e mostra i moduli uno alla volta (è anche la finitura "Linear / SaaS moderno" delle reference). Senza C, al non tecnico mancherebbe il "ho capito cosa fa e come". Con troppo C, si seppellirebbe la CTA demo.
- Tipo hero direzionale: informativo / product-led, statico con presenza scenica + CTA dominante. (Componente specifico → deciso da Claude Code.)
- Nota: **niente video loop atmosferico**. Il prodotto è il visivo; gli screenshot del prodotto sono già l'asset hero.

## Banlist specifica del progetto
(aggiuntiva a quella globale del CLAUDE.md Nexus)
- Estetica: no dark-mode totale (illeggibile per un titolare over-45); no gradient viola-azzurro da template AI; no estetica "template SaaS generico"; no teal come tinta dominante (resta accento).
- Cliché di settore da evitare: no straccio / secchio / guanti / spray / bolle come iconografia; no "operatore con lo straccio"; no foto stock di pulizie sorridenti.
- Riferimenti culturali / tono da evitare: no tono underdog né da startup-bro tecnica; no gergo SaaS inglese non tradotto (churn, onboarding, retention) verso un pubblico non tecnico; no tono paternalistico.

## Direzione per Claude Code
- Tono generale del codice: **minimal + autorevole**, con momenti cinematici controllati (le àncore scure). Base pulita, alto contrasto solo nei momenti di comando.
- Filtri obbligatori da rispettare:
  - purpose = D → CTA dominante con rassicurazione, **no whisper-CTA**, no decorazioni editoriali che mettono la CTA in secondo piano.
  - **Tela chiara dominante** con **àncore navy full-bleed** nei momenti chiave (hero, svolta, risultato, CTA finale).
  - Teal = accento, non tinta dominante.
  - Rispettare la banlist globale Nexus (no monospace, no eyebrow numerati 01—/02— come decorazione di default, solo foto realistiche) + quella di progetto sopra.
- Cosa Claude Code DEVE proporre nell'Intermezzo (`/nexus-design`):
  - 3 direzioni palette (compatibili: navy + teal + tela chiara, àncore scure, no gradient AI)
  - 3 direzioni tipografia (compatibili: display deciso "di marca" per titoli + sans tecnico leggibile per corpo, no mono, no serif editoriale)
  - 3 direzioni energia CTA (compatibili con purpose D: dominante + rassicurazione)
  - 3 direzioni macro-layout sezioni (compatibili: hero product-led, moduli a blocchi per ruolo, àncore scure)

## Scelte concrete approvate
> Compilato da `/nexus-design` il **2026-06-22**. Scelte ancorate al **logo CleanFlow** (navy + teal).
> ✅ Hex navy/teal **campionati dal file logo** (`public/cleanflow-mark.png`, 2512×2512) il 2026-06-22: **navy `#00246C`**, **teal `#00B4B4`**.

### Palette — "Sala di Controllo" (Opzione A)
Sistema: **tela chiara dominante + navy di marca + teal accento misurato + àncore navy full-bleed** nei momenti di comando. Niente dark-mode totale, niente gradient viola, teal mai tinta dominante.

| Ruolo | Hex | Uso |
|---|---|---|
| `--background` (tela) | `#F6F8FB` | sfondo dominante, arioso, leggero cool che lega al navy |
| `--surface` / card | `#FFFFFF` | card, contenitori, screenshot prodotto |
| `--foreground` (ink) | `#0E1430` | testo principale (quasi-nero virato navy) |
| `--muted-foreground` | `#5A6478` | testo secondario, didascalie |
| `--border` | `#E2E7F0` | bordi, divisori |
| `--primary` (navy) | `#00246C` | marca, titoli di peso, **àncore scure full-bleed** (dal logo) |
| `--on-primary` | `#EAF0FF` | testo/elementi su navy |
| `--accent` (teal) | `#00B4B4` | **accento "sistema attivo"**: CTA, icone, scintilla, highlight, focus ring (dal logo) |
| `--accent-hover` | `#009A9A` | hover/active del teal |
| `--accent-ink` | `#0A7A78` | teal-tonato come **testo su tela chiara** (#00B4B4 su bianco fallisce; questo = 5.2:1) |
| `--accent-soft` | `#E1F6F6` | wash teal per badge/sfondi tenui |
| `--anchor-deep` | `#001A52` | navy più profondo per i momenti più cinematici (hero/CTA finale) |
| `--on-dark` | `#EAF0FF` | testo su àncore scure |
| `--on-dark-muted` | `#A7B0CE` | testo secondario su scuro |
| `--ring` (focus) | `#00B4B4` | focus visibile (teal) |
| `--destructive` | `#DC2626` | errori form |

**Regola di contrasto (importante)**: il teal di marca `#00B4B4` con **testo navy `#00246C` = 5.5:1 (AA ok)**; con testo bianco fallisce (~2.6:1). Quindi:
- **CTA primaria = fill teal `#00B4B4` + testo navy `#00246C`** (distintiva e on-brand, AA superato). In hover scurisce a `#009A9A`.
- **Teal come testo su tela chiara**: NON usare `#00B4B4` (fallisce); usare `--accent-ink #0A7A78` (5.2:1) o il navy.
- Su àncore scure la CTA resta fill teal + testo navy (il bottone pieno funziona su qualsiasi fondo).
- Verificare ogni coppia con tool contrasto in fase build.

**Motivazione**: è il DNA del logo (navy+teal) portato 1:1 in pagina → continuità marca→prodotto. Tela chiara per leggibilità del titolare over-40; navy per autorità e per le àncore "di comando"; teal usato con misura come segnale di "sistema attivo".

### Tipografia — Bricolage + Hanken
- **Display titoli**: **Bricolage Grotesque** (600/700) — grotesque contemporanea, distintiva, "di marca" senza essere generica. Per H1/H2 e numeri-hero.
- **Corpo / UI**: **Hanken Grotesk** (400/500/600) — sans tecnico pulitissimo, altissima leggibilità (target over-40), neutro a sostegno del display.
- **Numeri / dati**: usare le **tabular figures** di Hanken (`font-feature-settings: "tnum"`) per metriche, prezzi-in-demo, contatori → niente layout shift. Mono ammesso **solo** come tabular-figure dato (mai come tipografia di testo, da banlist).
- Scala indicativa: Hero 40–56 / H2 28–34 / H3 20–24 / Body 16–18 / Label 13–14.
- **Motivazione**: contrasto forte display↔corpo richiesto dal concept; entrambi fuori banlist (no Inter/Roboto/Arial/Space Grotesk/Open Sans, no serif editoriale, no mono testo).
- **Da rimuovere dallo scaffold**: font **Geist** (layout.tsx) e `font-family: Arial` hardcoded (globals.css).

### Energia CTA — Teal solido dominante
- **Direzione**: bottone **pieno teal** (`#16A89B` + testo navy) dominante, ovunque, con **micro-rassicurazione** sempre accanto ("20 minuti · nessuna carta").
- **Hero**: doppia corsia → primaria `Prenota una demo` (teal solido) + secondaria leggera `Guarda com'è fatto` (ghost/testo, ancora a `#come-funziona`).
- **CTA finale (àncora scura)**: stessa CTA teal con **glow/alone teal soft** di comando.
- **Stati**: hover → `#128A80` + lieve lift (transform/shadow, no layout shift); active → scurisce; disabled → opacità 0.5 + cursore; focus → ring teal `#16A89B` 2–3px visibile.
- **Una sola azione in tutta la pagina**: "Prenota una demo" (mai "compra"). Ancoraggi: header sticky · hero · fine "Come funziona" · CTA finale · bottom-bar sticky mobile.

### Macro-layout per sezione — "Stack di comando"
- **Hero**: àncora navy full-bleed; dashboard prodotto con presenza scenica che "buca" il bordo; headline sul risultato + doppia-corsia CTA. Statico con presenza, niente video.
- **Problema → Svolta**: transizione cromatica **chiaro → scuro** come pivot narrativo caos→controllo.
- **Come funziona**: **sticky-scroll verticale** — testo step a sinistra, UI prodotto a destra che cambia allo scroll (4 step). CTA inline a fine sezione.
- **Moduli per ruolo**: blocchi solidi **alternati** sx/dx (Titolare → Team leader → Operatore), ognuno con la sua schermata. Mai tabella di feature.
- **Risultato**: àncora navy full-bleed con **numeri grandi** (tabular) che contano su all'ingresso in viewport.
- **FAQ**: accordion sobrio (le domande = stesse stringhe dello schema FAQPage).
- **CTA finale**: àncora navy full-bleed, promessa ripetuta + CTA con glow teal.
- **Footer**: scuro, con dati azienda (P.IVA/sede) e legali.

### Note per la build
- **Logo asset**: hex campionati (navy `#00246C`, teal `#00B4B4`). Asset disponibile: `public/cleanflow-mark.png` (icona 2512×2512) per header/favicon; generare OG on-brand. SVG vettoriale non ancora fornito (PNG alta risoluzione ok per ora).
- **Coerenza con l'app**: l'app `SitiApp/cleanflow` è verde smeraldo `#047857` — la landing segue il **logo (navy+teal)**. Segnalato al founder l'eventuale riallineamento futuro dell'app.
- **Animazione**: archetipo A 70% (CTA/hero che convertono) + scroll-driven C 30% (solo "Come funziona" + reveal numeri). Durate 150–300ms, ease-out in entrata, `prefers-reduced-motion` rispettato, niente fade-in su ogni elemento.
- **Token shadcn**: mappare i ruoli sopra su `--primary/--accent/--background/--foreground/--border/--ring/--radius` in `globals.css` (oggi mancano).
- **Accessibilità**: contrasto AA su ogni coppia, focus ring teal visibile, touch target ≥44px, `lang="it"`.

---

## Scelte concrete approvate — v2 "Registro di controllo" (2026-07-02)

> Redesign strutturale approvato dal titolare (feedback: "la landing sembra AI slop, dev'essere chiara e fluida, chi entra deve capire tutto"). Riferimenti: Mintlify (precisione, hairline, gerarchia per peso), Framer ("il prodotto è la pagina": UI ricostruita in HTML), Weav (capitoli, crop di UI), PolicyPilot (hero-pannello, pilastri numerati), Curely (chip di risultato). Audit anti-slop della v1: 5.5/10.
> **Questa sezione INTEGRA e dove indicato SOSTITUISCE le scelte v1 qui sopra.**

### Cosa cambia (sostituzioni esplicite)
- **Àncore navy**: da 4 bande full-bleed identiche → **2 momenti navy, diversi tra loro**: (1) hero come **pannello arrotondato dentro la tela chiara** (non full-bleed), (2) CTA finale full-bleed. Footer resta scuro. La sezione Risultato torna su tela chiara.
- **Separazione sezioni**: non più cambi di sfondo → **hairline 1px** (`--border`) + ritmo verticale costante. La pagina si legge come un registro ordinato.
- **Prova visiva del prodotto**: non più screenshot interi compressi (illeggibili) col fake browser chrome → **widget dell'app RICOSTRUITI in HTML** (KPI fatturato, agenda del giorno, checklist operatore, note d'accesso), sempre leggibili e sempre on-brand. Gli screenshot reali restano ammessi solo come crop parziali leggibili e mai riciclati tra sezioni. Vietato il chrome coi semafori macOS.
- **Motion**: rimosso il fade-up whileInView a tappeto → **una sola orchestrazione al load della hero** + micro-interazioni funzionali (odometro sui numeri-widget, crossfade step, hover 120ms). `prefers-reduced-motion` rispettato.
- **Emendamento banlist** (approvato col redesign): **JetBrains Mono** ammesso SOLO per micro-etichette (eyebrow) e dati tabulari nei widget — mai come tipografia di testo. **Numerazione 01–04** ammessa SOLO sui 4 pilastri (semantica: sono 4 cose contate, non decorazione di default).

### Struttura v2 (9 sezioni, era 14)
1. **Header** sticky chiaro, hairline, 3 ancore (Cosa fa · Come funziona · Domande) + CTA pill.
2. **Hero** = pannello navy arrotondato nella tela: headline approvata + subhead che nomina i 4 pilastri (parole chiave in evidenza) + CTA + micro-rassicurazione + riga trust ("in prova con le prime imprese"). Prova visiva: cluster di widget HTML (agenda oggi, fatturato con odometro, operatori in servizio con pallino live) che sborda dal pannello verso la tela.
3. **La giornata che conosci** (breve): copy attuale (buono) + artefatti realistici del caos (bolla WhatsApp verde, cella Excel, foglietto) in composizione volutamente disordinata — il caos deve VEDERSI.
4. **I 4 pilastri "Tutto, al suo posto"** (cuore nuovo, assorbe Svolta + Moduli + Intelligenza): intro "sala di controllo" + 4 righe alternate numerate 01 ENTRATE / 02 CLIENTI / 03 STRUTTURE / 04 OPERATORI, ognuna con widget HTML dedicato e beneficio-per-ruolo nel copy. Quality Score vive dentro 04/step finale.
5. **Come funziona** (compatto, 4 step senza sticky-scroll da 68vh): dal cliente al report; lo step 4 include il Quality Score ring + disclaimer "un aiuto, non un giudice". CTA inline a fine sezione.
6. **Il risultato**: stat card oneste su tela chiara (numero grande statico + label; niente count-up su stime dichiarate) + riga "i tuoi numeri li vediamo in demo".
7. **Domande** (assorbe Prezzo + Pilot): 8 voci — le 6 attuali + "Quanto costa?" + pilot esteso. Item aperto con sfondo tintato.
8. **CTA finale** navy full-bleed differenziata (pattern a punti che chiude il cerchio con la hero, niente glow blur).
9. **Footer** scuro con dati reali (email di dominio, non Gmail).
+ layer: bottom-bar mobile sticky (esistente) e cookie banner compattato su mobile.
- **KILL definitivi**: le 3 card testimonial placeholder vuote; trust-strip come sezione (diventa una riga nella hero); sezioni Svolta/Moduli/Intelligenza/Pilot/Prezzo come sezioni autonome (assorbite come sopra).
