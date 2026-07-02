import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// v2: niente sticky-scroll da 68vh a passo — 4 step compatti che si leggono in
// un viewport. Il Quality Score vive dentro lo step 4 (niente sezione "AI"
// autonoma: è un aiuto, non il protagonista).

const STEPS = [
  {
    n: "1",
    titolo: "Crei il cliente e le sue strutture",
    testo:
      "Anagrafica, indirizzi, note di accesso. Una volta sola: poi è sempre lì.",
  },
  {
    n: "2",
    titolo: "Pianifichi sul calendario",
    testo:
      "Assegni l'intervento all'operatore giusto. Lui lo riceve sul telefono.",
  },
  {
    n: "3",
    titolo: "L'operatore esegue dal telefono",
    testo:
      "Check-in sul posto, checklist guidata, foto prima e dopo. Passo dopo passo.",
  },
  {
    n: "4",
    titolo: "Report e punteggio qualità, da soli",
    testo:
      "A fine lavoro il report è pronto, con le foto e un punteggio di qualità. Lo invii al cliente in un tocco.",
    score: true,
  },
];

function MiniScore() {
  // Anello statico al 92: niente count-up (Brief v2 — niente animazioni sui dati)
  const r = 15.5;
  const circ = 2 * Math.PI * r;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft py-1 pl-1.5 pr-3">
      <svg viewBox="0 0 38 38" className="size-7 -rotate-90" aria-hidden>
        <circle
          cx="19"
          cy="19"
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="4"
        />
        <circle
          cx="19"
          cy="19"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - 0.92)}
        />
      </svg>
      <span className="font-mono text-xs font-semibold text-accent-ink tabular">
        Qualità 92
      </span>
    </span>
  );
}

export function ComeFunziona() {
  return (
    <section
      id="come-funziona"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">Come funziona</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dal cliente al report, in un unico flusso.
          </h2>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="border-t-2 border-border pt-5 [counter-increment:step]"
            >
              <p className="font-mono text-sm font-semibold text-accent-ink tabular">
                {s.n}
              </p>
              <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-foreground">
                {s.titolo}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {s.testo}
              </p>
              {s.score && (
                <div className="mt-3">
                  <MiniScore />
                </div>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3 text-[15px] font-medium text-foreground">
          Il punteggio qualità legge le foto di fine lavoro: ti accorgi di un
          problema prima che lo faccia il cliente. È un aiuto, non un giudice —
          l&apos;ultima parola resta sempre tua.
        </p>

        {/* CTA inline — picco di intenzione */}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-secondary/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="font-display text-lg font-semibold text-foreground">
            Te lo facciamo vedere sui tuoi interventi.
          </p>
          <Link
            href="/demo"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            Prenota una demo
          </Link>
        </div>
      </div>
    </section>
  );
}
