import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// v2: niente sticky-scroll da 68vh a passo — 4 step compatti che si leggono in
// un viewport. Solo funzioni che esistono OGGI: niente report automatici,
// niente punteggi qualità, niente AI (vincolo founder 2026-07-02).

// Gli step 2 e 3 rimandano alle pagine funzione; il testo del link sta nel
// dizionario, la destinazione qui.
const STEP_HREF = [
  null,
  "/funzioni/calendario",
  "/funzioni/operatori",
  null,
] as const;

export function ComeFunziona() {
  const t = useTranslations("ComeFunziona");
  const steps = t.raw("steps") as { title: string; text: string; link?: string }[];

  return (
    <section
      id="come-funziona"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("h2")}
          </h2>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const href = STEP_HREF[i];
            return (
              <li
                key={s.title}
                className="border-t-2 border-border pt-5 [counter-increment:step]"
              >
                <p className="font-mono text-sm font-semibold text-accent-ink tabular">
                  {i + 1}
                </p>
                <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
                {href && s.link && (
                  <Link
                    href={href}
                    className="mt-2.5 inline-block text-sm font-semibold text-accent-ink underline-offset-4 hover:underline"
                  >
                    {s.link} →
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {/* CTA inline — picco di intenzione */}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-secondary/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="font-display text-lg font-semibold text-foreground">
            {t("ctaText")}
          </p>
          <Link
            href="/demo"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
