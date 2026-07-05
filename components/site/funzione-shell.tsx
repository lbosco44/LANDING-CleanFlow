import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { buttonVariants } from "@/components/ui/button";
import { FUNZIONI, funzioneHref, type FunzioneSlug } from "@/lib/funzioni";
import { cn } from "@/lib/utils";

// Shell condivisa delle pagine /funzioni/*: stesso "registro" della home
// (eyebrow mono → titolo → contenuto, hairline tra sezioni), CTA demo in
// chiusura e cross-link alle altre funzioni. Le pagine mostrano SOLO funzioni
// che esistono oggi (vincolo founder: no report/AI/punteggi, no HQ).

export function FunzioneShell({
  slug,
  titolo,
  lead,
  hero,
  children,
}: {
  slug: FunzioneSlug;
  titolo: string;
  lead: string;
  hero?: ReactNode;
  children: ReactNode;
}) {
  const f = FUNZIONI.find((x) => x.slug === slug)!;
  const altre = FUNZIONI.filter((x) => x.slug !== slug);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        {/* Testata pagina */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[69rem] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
            <p className="eyebrow text-accent-ink">
              <Link
                href="/#pilastri"
                className="transition-colors hover:text-primary"
              >
                Funzioni
              </Link>{" "}
              · {f.numero} — {f.nome}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              {titolo}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {lead}
            </p>
            {hero && <div className="mt-10">{hero}</div>}
          </div>
        </section>

        {children}

        {/* CTA — unica azione, come in home */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-[69rem] px-5 py-14 sm:px-8">
            <div className="flex flex-col items-start gap-4 rounded-2xl bg-secondary/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  Vuoi vederlo sui tuoi dati?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  20 minuti · nessuna carta · nessun impegno
                </p>
              </div>
              <Link
                href="/demo"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto"
                )}
              >
                Prenota una demo
              </Link>
            </div>
          </div>
        </section>

        {/* Le altre funzioni */}
        <section>
          <div className="mx-auto max-w-[69rem] px-5 py-14 sm:px-8 sm:py-16">
            <p className="eyebrow text-accent-ink">Vedi anche</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {altre.map((a) => (
                <Link
                  key={a.slug}
                  href={funzioneHref(a.slug)}
                  className="group rounded-xl border border-border bg-card p-4 transition-colors duration-150 hover:border-accent/50"
                >
                  <p className="font-mono text-xs text-muted-foreground tabular">
                    {a.numero}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 font-display text-base font-semibold text-foreground">
                    {a.nome}
                    <ArrowRight className="size-4 text-accent-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.short}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/** Riga di sezione alternata testo/visual, stessa grammatica dei pilastri. */
export function FeatureRow({
  eyebrow,
  titolo,
  children,
  visual,
  reverse = false,
  first = false,
}: {
  eyebrow: string;
  titolo: string;
  children: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
  first?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-[69rem] items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-12 lg:gap-14",
        !first && "border-t border-border"
      )}
    >
      <div
        className={cn(
          "min-w-0 lg:col-span-5",
          reverse && "lg:order-2 lg:col-start-8"
        )}
      >
        <p className="eyebrow text-accent-ink">{eyebrow}</p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem] sm:leading-snug">
          {titolo}
        </h2>
        <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </div>
      </div>
      <div
        className={cn(
          "min-w-0 lg:col-span-7",
          reverse && "lg:order-1 lg:col-start-1"
        )}
      >
        {visual}
      </div>
    </div>
  );
}

/** Screenshot reale del prodotto in cornice pulita (mai fake browser chrome). */
export function Screenshot({
  children,
  aspect = "aspect-[16/10]",
  tile,
}: {
  children: ReactNode;
  aspect?: string;
  tile?: string;
}) {
  return (
    <div className={cn("rounded-[1.25rem] p-3 sm:p-5", tile ?? "bg-secondary/60")}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-soft)",
          aspect
        )}
      >
        {children}
      </div>
    </div>
  );
}
