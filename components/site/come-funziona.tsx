import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// v2: niente sticky-scroll da 68vh a passo — 4 step compatti che si leggono in
// un viewport. Solo funzioni che esistono OGGI: niente report automatici,
// niente punteggi qualità, niente AI (vincolo founder 2026-07-02).

const STEPS: {
  n: string;
  titolo: string;
  testo: string;
  href?: string;
  hrefLabel?: string;
}[] = [
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
    href: "/funzioni/calendario",
    hrefLabel: "Vedi il calendario",
  },
  {
    n: "3",
    titolo: "L'operatore esegue dal telefono",
    testo:
      "Check-in sul posto, checklist guidata, foto del lavoro. Passo dopo passo.",
    href: "/funzioni/operatori",
    hrefLabel: "Vedi l'app dell'operatore",
  },
  {
    n: "4",
    titolo: "Tu vedi tutto, in tempo reale",
    testo:
      "Stato di ogni intervento, orari veri di check-in e check-out, storico per cliente. Sai cos'è stato fatto senza chiedere.",
  },
];

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
            Dal cliente al lavoro fatto, in un unico flusso.
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
              {s.href && (
                <Link
                  href={s.href}
                  className="mt-2.5 inline-block text-sm font-semibold text-accent-ink underline-offset-4 hover:underline"
                >
                  {s.hrefLabel} →
                </Link>
              )}
            </li>
          ))}
        </ol>

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
