# CLAUDE.md — Progetto Nexus

Questo file è il **CLAUDE.md di progetto** per i siti Nexus basati su questo template.
Vive nella root del repo cloniato per ogni cliente.

Va letto **insieme** al `CLAUDE.md globale` di Claude Code (`~/.claude/CLAUDE.md`), che contiene tutte le skill, sub-agents, MCP, slash commands gstack e la banlist Nexus globale.

Questo file aggiunge solo le **regole specifiche del template Nexus** e gli **override di progetto**.

---

# IDENTITÀ DEL PROGETTO

Sito web premium per un cliente Nexus.
Lingua copy: **italiano**, salvo richiesta esplicita.
Cartella `Brief/` contiene il Brief Pack v2 generato dal progetto Claude.ai "web-design-2.0".
Cartella `References/` contiene screenshot, moodboard, clip Greenlight di riferimento.

**Tipo di cliente**: <da compilare quando si parte da questo template> *(es. servizio locale, attività commerciale, B2B, ecc)*
**Pattern progetto**: <A | B | C | D — vedi sotto>

---

# STACK CONFERMATO

- **Framework**: Next.js 15 + App Router + React Server Components
- **Language**: TypeScript
- **UI base**: shadcn/ui v4 + Tailwind CSS v4
- **Componenti aggiuntivi**: registry shadcn community (vedi sotto)
- **Animazioni**: Motion (ex Framer Motion) — già installato
- **Package manager**: pnpm
- **Deploy**: Vercel

NON cambiare lo stack senza autorizzazione esplicita.

---

# WORKFLOW OBBLIGATORIO — Brief Pack v3.0

**Prima di scrivere QUALSIASI codice**, leggi tutti i file in `Brief/` nell'ordine:

1. `Brief/DESIGN.md` → concept estetico + scelte concrete approvate (palette hex, font, energia CTA, ecc)
2. `Brief/SITEMAP.md` → struttura pagine, URL, priorità SEO
3. `Brief/WIREFRAME.md` → ordine sezioni testuale per ogni pagina
4. `Brief/COPY.md` → TUTTI i testi italiani definitivi (NON inventare copy)
5. `Brief/SEO.md` → keyword, schema.org template, meta tag per pagina

Se manca un file → **fermati e chiedi**. Non improvvisare contenuto.

## ⚠️ STEP OBBLIGATORIO PRE-CODICE — Intermezzo Design

Quando ricevi un nuovo progetto Nexus appena clonato dal template:

1. **Leggi `Brief/DESIGN.md`**
2. **Verifica se la sezione "Scelte concrete approvate" è COMPILATA**
   - Se la sezione contiene palette hex specifici, font specifici, componenti suggeriti → puoi procedere allo step 3
   - Se la sezione è **vuota o ha placeholder** → **FERMATI**. Devi prima eseguire l'**Intermezzo Design**.
3. **Intermezzo Design** si attiva con lo slash command custom:

   ```
   /nexus-design
   ```

   Questo comando:
   - Legge `Brief/DESIGN.md` astratto
   - Consulta il database `ui-ux-pro-max` (161 palette ranked, 57 font pairings, 99 UX rules)
   - Propone all'utente 3 opzioni concrete per palette, tipografia, energia CTA, macro-layout
   - Raccoglie le scelte
   - Aggiorna `Brief/DESIGN.md` riempiendo la sezione "Scelte concrete approvate"
4. Solo dopo che la sezione "Scelte concrete approvate" è compilata e approvata, puoi procedere a scrivere il codice del sito.

**MAI scrivere codice se `Brief/DESIGN.md` ha la sezione "Scelte concrete approvate" vuota. Sempre eseguire `/nexus-design` prima.**

**Regola d'oro copy**: il copy del sito vive nel `Brief/COPY.md`. NON inventare testi. Se serve un copy non presente, fermati e chiedi all'utente. Sono ammesse SOLO micro-modifiche per adattare lunghezza al layout (es. tagliare "Servizio professionale di X" → "X" per un menu).

**Regola d'oro design**: la palette, i font, l'energia CTA, il macro-layout vivono nelle "Scelte concrete approvate" del `Brief/DESIGN.md` (popolate da `/nexus-design`). NON cambiarle mentre costruisci il sito. Se durante la build emergono limiti tecnici (es. il font scelto non ha il peso 600), torna a `/nexus-design` per scelta alternativa approvata, non improvvisare.

---

# REGISTRY SHADCN APPROVATI PER NEXUS

Questi sono i 9 registry shadcn pre-conosciuti dalla CLI shadcn 3.0+. Puoi installare componenti direttamente con `pnpm dlx shadcn@latest add @<registry>/<component>`:

| Registry | Quando usarlo | Esempio comando |
|---|---|---|
| `@shadcn` | Componenti base UI (button, input, dialog, form) | `pnpm dlx shadcn@latest add @shadcn/button` |
| `@magicui` | Animazioni e micro-interazioni (marquee, ripple, beams) | `pnpm dlx shadcn@latest add @magicui/marquee` |
| `@aceternity` | Effetti wow (3D cards, glow, spotlight, hero atmosferico) | `pnpm dlx shadcn@latest add @aceternity/typewriter-effect` |
| `@tailark` | Sezioni distintive che rompono il pattern shadcn standard | `pnpm dlx shadcn@latest add @tailark/hero-section-9` *(verifica nome esatto)* |
| `@originui` | Componenti avanzati (timeline, rich dialogs) | `pnpm dlx shadcn@latest add @originui/timeline` |
| `@cultui` | Componenti Apple-OS-inspired (dock, dynamic island) | `pnpm dlx shadcn@latest add @cultui/dock` |
| `@skiper` | Componenti animati e creativi (motion-rich) | `pnpm dlx shadcn@latest add @skiper/animated-button` |
| `@mynaui` | Componenti minimali e composables | `pnpm dlx shadcn@latest add @mynaui/card` |
| `@reui` | UI registry pulito per progetti moderni | `pnpm dlx shadcn@latest add @reui/badge` |

**Importante**: i nomi specifici dei componenti possono variare. Prima di installare, verifica sul sito della libreria (o usa l'MCP `shadcn` per discovery in linguaggio naturale).

**Per la scelta del componente giusto**: usa la cassetta degli attrezzi sopra come punto di partenza, ma sei libero di uscirne. NO dirti "usa @aceternity/spotlight per l'hero" — il `Brief/DESIGN.md` ti dice il CRITERIO (es. "hero atmosferico cinematico"), tu scegli il componente che meglio lo realizza.

---

# PATTERN DI PROGETTO

Quando parti da questo template, dichiara il pattern del progetto (lo trovi anche nel `Brief/` se è stato definito nella Chat Strategia):

- **Pattern A — Nuovo da zero**: tutto il Brief Pack v2 è completo, scrivi codice da zero seguendo i 5 file.
- **Pattern B — Migration SEO-preserving**: cliente esistente, mantieni URL esistenti + copy esistente. `Brief/SITEMAP.md` ha redirect plan, `Brief/SEO.md` ha keyword già posizionate, `Brief/COPY.md` ha testi `[PRESERVE]`/`[POLISH]`/`[REFRESH]`/`[NEW]`. NON cambiare semanticamente i copy `[PRESERVE]` o `[POLISH]`.
- **Pattern C — Solo re-design**: cambia SOLO il design visivo. Sitemap, copy, SEO esistenti restano invariati.
- **Pattern D — Figma-driven**: `Brief/DESIGN.md` contiene i token estratti dal Figma del cliente. Applica fedelmente.

---

# REGOLE DESIGN SEMPRE ATTIVE

Aggiuntive a quelle del CLAUDE.md globale Nexus, applicate sempre in questo template:

- **Mobile-first tecnico**, MA desktop full-width con layout reale → mai un layout mobile allargato su schermo grande
- **Estetica unica per il cliente**: leggi `Brief/DESIGN.md` per palette/font/mood esatto
- **Niente sezioni con nomi generici** ("Chi siamo", "I nostri servizi"). Sempre nomi moderni dal `Brief/SITEMAP.md`
- **Niente "eccellenza", "passione"** nei testi (gestito dal `Brief/COPY.md`, ma se devi adattare ricordatelo)
- Form max **4 campi** (Nome / Telefono / Tipo intervento / Indirizzo) salvo richiesta diversa
- Se cliente locale: telefono sempre `tel:` cliccabile su mobile
- Se cliente locale: cookie banner GDPR + schema.org LocalBusiness con `areaServed` esatto del `Brief/SEO.md`

---

# WORKFLOW SLASH COMMANDS (da CLAUDE.md globale)

Le 23 slash commands gstack sono attive in questo progetto. I più usati per il workflow Nexus:

- **`/office-hours`** → all'inizio del progetto, forza 6 domande di scoping prima del codice
- **`/plan-design-review`** → audit pre-implementazione con AI-Slop scoring 0-10 (target > 8/10)
- **`/design-review <preview-url>`** → review automatico di URL live con Playwright
- **`/design-shotgun`** → genera 3 varianti design via GPT Image (utile per esplorare alternative)
- **`/qa`** → audit qualità multi-aspetto
- **`/ship`** → sync + test + PR

Per scegliere palette/font/styling: attiva `ui-ux-pro-max` skill (consulta il database PRIMA di inventare).

---

# COMANDI BASE DI SVILUPPO

```bash
# Sviluppo
pnpm dev                    # Avvia dev server (Turbopack)
pnpm build                  # Build produzione
pnpm start                  # Avvia produzione locale

# Linting & type check
pnpm lint                   # ESLint
pnpm typecheck              # TypeScript check (se script presente)

# Component install
pnpm dlx shadcn@latest add @<registry>/<component>

# Deploy
git push                    # Vercel preview auto-deploy via GitHub integration
```

---

# RIFERIMENTI ESTERNI

- **Video Bible** (encoding, FFmpeg, prompt JSON Veo/Kling): vedi `sistema-nexus-workflow.md` nel progetto Claude.ai "web-design-2.0"
- **CLAUDE.md globale Nexus**: `~/.claude/CLAUDE.md` (skill, sub-agents, MCP, banlist globale)
- **Frontend Aesthetics cookbook Anthropic**: incluso verbatim nel CLAUDE.md globale

---

# CHECKLIST PRIMA DEL HANDOFF AL CLIENTE

- [ ] Tutti i copy del sito sono presi da `Brief/COPY.md` (zero invenzioni)
- [ ] Tutte le immagini "team" e "lavori" sono REALI del cliente, non stock
- [ ] Nessun font tra Inter / Roboto / Arial / Space Grotesk
- [ ] Nessun gradient viola, nessun blue #3B82F6 default come CTA
- [ ] `/plan-design-review` ha dato score > 8/10
- [ ] `/design-review` su preview Vercel ha dato pass
- [ ] Lighthouse: LCP < 2s, CLS < 0.05, INP < 200ms
- [ ] Axe a11y: 0 violation blocker
- [ ] Test multi-device (375 / 768 / 1280)
- [ ] Se cliente locale: schema.org LocalBusiness presente con `areaServed`
- [ ] Se cliente locale: telefono cliccabile su mobile (`tel:`)
- [ ] Cookie banner GDPR attivo
- [ ] Sitemap.xml + robots.txt presenti
- [ ] OG image + meta tag per ogni pagina dal `Brief/SEO.md`

---

*Template Nexus v3.0 — Ultimo aggiornamento: 20 maggio 2026 (intermezzo /nexus-design obbligatorio)*
