import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { LeadTracker } from "@/components/site/lead-tracker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Grazie",
  robots: { index: false, follow: false },
};

const PREP = [
  "Pensa a quante ore a settimana passi a coordinare operatori e clienti.",
  "Tieni a mente quanti interventi gestisci in una settimana tipo.",
  "Se vuoi, prepara un paio di clienti reali: li usiamo come esempio nella demo.",
];

export default function GraziePage() {
  return (
    <>
      <LeadTracker />
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
            <CircleCheckBig className="size-8" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ci siamo. Ti ricontattiamo a breve.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Grazie. Ti scriviamo o chiamiamo entro{" "}
            <span className="font-medium text-foreground">
              un giorno lavorativo
            </span>{" "}
            per fissare la demo.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-7 text-left shadow-sm">
            <p className="font-display text-lg font-semibold text-foreground">
              Intanto, per arrivare pronti:
            </p>
            <ul className="mt-4 space-y-3">
              {PREP.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "mt-10")}
          >
            Torna alla home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
