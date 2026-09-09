import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Building2,
  KeyRound,
  MapPin,
  Check,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { funzioneHref, type FunzioneSlug } from "@/lib/funzioni";
import { cn } from "@/lib/utils";

// v2 — Cuore della pagina: i 4 pilastri del controllo (Entrate, Clienti,
// Strutture, Operatori), numerati e alternati. Ogni pilastro mostra un widget
// dell'app RICOSTRUITO in HTML: sempre leggibile, sempre on-brand — mai
// screenshot compressi, mai fake browser chrome (Brief/DESIGN.md v2).
// Assorbe le vecchie sezioni Svolta + Moduli; i benefici per ruolo vivono nel copy.
// Testi e dati dimostrativi dei widget vengono dal dizionario della lingua.

function WidgetEntrate() {
  const w = useTranslations("Pilastri.wEntrate");
  const kpis = w.raw("kpis") as { label: string; value: string }[];
  const servizi = w.raw("services") as { name: string; amount: string }[];
  const widths = ["100%", "68%", "52%"];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={cn(
              "rounded-xl bg-card p-3.5 shadow-(--shadow-soft) sm:p-4",
              i === 0 && "col-span-2 sm:col-span-1"
            )}
          >
            <p className="text-[11px] font-medium leading-tight text-muted-foreground sm:text-xs">
              {k.label}
            </p>
            <p className="mt-1.5 whitespace-nowrap font-mono text-lg font-semibold tracking-tight text-primary tabular sm:text-xl">
              {k.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <p className="text-xs font-semibold text-muted-foreground">
          {w("perService")}
        </p>
        <ul className="mt-3 space-y-3">
          {servizi.map((s, i) => (
            <li key={s.name} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-sm text-foreground sm:w-36">
                {s.name}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: widths[i] }}
                />
              </span>
              <span className="w-16 shrink-0 text-right font-mono text-sm text-primary tabular">
                {s.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WidgetClienti() {
  const w = useTranslations("Pilastri.wClienti");
  const d = useTranslations("Demo");
  const CLIENTI = [
    { nome: d("magnolie"), tipo: d("typeCompany"), tel: w("tel1"), str: 2 },
    { nome: d("conti"), tipo: d("typePrivate"), tel: w("tel2"), str: 1 },
    { nome: d("fitzone"), tipo: d("typeCompany"), tel: w("tel3"), str: 2 },
    { nome: d("marino"), tipo: d("typeCompany"), tel: w("tel4"), str: 1 },
  ];
  return (
    <div className="rounded-xl bg-card shadow-(--shadow-soft)">
      <div className="flex items-baseline justify-between border-b border-border px-5 py-3.5">
        <p className="font-display text-sm font-semibold">{w("title")}</p>
        <p className="font-mono text-xs text-muted-foreground">{w("count")}</p>
      </div>
      <ul className="divide-y divide-border">
        {CLIENTI.map((c) => (
          <li key={c.nome} className="flex items-center gap-3 px-5 py-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
              {c.nome
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {c.nome}
              </span>
              <span className="block text-xs text-muted-foreground">
                {c.tipo}
              </span>
            </span>
            <span className="hidden font-mono text-xs text-muted-foreground tabular sm:block">
              {c.tel}
            </span>
            <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground tabular">
              {d("sites", { count: c.str })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetStrutture() {
  const d = useTranslations("Demo");
  return (
    <div className="relative">
      {/* Card retrostante: l'archivio ordinato che "spunta" */}
      <div className="absolute -top-4 right-3 left-8 rounded-xl bg-card/70 px-5 py-3 shadow-(--shadow-soft)">
        <p className="truncate text-sm font-semibold text-muted-foreground">
          {d("magnolie")} — {d("rooms")}
        </p>
      </div>
      <div className="relative rounded-xl bg-card p-5 shadow-(--shadow-soft) sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Building2 className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold">
              {d("lombardiHouse")}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              {d("lombardiAddress")}
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground sm:block">
            {d("lombardi")}
          </span>
        </div>
        <div className="mt-4 rounded-lg bg-accent-soft p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-accent-ink">
            <KeyRound className="size-3.5" />
            {d("accessNotes")}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            {d("accessText")}
          </p>
        </div>
      </div>
    </div>
  );
}

function WidgetOperatori() {
  const w = useTranslations("Pilastri.wOperatori");
  const d = useTranslations("Demo");
  const voci = w.raw("checklist") as string[];
  const fatte = [true, false, false];
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
      {/* Telefono dell'operatore, ricostruito */}
      <div className="w-[240px] shrink-0 rounded-[2rem] bg-foreground p-2 shadow-(--shadow-widget)">
        <div className="rounded-[1.55rem] bg-card px-4 py-5">
          <p className="text-xs text-muted-foreground">{w("greeting")}</p>
          <p className="font-display text-lg font-bold leading-tight">
            {d("op1First")}
          </p>
          <div className="mt-3 rounded-lg border border-border p-3">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-ink">
              {d("domesticClean")}
            </span>
            <p className="mt-2 text-sm font-semibold">{d("lombardi")}</p>
            <p className="text-xs text-muted-foreground">
              {d("lombardiHouse")} · {d("lombardiStreet")}
            </p>
            <p className="mt-2 w-fit rounded bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-secondary-foreground tabular">
              {w("checkin")}
            </p>
          </div>
          <ul className="mt-3 space-y-1.5">
            {voci.map((voce, i) => (
              <li
                key={voce}
                className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5"
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded",
                    fatte[i]
                      ? "bg-accent text-accent-foreground"
                      : "border border-border bg-card"
                  )}
                >
                  {fatte[i] && <Check className="size-3" />}
                </span>
                <span
                  className={cn(
                    "text-[11px] leading-tight",
                    fatte[i]
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  )}
                >
                  {voce}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] text-muted-foreground">
            {w("progress")}
          </p>
        </div>
      </div>

      {/* Quello che vedi tu, dall'altra parte */}
      <div className="flex flex-row flex-wrap justify-center gap-3 sm:flex-col">
        <div className="flex items-center gap-2.5 rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft)">
          <span className="animate-live size-2 shrink-0 rounded-full bg-accent" />
          <div>
            <p className="text-sm font-semibold leading-tight">{d("op1")}</p>
            <p className="text-xs text-muted-foreground">{w("op1Status")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft)">
          <span className="size-2 shrink-0 rounded-full bg-border" />
          <div>
            <p className="text-sm font-semibold leading-tight">{d("op2")}</p>
            <p className="text-xs text-muted-foreground">{w("op2Status")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PILASTRI: {
  n: string;
  key: Exclude<FunzioneSlug, "calendario">;
  tile: string;
  widget: React.ReactNode;
}[] = [
  { n: "01", key: "entrate", tile: "bg-tile-entrate", widget: <WidgetEntrate /> },
  { n: "02", key: "clienti", tile: "bg-tile-clienti", widget: <WidgetClienti /> },
  { n: "03", key: "strutture", tile: "bg-tile-strutture", widget: <WidgetStrutture /> },
  { n: "04", key: "operatori", tile: "bg-tile-operatori", widget: <WidgetOperatori /> },
];

export function Pilastri() {
  const t = useTranslations("Pilastri");
  const tf = useTranslations("Funzioni");

  return (
    <section
      id="pilastri"
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

        <div className="mt-6 sm:mt-10">
          {PILASTRI.map((p, i) => (
            <div
              key={p.n}
              className={cn(
                "grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-12 lg:gap-14",
                i > 0 && "border-t border-border"
              )}
            >
              <div
                className={cn(
                  "lg:col-span-5",
                  i % 2 === 1 && "lg:order-2 lg:col-start-8"
                )}
              >
                <p className="eyebrow text-accent-ink">
                  {p.n} — {tf(`items.${p.key}.name`)}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem] sm:leading-snug">
                  {t(`items.${p.key}.title`)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t(`items.${p.key}.text`)}
                </p>
                <Link
                  href={funzioneHref(p.key)}
                  className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-ink underline-offset-4 hover:underline"
                >
                  {t("more")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div
                className={cn(
                  "lg:col-span-7",
                  i % 2 === 1 && "lg:order-1 lg:col-start-1"
                )}
              >
                <div
                  className={cn(
                    "rounded-[1.25rem] p-5 sm:p-8",
                    p.tile,
                    p.n === "03" && "pt-9 sm:pt-11"
                  )}
                >
                  {p.widget}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
