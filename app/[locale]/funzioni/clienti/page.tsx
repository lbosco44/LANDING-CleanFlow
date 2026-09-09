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

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "FunzClienti" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/funzioni/clienti"),
  };
}

// Contenuto ancorato alla schermata reale Clienti (anagrafica con tipo,
// telefono, email, numero di strutture) e alla presenza del cliente in
// agenda/calendario.
export default async function ClientiPage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("FunzClienti");
  const d = await getTranslations("Demo");
  const s = await getTranslations("Common.status");
  const siti = t.raw("row2.sites") as string[];

  const iniziali = (nome: string) =>
    nome
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("");

  const tipi = [
    { nome: d("magnolie"), tipo: d("typeCompany"), n: 2 },
    { nome: d("conti"), tipo: d("typePrivate"), n: 1 },
    { nome: d("fitzone"), tipo: d("typeCompany"), n: 2 },
    { nome: d("lombardi"), tipo: d("typePrivate"), n: 1 },
    { nome: d("marino"), tipo: d("typeCompany"), n: 1 },
  ];

  const widgetTipi = (
    <ul className="divide-y divide-border overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      {tipi.map((c) => (
        <li key={c.nome} className="flex items-center gap-3 px-4 py-3 sm:px-5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
            {iniziali(c.nome)}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">
            {c.nome}
          </span>
          <span className="hidden shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:block">
            {c.tipo}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {d("sites", { count: c.n })}
          </span>
        </li>
      ))}
    </ul>
  );

  // Lo stesso cliente, tre posti diversi
  const widgetOvunque = (
    <div className="space-y-3">
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t("row3.inRegistry")}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
            {iniziali(d("magnolie"))}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{d("magnolie")}</p>
            <p className="text-xs text-muted-foreground">{t("row3.registryLine")}</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t("row3.inCalendar")}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground tabular">
            08:00
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{d("magnolie")}</p>
            <p className="text-xs text-muted-foreground">{t("row3.calendarLine")}</p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            {s("scheduled")}
          </span>
        </div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t("row3.inHistory")}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground tabular">
            {t("row3.historyDate")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{d("magnolie")}</p>
            <p className="text-xs text-muted-foreground">{t("row3.historyLine")}</p>
          </div>
          <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
            {s("completed")}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <FunzioneShell
      slug="clienti"
      titolo={t("h1")}
      lead={t("lead")}
      hero={
        <Screenshot aspect="aspect-[16/10]" tile="bg-tile-clienti">
          <Image
            src={productShot(locale, "clienti")}
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
              {widgetTipi}
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
              <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft)">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                    {iniziali(d("magnolie"))}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{d("magnolie")}</p>
                    <p className="text-xs text-muted-foreground">{t("row2.sub")}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {siti.map((x) => (
                    <p
                      key={x}
                      className="rounded-lg border border-border px-3 py-2 text-sm text-foreground"
                    >
                      {x}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <p>{t("row2.text")}</p>
          <p className="text-base">
            <Link
              href="/funzioni/strutture"
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
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              {widgetOvunque}
            </div>
          }
        >
          <p>{t("row3.text")}</p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
