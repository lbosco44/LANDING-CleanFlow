"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { FAQS } from "@/components/site/faq-data";

// v2: assorbe le vecchie sezioni Prezzo e Pilot (vedi faq-data). L'item aperto
// ha lo sfondo tintato: micro-pattern a costo zero che guida l'occhio.
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="domande"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-accent-ink">Domande</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quello che i titolari ci chiedono.
          </h2>

          <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={cn(
                    "transition-colors duration-150",
                    isOpen && "bg-accent-soft/40"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180 text-accent-ink"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-base leading-relaxed text-muted-foreground sm:px-6">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
