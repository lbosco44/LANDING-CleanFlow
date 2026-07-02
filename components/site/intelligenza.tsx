"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Check, ScanLine, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

function ScoreRing({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - v / 100);

  return (
    <div ref={ref} className="relative size-36">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold text-foreground tabular">
          {v}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          Quality Score
        </span>
      </div>
    </div>
  );
}

const CHECKS: { label: string; ok: boolean }[] = [
  { label: "Superfici e pavimenti", ok: true },
  { label: "Sanitari e specchi", ok: true },
  { label: "Vetro d'ingresso", ok: false },
];

export function Intelligenza() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-ink">
            L&apos;intelligenza
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un occhio in più sulla qualità.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            CleanFlow legge le foto di fine lavoro e dà un punteggio di qualità
            all&apos;intervento. Ti accorgi di un problema prima che lo faccia il
            cliente.
          </p>
          <p className="mt-6 rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3 font-medium text-foreground">
            È un aiuto, non un giudice: l&apos;ultima parola resta sempre tua.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 shadow-xl ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Intervento · esempio
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-ink">
                <ScanLine className="size-3.5" />
                Analisi foto
              </span>
            </div>

            <div className="mt-5 flex justify-center">
              <ScoreRing value={92} />
            </div>

            <ul className="mt-6 space-y-2.5 text-sm">
              {CHECKS.map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full",
                      c.ok
                        ? "bg-accent-soft text-accent-ink"
                        : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {c.ok ? (
                      <Check className="size-4" />
                    ) : (
                      <TriangleAlert className="size-3.5" />
                    )}
                  </span>
                  <span className="text-foreground">{c.label}</span>
                  <span
                    className={cn(
                      "ml-auto text-xs font-medium",
                      c.ok ? "text-muted-foreground" : "text-amber-700"
                    )}
                  >
                    {c.ok ? "ok" : "da rivedere"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
