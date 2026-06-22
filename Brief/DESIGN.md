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
> Questa sezione viene COMPILATA da Claude Code dopo `/nexus-design`.
> Lasciare vuota in questa fase. Compilata dopo l'Intermezzo Design.
