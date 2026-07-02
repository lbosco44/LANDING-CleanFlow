import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// v2: l'UNICA àncora navy full-bleed della pagina. Il pattern a punti della
// hero ritorna qui e chiude il cerchio visivo — niente glow radiale blurrato.
export function CtaFinale() {
  return (
    <section className="relative overflow-hidden bg-anchor-deep text-on-dark">
      <div
        aria-hidden
        className="dotgrid pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-[0.10] [mask-image:linear-gradient(to_top,black,transparent)]"
      />

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-28">
        <p className="eyebrow text-[#5EE0E0]">Hai visto com&apos;è fatto</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
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
