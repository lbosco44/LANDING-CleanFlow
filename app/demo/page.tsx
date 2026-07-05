import type { Metadata } from "next";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { DemoForm } from "@/components/site/demo-form";

export const metadata: Metadata = {
  title: "Prenota una demo — 20 minuti, nessun impegno",
  description:
    "Ti mostriamo CleanFlow sui tuoi dati in 20 minuti. Nessuna carta, nessun impegno.",
};

const POINTS = [
  "Niente presentazione generica: guardiamo la tua impresa.",
  "Ti mostriamo come spariscono messaggi e fogli Excel.",
  "Capiamo insieme se CleanFlow fa per te. In caso, te lo diciamo noi.",
  "Nessuna carta, nessun impegno.",
];

export default function DemoPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Una demo di 20 minuti, sui tuoi dati.
            </h1>
            <ul className="mt-8 space-y-4">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                    <Check className="size-4" />
                  </span>
                  <span className="text-lg text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6">
              <p className="text-sm text-muted-foreground">
                Ti risponde direttamente chi costruisce CleanFlow.{" "}
                <span className="font-medium text-foreground">
                  Niente call center, niente commerciali.
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-xl ring-1 ring-black/5 sm:p-9">
            <DemoForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
