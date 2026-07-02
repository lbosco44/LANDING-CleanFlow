"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "I miei operatori non sono tecnologici. Riusciranno a usarlo?",
    a: "Sì. L'app dell'operatore è semplice come WhatsApp: vede gli interventi di oggi, segue la checklist, scatta le foto. Niente da imparare a memoria.",
  },
  {
    q: "I miei dati sono al sicuro?",
    a: "Sì. I dati della tua impresa sono isolati e conservati su server europei. Sono tuoi e restano tuoi.",
  },
  {
    q: "Quanto tempo ci metto a partire?",
    a: "Pochi giorni. Si parte in affiancamento, sostituendo un pezzo alla volta — senza fermare il lavoro.",
  },
  {
    q: "Funziona dal telefono?",
    a: "Sì. Tu gestisci tutto dal computer o dal telefono; gli operatori lavorano direttamente dall'app sul loro telefono.",
  },
  {
    q: "Posso vederlo prima di decidere?",
    a: "Certo. In una demo di 20 minuti te lo mostriamo sui tuoi dati. Nessun impegno, nessuna carta.",
  },
  {
    q: "È un prodotto già pronto?",
    a: "È operativo e lo stiamo affinando con le prime imprese a bordo. Entri presto, conti di più: ci dici cosa ti serve davvero.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="domande" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-ink">
            Domande
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quello che i titolari ci chiedono.
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-secondary/40 sm:px-6"
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
    </section>
  );
}
