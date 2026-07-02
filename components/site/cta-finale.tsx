import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaFinale() {
  return (
    <section className="relative overflow-hidden bg-anchor-deep text-on-dark">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[440px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Riprenditi le tue ore.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-on-dark-muted">
          Ti mostriamo CleanFlow sui tuoi dati in 20 minuti. Se non fa per te,
          te lo diciamo noi.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link href="/demo" className={cn(buttonVariants({ size: "lg" }))}>
            Prenota una demo
          </Link>
          <p className="text-sm text-on-dark-muted">
            Nessuna carta · nessun impegno
          </p>
        </div>
      </div>
    </section>
  );
}
