# WIREFRAME.md — CleanFlow

**Archetipo:** A+C, A dominante (~70/30).
**Àncore scure** = sezioni in navy profondo full-bleed (i "momenti di comando"). Tutto il resto è tela chiara e ariosa.
Nota: qui c'è solo l'ordine e il *cosa contiene* ad alto livello. La copy reale sta in `COPY.md` (Chat 2).

---

## Home (`/`)

1. **Header** — sticky.
   - Logo + nav ad ancore (Come funziona / Moduli / Prezzo / FAQ) + CTA "Prenota una demo" sempre visibile.
   - Chiaro. Si scurisce leggermente all'arrivo sulle àncore scure.

2. **Hero** — *àncora scura · archetipo A.*
   - Headline sul **risultato** (le ore / la calma — "smetti di gestire l'azienda dai messaggi").
   - Subhead concreto di una riga. CTA dominante + micro-rassicurazione ("nessuna carta · 20 minuti"). CTA secondaria leggera (es. "Guarda com'è fatto").
   - Visual: il **prodotto** (dashboard) con presenza scenica.

3. **Trust strip** — chiaro.
   - Fascia leggera di prova subito sotto l'hero. A stadio pilot: numeri di sistema reali o "in prova con le prime imprese". **Niente loghi/recensioni inventati.**

4. **Il problema** — chiaro · *inizio arco C.*
   - "La giornata che conosci": WhatsApp, Excel, telefonate, carta. Empatico, riconoscibile, breve. Reveal leggero on scroll.

5. **La svolta** — *transizione chiaro → scuro.*
   - "Tutto in un'unica sala di controllo". Reveal del prodotto come centro di comando. È il pivot narrativo caos→controllo.

6. **Come funziona** — chiaro · *C, scroll-driven (cuore dello storytelling).*
   - Il flusso, modulo per modulo, con la UI accanto:
     1. Crei cliente e struttura
     2. Pianifichi sul calendario
     3. L'operatore esegue da mobile (check-in GPS, checklist, foto prima/durante/dopo)
     4. Report + Quality Score automatici
   - Ogni step si rivela in sequenza allo scroll.

7. **I moduli, per chi li usa** — chiaro.
   - Blocchi solidi raccontati **per ruolo**, mai tabella di feature:
     - Titolare → visibilità, fatturato, metriche
     - Team leader → controllo qualità, foto, emergenze
     - Operatore → "sa sempre cosa fare", app mobile
   - Ogni blocco con la sua schermata.

8. **L'intelligenza** — chiaro.
   - Quality Score sulle foto + report automatici, come prova di "software serio". Senza sovrapromettere (è versione base). Una sezione, peso misurato.

9. **Il risultato** — *àncora scura · numeri grandi.*
   - Ore amministrative eliminate a settimana (la **north star**), meno errori, clienti più seguiti. Chiude l'arco caos→controllo. Numeri che contano su all'ingresso in viewport.

10. **Prezzo** — chiaro.
    - Trasparente e semplice. Da decidere in fase copy cosa mostrare: standard (Base 99€ / Pro 149€ dagli screenshot) o un'offerta pilot. CTA "Prenota una demo" — **non** "compra".

11. **Testimonianze** — chiaro.
    - Titolari reali + ore risparmiate, in forma dinamica. A pilot: **placeholder chiaramente marcati** finché non ci sono voci reali.

12. **FAQ** — chiaro.
    - Abbatte le obiezioni del titolare cauto prima della demo: "i miei operatori non sono tecnologici?", "i miei dati al sicuro?", "quanto ci metto a partire?", "funziona da telefono?", "posso vederlo prima?".

13. **CTA finale** — *àncora scura · full-bleed.*
    - Ripeti la promessa + "Prenota una demo" dominante + rassicurazione. Chiusura forte.

14. **Footer** — scuro.
    - Logo, nav, contatti, **P.IVA / sede** (un B2B italiano si fida di un'azienda vera), link legali (privacy / cookie / termini).

---

## `/demo`

Layout a due colonne (desktop) / impilato (mobile).

- **Sinistra — cosa aspettarsi:** "20 minuti, nessun impegno, te lo mostriamo sui tuoi dati". Elementi di fiducia (rassicurazioni, eventuale volto del founder a stadio pilot).
- **Destra — form qualificante e corto:** Nome · Azienda · Telefono · N° operatori · (opzionale) Cosa usi oggi.
- CTA del form: "Prenota la demo". Al submit → `/grazie`.

---

## `/grazie`

- Conferma essenziale ("Ci sentiamo entro [X]. Intanto, ecco cosa preparare per la demo").
- `noindex`. Ospita il tracking di conversione.

---

## Legali (`/privacy` · `/cookie` · `/termini`)

- Layout documentale semplice, leggibile, coerente col brand. Linkate dal footer.

---

# WIREFRAME v2 — Redesign "Registro di controllo" (2026-07-02)

> Sostituisce l'ordine sezioni della home v1 (14 sezioni → 9). Le pagine `/demo`, `/grazie` e legali restano invariate.
> Principio: la pagina si legge come un registro ordinato — griglia unica stretta, separatori hairline, scaffolding identico per sezione (eyebrow mono → H2 → contenuto).

## Home v2 — ordine sezioni

1. **Header** (sticky, chiaro, hairline) — logo · 3 ancore (Cosa fa `#pilastri` · Come funziona `#come-funziona` · Domande `#domande`) · CTA pill.
2. **Hero — pannello navy arrotondato nella tela chiara** — eyebrow mono · H1 approvata · subhead coi 4 pilastri in evidenza · CTA + micro-rassicurazione · riga trust. Visual: cluster di widget HTML ricostruiti (agenda di oggi, KPI incassato con odometro, chip operatori live) che sborda dal pannello.
3. **La giornata che conosci** (breve) — copy v1 + artefatti realistici del caos (bolla WhatsApp, cella Excel, foglietto) in composizione disordinata.
4. **I 4 pilastri — "Tutto, al suo posto"** (`#pilastri`) — intro sala-di-controllo + 4 righe alternate numerate: 01 Entrate · 02 Clienti · 03 Strutture · 04 Operatori, ognuna con widget HTML dedicato (mai screenshot compressi, mai fake browser chrome).
5. **Come funziona** (`#come-funziona`) — 4 step compatti (niente sticky da 68vh), step 4 con Quality Score ring + riga onestà. CTA inline a fine sezione.
6. **Il risultato** — 3 stat card su tela chiara (numeri statici, onesti).
7. **Domande** (`#domande`) — 7 voci (assorbe Prezzo e Pilot), item aperto tintato.
8. **CTA finale** — unica àncora navy full-bleed, pattern a punti (eco della hero), niente glow blur.
9. **Footer** — scuro, dati reali, email di dominio.

Layer: bottom-bar sticky mobile (esistente) · cookie banner compatto su mobile.

## Sezioni v1 eliminate/assorbite
- Trust strip → riga nella hero. Svolta → lead dei pilastri. Moduli per ruolo → dentro i pilastri (benefici per ruolo nel copy). Intelligenza → step 4 di Come funziona. Pilot → FAQ "È un prodotto già pronto?". Prezzo → FAQ "Quanto costa?".
