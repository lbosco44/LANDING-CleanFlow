import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Camera, Check, KeyRound, Phone, Plus } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";
import { alternatesFor, ensureLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "FunzOperatori" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/funzioni/operatori"),
  };
}

// Contenuto ancorato al prodotto reale: pagina Operatori (contatti, lavori
// svolti, stato), assegnazione dal calendario (chips + "Operatori"), app
// dell'operatore (giornata, chiama cliente, note, check-in/out, checklist,
// foto del lavoro). NIENTE report automatici / punteggi / AI.
export default async function OperatoriPage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("FunzOperatori");
  const d = await getTranslations("Demo");
  const s = await getTranslations("Common.status");
  const p = await getTranslations("Pilastri.wOperatori");
  const checklistPhone = p.raw("checklist") as string[];
  const checklistFull = t.raw("row4.checklist") as string[];

  const squadra = [
    { nome: d("op1"), lavori: 4 },
    { nome: d("op2"), lavori: 2 },
    { nome: d("op3"), lavori: 0 },
  ];

  const widgetSquadra = (
    <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      <ul className="divide-y divide-border">
        {squadra.map((o) => (
          <li key={o.nome} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
              {o.nome
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {o.nome}
            </span>
            <span className="shrink-0 font-mono text-xs text-muted-foreground tabular">
              {t("row1.jobs", { count: o.lavori })}
            </span>
            <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
              {s("active")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const widgetAssegnazione = (
    <div className="space-y-3">
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{d("fitzone")}</p>
            <p className="text-xs text-muted-foreground">{t("row2.job1Line")}</p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            {s("scheduled")}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft py-1 pl-1.5 pr-2.5 text-xs font-semibold text-accent-ink">
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              AH
            </span>
            {d("op2")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Plus className="size-3" />
            {t("row2.addOperators")}
          </span>
        </div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{d("conti")}</p>
            <p className="text-xs text-muted-foreground">{t("row2.job2Line")}</p>
          </div>
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            {s("unassigned")}
          </span>
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">{t("row2.hint")}</p>
      </div>
    </div>
  );

  const fattePhone = [true, true, false];
  const widgetPhone = (
    <div className="mx-auto w-[250px] rounded-[2rem] bg-foreground p-2 shadow-(--shadow-widget)">
      <div className="rounded-[1.55rem] bg-card px-4 py-5">
        <p className="text-xs text-muted-foreground">{p("greeting")}</p>
        <p className="font-display text-lg font-bold leading-tight">{d("op1First")}</p>
        <div className="mt-3 rounded-lg border border-border p-3">
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-ink">
            {d("domesticClean")}
          </span>
          <p className="mt-2 text-sm font-semibold">{d("lombardi")}</p>
          <p className="text-xs text-muted-foreground">
            {d("lombardiHouse")} · {d("lombardiStreet")}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-medium text-primary">
              <Phone className="size-2.5" />
              {d("callClient")}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-[10px] font-medium text-accent-ink">
              <KeyRound className="size-2.5" />
              {d("accessNotes")}
            </span>
          </div>
          <div className="mt-2.5 flex gap-2">
            <span className="rounded bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-secondary-foreground tabular">
              {t("row3.checkin")}
            </span>
            <span className="rounded bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-secondary-foreground tabular">
              {t("row3.checkout")}
            </span>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {checklistPhone.map((voce, i) => (
            <li
              key={voce}
              className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5"
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded",
                  fattePhone[i]
                    ? "bg-accent text-accent-foreground"
                    : "border border-border bg-card"
                )}
              >
                {fattePhone[i] && <Check className="size-3" />}
              </span>
              <span
                className={cn(
                  "text-[11px] leading-tight",
                  fattePhone[i]
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                )}
              >
                {voce}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2.5 flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-2 text-[11px] font-medium text-secondary-foreground">
          <Camera className="size-3.5" />
          {t("row3.photos")}
        </p>
      </div>
    </div>
  );

  const fatteFull = [true, true, true, false];
  const widgetChecklist = (
    <div className="space-y-2.5">
      {checklistFull.map((voce, i) => (
        <div
          key={voce}
          className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft)"
        >
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded",
              fatteFull[i]
                ? "bg-accent text-accent-foreground"
                : "border border-border bg-card"
            )}
          >
            {fatteFull[i] && <Check className="size-3.5" />}
          </span>
          <span
            className={cn(
              "text-sm",
              fatteFull[i] ? "text-muted-foreground line-through" : "text-foreground"
            )}
          >
            {voce}
          </span>
        </div>
      ))}
      <p className="px-1 font-mono text-xs text-muted-foreground tabular">
        {t("row4.progress")}
      </p>
    </div>
  );

  return (
    <FunzioneShell
      slug="operatori"
      titolo={t("h1")}
      lead={t("lead")}
      hero={
        <Screenshot aspect="aspect-[16/9]" tile="bg-tile-operatori">
          <Image
            src="/product/operatori.png"
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
            <div className="rounded-[1.25rem] bg-tile-operatori p-5 sm:p-8">
              {widgetSquadra}
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
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              {widgetAssegnazione}
            </div>
          }
        >
          <p>{t("row2.text")}</p>
          <p className="text-base">
            <Link
              href="/funzioni/calendario"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              {t("row2.link")}
            </Link>
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow={t("row3.eyebrow")}
          titolo={t("row3.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-operatori p-5 sm:p-8">
              {widgetPhone}
            </div>
          }
        >
          <p>{t("row3.text1")}</p>
          <p>
            {t.rich("row3.text2", {
              s: (chunks) => (
                <strong className="font-semibold text-foreground">{chunks}</strong>
              ),
            })}
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow={t("row4.eyebrow")}
          titolo={t("row4.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              {widgetChecklist}
            </div>
          }
        >
          <p>{t("row4.text")}</p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
