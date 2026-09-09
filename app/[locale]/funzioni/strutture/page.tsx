import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Building2, KeyRound, MapPin, Phone } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { FunzioneShell, FeatureRow } from "@/components/site/funzione-shell";
import { alternatesFor, ensureLocale } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "FunzStrutture" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/funzioni/strutture"),
  };
}

// Contenuto ancorato al prodotto reale: voce "Strutture" nel menu, colonna
// Struttura in agenda/calendario, note d'accesso visibili all'operatore.
// (Unica pagina senza screenshot reale: tutta a widget HTML.)
export default async function StrutturePage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("FunzStrutture");
  const d = await getTranslations("Demo");
  const list = t.raw("list") as { name: string; address: string; client: string }[];
  const rows = t.raw("row3.rows") as {
    time: string;
    client: string;
    site: string;
    service: string;
  }[];

  const widgetElenco = (
    <div className="space-y-3">
      {list.map((x) => (
        <div
          key={x.name}
          className="flex items-start gap-3.5 rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Building2 className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{x.name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{x.address}</span>
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground sm:block">
            {x.client}
          </span>
        </div>
      ))}
    </div>
  );

  const widgetNote = (
    <div className="space-y-3">
      <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft)">
        <p className="text-sm font-semibold text-foreground">{d("lombardiHouse")}</p>
        <div className="mt-3 rounded-lg bg-accent-soft p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-accent-ink">
            <KeyRound className="size-3.5" />
            {d("accessNotes")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            {d("accessText")}
          </p>
        </div>
      </div>
      {/* Come le vede l'operatore, sul telefono */}
      <div className="ml-auto w-[85%] rounded-xl border border-border bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t("row2.onPhone")}
        </p>
        <p className="mt-2 text-sm font-semibold">{d("lombardi")}</p>
        <p className="text-xs text-muted-foreground">
          {d("lombardiHouse")} · {d("lombardiStreet")}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-primary">
            <Phone className="size-3" />
            {d("callClient")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-2.5 py-1.5 text-xs font-medium text-accent-ink">
            <KeyRound className="size-3" />
            {d("accessNotes")}
          </span>
        </div>
      </div>
    </div>
  );

  const widgetColonna = (
    <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 border-b border-border px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-5">
        <span>{t("row3.headers.time")}</span>
        <span>{t("row3.headers.client")}</span>
        <span>{t("row3.headers.site")}</span>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r) => (
          <li
            key={r.time}
            className="grid grid-cols-[auto_1fr_1fr] items-center gap-x-4 px-4 py-3 sm:px-5"
          >
            <span className="font-mono text-sm text-muted-foreground tabular">
              {r.time}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{r.client}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {r.service}
              </span>
            </span>
            <span className="truncate text-sm font-medium text-accent-ink">{r.site}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <FunzioneShell
      slug="strutture"
      titolo={t("h1")}
      lead={t("lead")}
      hero={
        <div className="rounded-[1.25rem] bg-tile-strutture p-5 sm:p-8">
          {widgetElenco}
        </div>
      }
    >
      <section className="border-b border-border">
        <FeatureRow
          first
          eyebrow={t("row1.eyebrow")}
          titolo={t("row1.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-clienti p-5 sm:p-8">
              <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft)">
                <p className="text-sm font-semibold">{d("magnolie")}</p>
                <p className="text-xs text-muted-foreground">{t("row1.sub")}</p>
                <div className="mt-3 space-y-2">
                  <p className="rounded-lg border border-border px-3 py-2 text-sm">
                    {d("rooms")}
                  </p>
                  <p className="rounded-lg border border-border px-3 py-2 text-sm">
                    {d("common")}
                  </p>
                </div>
              </div>
            </div>
          }
        >
          <p>{t("row1.text")}</p>
          <p className="text-base">
            <Link
              href="/funzioni/clienti"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              {t("row1.link")}
            </Link>
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow={t("row2.eyebrow")}
          titolo={t("row2.title")}
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              {widgetNote}
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
              {widgetColonna}
            </div>
          }
        >
          <p>{t("row3.text")}</p>
          <p className="text-base">
            <Link
              href="/funzioni/calendario"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              {t("row3.link")}
            </Link>
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
