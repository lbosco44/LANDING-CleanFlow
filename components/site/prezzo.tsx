import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const POINTS = [
  "Prezzo su misura sulla tua impresa, detto in chiaro nella demo",
  "Nessuna carta, nessun impegno",
  "Condizioni dedicate per chi entra nel programma pilota",
];

export function Prezzo() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl ring-1 ring-black/5 sm:p-10">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-ink">
            Prezzo
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quanto costa? Te lo diciamo in chiaro.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Il prezzo giusto dipende da quanti operatori gestisci e da come
            lavori. Per questo non te lo nascondiamo dietro un listino finto:
            nella demo guardiamo la tua impresa e te lo diciamo in chiaro, senza
            sorprese e senza impegno.
          </p>

          <ul className="mt-6 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                  <Check className="size-4" />
                </span>
                <span className="text-base text-foreground">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/demo"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Prenota una demo
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              20 minuti · nessuna carta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
