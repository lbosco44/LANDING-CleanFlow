"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, FileCheck2, Smartphone, UserPlus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: 1,
    icon: UserPlus,
    title: "Crei il cliente e i suoi immobili",
    text: "Anagrafica, indirizzi, note di accesso. Una volta sola: poi è sempre lì.",
    img: "/product/clienti.png",
    alt: "Schermata clienti di CleanFlow",
  },
  {
    n: 2,
    icon: CalendarDays,
    title: "Pianifichi sul calendario",
    text: "Assegni l'intervento all'operatore giusto con il calendario. Lui lo riceve sul telefono.",
    img: "/product/calendario.png",
    alt: "Calendario interventi di CleanFlow",
  },
  {
    n: 3,
    icon: Smartphone,
    title: "L'operatore esegue dal telefono",
    text: "Check-in sul posto, checklist guidata, foto prima e dopo. Sa sempre cosa fare, passo dopo passo.",
    img: "/product/operatore-mobile.png",
    alt: "App mobile dell'operatore CleanFlow",
  },
  {
    n: 4,
    icon: FileCheck2,
    title: "Report e Quality Score, da soli",
    text: "A fine lavoro il report è già pronto, con le foto e un punteggio di qualità. Lo invii al cliente in un tocco.",
    img: "/product/metriche.png",
    alt: "Report e metriche di CleanFlow",
  },
];

export function ComeFunziona() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section id="come-funziona" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-ink">
            Come funziona
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dal cliente al report, in un unico flusso.
          </h2>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Steps */}
          <ol className="space-y-4 lg:space-y-0">
            {STEPS.map((s, i) => (
              <li key={s.n}>
                <div
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-idx={i}
                  className="lg:flex lg:min-h-[68vh] lg:flex-col lg:justify-center"
                >
                  <div
                    className={cn(
                      "rounded-2xl border p-6 transition-colors sm:p-7",
                      active === i
                        ? "border-accent/40 bg-card shadow-sm"
                        : "border-border bg-card/40 lg:opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-10 items-center justify-center rounded-xl transition-colors",
                          active === i
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        <s.icon className="size-5" />
                      </span>
                      <span className="font-display text-sm font-semibold tracking-wide text-accent-ink">
                        Passo <span className="tabular">{s.n}</span>
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-foreground sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>

                    {/* Immagine inline (mobile) */}
                    <div className="mt-5 overflow-hidden rounded-xl border border-border lg:hidden">
                      <Image
                        src={s.img}
                        alt={s.alt}
                        width={1265}
                        height={950}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Prodotto sticky (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl ring-1 ring-black/5">
                <div className="flex h-9 items-center gap-1.5 border-b border-border bg-secondary px-4">
                  <span className="size-2.5 rounded-full bg-[#E2574C]" />
                  <span className="size-2.5 rounded-full bg-[#E5A53B]" />
                  <span className="size-2.5 rounded-full bg-[#3FB04F]" />
                </div>
                <div className="relative aspect-4/3 bg-card">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.n}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={step.img}
                        alt={step.alt}
                        fill
                        sizes="(min-width:1024px) 40vw, 100vw"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                {STEPS.map((s, i) => (
                  <span
                    key={s.n}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      active === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA inline — picco di intenzione */}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-border bg-secondary/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
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
