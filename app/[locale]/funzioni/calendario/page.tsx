import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";
import { productShot } from "@/lib/product-shots";
import { alternatesFor, ensureLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "FunzCalendario" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/funzioni/calendario"),
  };
}

// Contenuto ancorato alla schermata reale Calendario: vista mese con conteggio
// interventi per giorno, lista del giorno con orario/cliente/struttura/
// servizio/stato/operatori, stati (Programmato, Completato, Annullato,
// Non assegnato), bottone Nuovo intervento.

const STATO_CLS = {
  scheduled: "bg-secondary text-muted-foreground",
  inProgress: "bg-amber-100 text-amber-700",
  completed: "bg-accent-soft text-accent-ink",
  unassigned: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-50 text-red-600",
} as const;

export default async function CalendarioPage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("FunzCalendario");
  const d = await getTranslations("Demo");
  const s = await getTranslations("Common.status");
  const dates = t.raw("row2.dates") as string[];

  const Stato = ({ k }: { k: keyof typeof STATO_CLS }) => (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        STATO_CLS[k]
      )}
    >
      {s(k)}
    </span>
  );

  const widgetStati = (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(STATO_CLS) as (keyof typeof STATO_CLS)[]).map((k) => (
          <span
            key={k}
            className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", STATO_CLS[k])}
          >
            {s(k)}
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{d("lombardi")}</p>
            <p className="text-xs text-muted-foreground">{t("row3.line")}</p>
          </div>
          <Stato k="unassigned" />
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">{t("row3.hint")}</p>
      </div>
    </div>
  );

  const settimana: {
    giorno: string;
    righe: { ora: string; chi: string; stato: keyof typeof STATO_CLS }[];
  }[] = [
    {
      giorno: t("row4.day1"),
      righe: [
        { ora: "08:00", chi: d("magnolie"), stato: "scheduled" },
        { ora: "09:00", chi: d("conti"), stato: "completed" },
        { ora: "22:30", chi: d("fitzone"), stato: "scheduled" },
      ],
    },
    {
      giorno: t("row4.day2"),
      righe: [
        { ora: "14:00", chi: d("lombardi"), stato: "unassigned" },
        { ora: "19:00", chi: d("marino"), stato: "scheduled" },
      ],
    },
  ];

  const widgetSettimana = (
    <div className="space-y-3">
      {settimana.map((g) => (
        <div
          key={g.giorno}
          className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)"
        >
          <p className="border-b border-border px-4 py-2.5 text-xs font-semibold text-foreground sm:px-5">
            {g.giorno}
          </p>
          <ul className="divide-y divide-border">
            {g.righe.map((r) => (
              <li
                key={r.ora + r.chi}
                className="flex items-center gap-3 px-4 py-2.5 sm:px-5"
              >
                <span className="font-mono text-sm text-muted-foreground tabular">
                  {r.ora}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {r.chi}
                </span>
                <Stato k={r.stato} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <FunzioneShell
      slug="calendario"
      titolo={t("h1")}
      lead={t("lead")}
      hero={
        <Screenshot aspect="aspect-[16/10]" tile="bg-tile-clienti">
          <Image
            src={productShot(locale, "calendario")}
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
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
                <ul className="divide-y divide-border">
                  <li className="px-4 py-3.5 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm text-muted-foreground tabular">
                        {t("row1.time")}
                      </span>
                      <Stato k="scheduled" />
                    </div>
                    <p className="mt-1.5 text-sm font-semibold">{d("magnolie")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("row1.service")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft py-0.5 pl-1 pr-2 text-[11px] font-semibold text-accent-ink">
                        <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                          AH
                        </span>
                        {d("op2")}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
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
            <div className="rounded-[1.25rem] bg-tile-strutture p-5 sm:p-8">
              <div className="space-y-3">
                <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
                  <p className="text-sm font-semibold">{t("row2.job")}</p>
                  <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
                    {t("row2.recurring")}
                  </span>
                </div>
                <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
                  <ul className="divide-y divide-border">
                    {dates.map((g) => (
                      <li
                        key={g}
                        className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5"
                      >
                        <span className="text-sm font-medium">{g}</span>
                        <Stato k="scheduled" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          }
        >
          <p>{t("row2.text")}</p>
        </FeatureRow>

        <FeatureRow
          eyebrow={t("row3.eyebrow")}
          titolo={t("row3.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              {widgetStati}
            </div>
          }
        >
          <p>{t("row3.text")}</p>
          <p className="text-base">
            <Link
              href="/funzioni/operatori"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              {t("row3.link")}
            </Link>
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow={t("row4.eyebrow")}
          titolo={t("row4.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-operatori p-5 sm:p-8">
              {widgetSettimana}
            </div>
          }
        >
          <p>{t("row4.text")}</p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
