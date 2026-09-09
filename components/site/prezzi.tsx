import { useTranslations } from "next-intl";
import { Check, Minus, ChevronDown } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { readPiani } from "@/lib/piani";
import { cn } from "@/lib/utils";

// v2.4 — Sezione PREZZI (pattern top-SaaS: Linear/Vercel/Dropbox). Card CORTE
// (prezzo, per-chi-è, 3-4 punti chiave, CTA) + confronto dettagliato SEPARATO
// a fisarmonica per gruppo (Operativo/Economia/Squadra/Limiti), che su mobile
// evita la tabella a scroll orizzontale. <details> nativo = niente JS, SSR,
// accessibile. Value metric = operatori; clienti/strutture illimitati ovunque.
// Prezzi netti (IVA esclusa). CTA sempre "Prenota una demo" (demo-first).

// PIANI, GRUPPI e LIMITI vivono nel dizionario (lib/piani.ts li legge): stessa
// sorgente per le card, per lo schema JSON-LD e per /llms.txt e /pricing.md.

// Griglia condivisa header+righe → colonne allineate anche tra <details> diversi.
const GRID =
  "grid grid-cols-[minmax(0,1fr)_3.75rem_3.75rem_3.75rem] items-center sm:grid-cols-[minmax(0,1fr)_7rem_7rem_7rem]";

function Val({
  v,
  included,
  notIncluded,
}: {
  v: boolean | string;
  included: string;
  notIncluded: string;
}) {
  if (v === true)
    return <Check className="mx-auto size-4 text-accent-ink" aria-label={included} />;
  if (v === false)
    return (
      <Minus
        className="mx-auto size-4 text-muted-foreground/40"
        aria-label={notIncluded}
      />
    );
  return (
    <span className="block text-center font-mono text-sm font-medium text-primary tabular">
      {v}
    </span>
  );
}

export function Prezzi() {
  const t = useTranslations("Prezzi");
  const tp = useTranslations("Piani");
  const { piani, gruppi, limiti } = readPiani(tp.raw);
  const labels = { included: t("included"), notIncluded: t("notIncluded") };

  return (
    <section
      id="prezzi"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("lead")}
          </p>
        </div>

        {/* Card corte */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {piani.map((p) => {
            const dark = p.highlight;
            return (
              <div
                key={p.key}
                className={cn(
                  "relative flex flex-col rounded-[1.25rem] p-6 sm:p-7",
                  dark
                    ? "overflow-hidden bg-anchor-deep text-on-dark shadow-(--shadow-widget) lg:z-10 lg:scale-[1.04]"
                    : "border border-border bg-card shadow-(--shadow-soft)"
                )}
              >
                {dark && (
                  <div
                    aria-hidden
                    className="dotgrid pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.12] [mask-image:linear-gradient(to_bottom,black,transparent)]"
                  />
                )}
                {dark && (
                  <span className="absolute right-5 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {t("recommended")}
                  </span>
                )}

                <div className="relative flex flex-1 flex-col">
                  <p
                    className={cn(
                      "font-display text-xl font-bold",
                      dark ? "text-on-dark" : "text-foreground"
                    )}
                  >
                    {p.name}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      dark ? "text-on-dark-muted" : "text-muted-foreground"
                    )}
                  >
                    {p.operators}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span
                      className={cn(
                        "font-display text-5xl font-bold tracking-tight",
                        dark ? "text-on-dark" : "text-primary"
                      )}
                    >
                      <span className="text-accent">{t("currency")}</span>
                      {p.price}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-sm",
                        dark ? "text-on-dark-muted" : "text-muted-foreground"
                      )}
                    >
                      {t("perMonth")}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed",
                      dark ? "text-on-dark-muted" : "text-muted-foreground"
                    )}
                  >
                    {p.for}
                  </p>

                  {p.plus && (
                    <p
                      className={cn(
                        "mt-6 text-xs font-semibold uppercase tracking-wide",
                        dark ? "text-on-dark-muted" : "text-muted-foreground"
                      )}
                    >
                      {p.plus}
                    </p>
                  )}
                  <ul className={cn("space-y-2.5", p.plus ? "mt-3" : "mt-6")}>
                    {p.points.map((punto) => (
                      <li key={punto} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            dark ? "text-accent" : "text-accent-ink"
                          )}
                        />
                        <span
                          className={cn(
                            "text-[15px] leading-snug",
                            dark ? "text-on-dark" : "text-foreground"
                          )}
                        >
                          {punto}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/demo"
                    className={cn(
                      buttonVariants({ variant: dark ? "primary" : "outline" }),
                      "mt-auto w-full"
                    )}
                  >
                    {t("cta")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confronto a fisarmonica per gruppo */}
        <div className="mx-auto mt-14 max-w-3xl">
          <p className="eyebrow text-center text-muted-foreground">
            {t("compare")}
          </p>

          {/* Intestazione colonne, resta in vista mentre scorri i gruppi */}
          <div
            className={cn(
              GRID,
              "sticky top-16 z-10 mt-5 border-b border-border bg-background pb-2 pt-1"
            )}
          >
            <span />
            {piani.map((c) => (
              <div key={c.key} className="text-center">
                <span
                  className={cn(
                    "block font-display text-[13px] font-bold sm:text-base",
                    c.highlight ? "text-accent-ink" : "text-foreground"
                  )}
                >
                  {c.name}
                </span>
                <span className="block font-mono text-xs text-muted-foreground">
                  {t("currency")}
                  {c.price}
                </span>
              </div>
            ))}
          </div>

          {gruppi.map((g) => (
            <details key={g.name} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                <span className="eyebrow text-accent-ink">{g.name}</span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pb-3">
                {g.items.map((v) => (
                  <div key={v.t} className={cn(GRID, "border-t border-border/70 py-2.5")}>
                    <span className="pr-3 text-sm leading-snug text-foreground">
                      {v.t}
                    </span>
                    <Val v={v.base} {...labels} />
                    <Val v={v.pro} {...labels} />
                    <Val v={v.business} {...labels} />
                  </div>
                ))}
              </div>
            </details>
          ))}

          <details className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
              <span className="eyebrow text-accent-ink">{t("limits")}</span>
              <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-3">
              {limiti.map((l) => (
                <div key={l.t} className={cn(GRID, "border-t border-border/70 py-2.5")}>
                  <span className="pr-3 text-sm leading-snug text-foreground">
                    {l.t}
                  </span>
                  <Val v={l.base} {...labels} />
                  <Val v={l.pro} {...labels} />
                  <Val v={l.business} {...labels} />
                </div>
              ))}
            </div>
          </details>

          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
            {t("legend")}
          </p>
        </div>

        <p className="mt-10 text-center text-sm leading-relaxed text-muted-foreground">
          {t.rich("trial", {
            s: (chunks) => (
              <span className="font-semibold text-foreground">{chunks}</span>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
