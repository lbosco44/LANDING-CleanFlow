import type { CSSProperties } from "react";
import Link from "next/link";
import { CircleCheckBig, Clock3, CalendarClock } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { KpiCounter } from "@/components/site/kpi-counter";
import { cn } from "@/lib/utils";

// v2 "Registro di controllo": la hero è un PANNELLO navy arrotondato dentro la
// tela chiara (non una banda full-bleed). La prova del prodotto non è uno
// screenshot compresso ma un cluster di widget ricostruiti in HTML, leggibili,
// che sborda dal pannello verso la tela. Unico momento animato della pagina.

const AGENDA: {
  ora: string;
  cliente: string;
  struttura: string;
  stato: "done" | "current" | "next";
}[] = [
  {
    ora: "09:00",
    cliente: "B&B Le Magnolie",
    struttura: "Camere 1-3",
    stato: "done",
  },
  {
    ora: "11:30",
    cliente: "Palestra FitZone",
    struttura: "Sala pesi",
    stato: "current",
  },
  {
    ora: "14:00",
    cliente: "Studio Legale Marino",
    struttura: "Uffici",
    stato: "next",
  },
];

const STATO_UI = {
  done: {
    label: "Completato",
    cls: "bg-accent-soft text-accent-ink",
    icon: CircleCheckBig,
  },
  current: {
    label: "In corso",
    cls: "bg-amber-100 text-amber-700",
    icon: Clock3,
  },
  next: {
    label: "Programmato",
    cls: "bg-secondary text-muted-foreground",
    icon: CalendarClock,
  },
} as const;

export function Hero() {
  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative mx-auto max-w-[76rem] rounded-[1.75rem] bg-anchor text-on-dark sm:rounded-[2.25rem]">
        {/* Layer decorativi clippati a parte, così i widget possono sbordare dal pannello */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          {/* Firma "sala di controllo": griglia a punti, solo qui e nella CTA finale */}
          <div className="dotgrid absolute inset-x-0 top-0 h-72 opacity-[0.12] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_45%,rgba(0,26,82,0.85))]" />
        </div>

        <div className="relative mx-auto grid max-w-[69rem] grid-cols-1 gap-14 px-6 pb-14 pt-14 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-20">
          {/* Copy (min-w-0: la traccia implicita non deve allargarsi oltre il pannello) */}
          <div className="min-w-0 lg:col-span-6 lg:self-center">
            <p
              className="eyebrow hero-item text-[#5EE0E0]"
              style={{ "--d": "0ms" } as CSSProperties}
            >
              Gestionale per imprese di pulizie
            </p>

            <h1
              className="hero-item mt-5 font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.3rem]"
              style={{ "--d": "70ms" } as CSSProperties}
            >
              La tua impresa di pulizie, finalmente sotto controllo.
            </h1>

            <p
              className="hero-item mt-5 max-w-xl text-lg leading-relaxed text-on-dark-muted"
              style={{ "--d": "140ms" } as CSSProperties}
            >
              <strong className="font-semibold text-on-dark">Entrate</strong>,{" "}
              <strong className="font-semibold text-on-dark">clienti</strong>,{" "}
              <strong className="font-semibold text-on-dark">strutture</strong>{" "}
              e{" "}
              <strong className="font-semibold text-on-dark">operatori</strong>
              : tutto in ordine, in un posto solo. Senza più WhatsApp, Excel e
              telefonate.
            </p>

            <div
              className="hero-item mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--d": "210ms" } as CSSProperties}
            >
              <Link href="/demo" className={cn(buttonVariants({ size: "lg" }))}>
                Prenota una demo
              </Link>
              <a
                href="#pilastri"
                className={cn(buttonVariants({ variant: "ghostDark", size: "lg" }))}
              >
                Guarda com&apos;è fatto
              </a>
            </div>

            <p
              className="hero-item mt-4 text-sm text-on-dark-muted"
              style={{ "--d": "260ms" } as CSSProperties}
            >
              20 minuti · nessuna carta · te lo mostriamo sui tuoi dati
            </p>

            <p
              className="hero-item mt-8 flex items-start gap-2 border-t border-on-dark/15 pt-5 text-sm text-on-dark-muted"
              style={{ "--d": "320ms" } as CSSProperties}
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              In prova con le prime imprese di pulizie italiane
            </p>
          </div>

          {/* Pannello di controllo: widget HTML ricostruiti, sempre leggibili */}
          <div className="min-w-0 lg:col-span-6 lg:self-center">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Chip KPI entrate — odometro (il gestionale "lavora") */}
              <div
                className="hero-item relative z-10 ml-auto w-fit rounded-xl bg-card p-4 pr-6 text-card-foreground shadow-(--shadow-widget) lg:absolute lg:-top-6 lg:right-0"
                style={{ "--d": "260ms" } as CSSProperties}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  Incassato a giugno
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-primary tabular">
                  € <KpiCounter to={4280} />
                </p>
                <span className="absolute inset-y-3 left-0 w-1 rounded-full bg-accent" />
              </div>

              {/* Card agenda del giorno */}
              <div
                className="hero-item mt-4 rounded-2xl bg-card text-card-foreground shadow-(--shadow-widget) lg:mt-10"
                style={{ "--d": "180ms" } as CSSProperties}
              >
                <div className="flex items-baseline justify-between border-b border-border px-5 py-4">
                  <p className="font-display text-base font-semibold">
                    Agenda di oggi
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    3 interventi
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {AGENDA.map((r) => {
                    const s = STATO_UI[r.stato];
                    return (
                      <li
                        key={r.ora}
                        className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5"
                      >
                        <span className="font-mono text-[13px] text-muted-foreground tabular sm:text-sm">
                          {r.ora}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold sm:text-sm">
                            {r.cliente}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {r.struttura}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold sm:gap-1.5 sm:px-2.5 sm:text-xs",
                            s.cls
                          )}
                        >
                          <s.icon className="size-3.5" />
                          {s.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Chip operatori live — sborda dal pannello verso la tela */}
              <div
                className="hero-item relative z-10 mt-4 flex w-fit items-center gap-2.5 rounded-xl bg-card px-4 py-3 text-card-foreground shadow-(--shadow-widget) lg:absolute lg:-bottom-9 lg:left-2"
                style={{ "--d": "340ms" } as CSSProperties}
              >
                <span className="animate-live size-2 rounded-full bg-accent" />
                <p className="text-sm font-semibold">
                  2 operatori in servizio ora
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
