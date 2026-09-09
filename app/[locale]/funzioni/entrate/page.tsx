import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText } from "lucide-react";

import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";
import { productShot } from "@/lib/product-shots";
import { alternatesFor, ensureLocale } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "FunzEntrate" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/funzioni/entrate"),
  };
}

// Pagina delle funzioni ECONOMICHE: Preventivi → lavoro → Incassi →
// Metriche/Riepilogo. Contenuto ancorato alle schermate reali dove le
// abbiamo (Metriche, Dashboard); per Preventivi/Incassi/Riepilogo il copy
// resta sul beneficio, senza inventare dettagli di interfaccia.
export default async function EntratePage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("FunzEntrate");
  const s = await getTranslations("Common.status");
  const quoteLines = t.raw("row1.lines") as { name: string; amount: string }[];
  const filters = t.raw("row2.filters") as string[];
  const kpis = t.raw("row2.kpis") as { label: string; value: string }[];
  const perServizio = t.raw("row3.rows") as {
    name: string;
    revenue: string;
    n: string;
    avg: string;
  }[];
  const servizi = t.raw("row4.rows") as {
    name: string;
    duration: string;
    price: string;
  }[];
  const incassi = t.raw("row5.rows") as {
    who: string;
    what: string;
    amount: string;
    status: "paid" | "outstanding";
  }[];

  const widgetPreventivo = (
    <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft) sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FileText className="size-4 text-accent-ink" />
          {t("row1.quoteTitle")}
        </p>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
          {t("row1.period")}
        </span>
      </div>
      <ul className="mt-4 space-y-2 border-t border-border pt-4">
        {quoteLines.map((l) => (
          <li key={l.name} className="flex items-baseline justify-between gap-4 text-sm">
            <span className="text-foreground">{l.name}</span>
            <span className="font-mono text-primary tabular">{l.amount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
        <span className="text-sm font-semibold text-foreground">{t("row1.total")}</span>
        <span className="font-mono text-lg font-semibold text-primary tabular">
          {t("row1.totalAmount")}
        </span>
      </div>
    </div>
  );

  const widgetKpi = (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {filters.map((f, i) => (
          <span
            key={f}
            className={
              i === 2
                ? "rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
                : "rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            }
          >
            {f}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
            <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
            <p className="mt-1.5 whitespace-nowrap font-mono text-xl font-semibold tracking-tight text-primary tabular">
              {k.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const widgetPerServizio = (
    <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-border px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[1fr_auto_auto_auto] sm:px-5">
        <span>{t("row3.headers.service")}</span>
        <span className="text-right">{t("row3.headers.revenue")}</span>
        <span className="hidden text-right sm:block">{t("row3.headers.jobs")}</span>
        <span className="text-right">{t("row3.headers.avg")}</span>
      </div>
      <ul className="divide-y divide-border">
        {perServizio.map((r) => (
          <li
            key={r.name}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 sm:grid-cols-[1fr_auto_auto_auto] sm:px-5"
          >
            <span className="truncate text-sm font-medium text-foreground">{r.name}</span>
            <span className="text-right font-mono text-sm text-primary tabular">
              {r.revenue}
            </span>
            <span className="hidden text-right font-mono text-sm text-muted-foreground tabular sm:block">
              {r.n}
            </span>
            <span className="text-right font-mono text-sm text-muted-foreground tabular">
              {r.avg}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const widgetServizi = (
    <div className="space-y-3">
      {servizi.map((x) => (
        <div
          key={x.name}
          className="flex items-center justify-between gap-4 rounded-xl bg-card px-4 py-3.5 shadow-(--shadow-soft) sm:px-5"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{x.name}</p>
            <p className="text-xs text-muted-foreground">
              {t("row4.duration", { d: x.duration })}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-accent-soft px-3 py-1.5 font-mono text-sm font-semibold text-accent-ink tabular">
            {x.price}
          </span>
        </div>
      ))}
    </div>
  );

  const widgetIncassi = (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
        <ul className="divide-y divide-border">
          {incassi.map((r) => (
            <li key={r.who} className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{r.who}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {r.what}
                </span>
              </span>
              <span className="font-mono text-sm text-primary tabular">{r.amount}</span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  r.status === "paid"
                    ? "bg-accent-soft text-accent-ink"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {s(r.status)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft) sm:px-5">
        <span className="text-sm font-medium text-muted-foreground">
          {t("row5.outstandingLabel")}
        </span>
        <span className="font-mono text-base font-semibold text-amber-700 tabular">
          {t("row5.outstandingAmount")}
        </span>
      </div>
    </div>
  );

  return (
    <FunzioneShell
      slug="entrate"
      titolo={t("h1")}
      lead={t("lead")}
      hero={
        <Screenshot aspect="aspect-[16/10]" tile="bg-tile-entrate">
          <Image
            src={productShot(locale, "metriche")}
            alt={t("heroAlt")}
            fill
            sizes="(min-width: 1104px) 1040px, 100vw"
            className="object-cover object-top"
            priority
          />
        </Screenshot>
      }
    >
      <section className="border-b border-border">
        <FeatureRow
          first
          eyebrow={t("row1.eyebrow")}
          titolo={t("row1.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-clienti p-5 sm:p-8">
              {widgetPreventivo}
            </div>
          }
        >
          <p>{t("row1.text")}</p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow={t("row2.eyebrow")}
          titolo={t("row2.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              {widgetKpi}
            </div>
          }
        >
          <p>{t("row2.text")}</p>
        </FeatureRow>

        <FeatureRow
          eyebrow={t("row3.eyebrow")}
          titolo={t("row3.title")}
          visual={
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              {widgetPerServizio}
            </div>
          }
        >
          <p>{t("row3.text")}</p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow={t("row4.eyebrow")}
          titolo={t("row4.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-strutture p-5 sm:p-8">
              {widgetServizi}
            </div>
          }
        >
          <p>{t("row4.text")}</p>
          <p className="text-base">
            {t.rich("row4.text2", {
              s: (chunks) => (
                <strong className="font-semibold text-foreground">{chunks}</strong>
              ),
            })}
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow={t("row5.eyebrow")}
          titolo={t("row5.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              {widgetIncassi}
            </div>
          }
        >
          <p>{t("row5.text")}</p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow={t("row6.eyebrow")}
          titolo={t("row6.title")}
          visual={
            <Screenshot aspect="aspect-[16/11]" tile="bg-secondary/60">
              <Image
                src={productShot(locale, "dashboard-2")}
                alt={t("row6.dashAlt")}
                fill
                sizes="(min-width: 1104px) 600px, 100vw"
                className="object-cover object-top"
              />
            </Screenshot>
          }
        >
          <p>{t("row6.text")}</p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
