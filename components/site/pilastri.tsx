import Link from "next/link";
import {
  ArrowRight,
  Building2,
  KeyRound,
  MapPin,
  Check,
} from "lucide-react";

import { cn } from "@/lib/utils";

// v2 — Cuore della pagina: i 4 pilastri del controllo (Entrate, Clienti,
// Strutture, Operatori), numerati e alternati. Ogni pilastro mostra un widget
// dell'app RICOSTRUITO in HTML: sempre leggibile, sempre on-brand — mai
// screenshot compressi, mai fake browser chrome (Brief/DESIGN.md v2).
// Assorbe le vecchie sezioni Svolta + Moduli; i benefici per ruolo vivono nel copy.

function WidgetEntrate() {
  const SERVIZI = [
    { nome: "Pulizia settimanale", importo: "1.430", w: "100%" },
    { nome: "Uffici serali", importo: "980", w: "68%" },
    { nome: "Sanificazioni", importo: "745", w: "52%" },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Fatturato del mese", value: "€ 4.280", wide: true },
          { label: "Interventi completati", value: "132", wide: false },
          { label: "Valore medio", value: "€ 58", wide: false },
        ].map((k) => (
          <div
            key={k.label}
            className={cn(
              "rounded-xl bg-card p-3.5 shadow-(--shadow-soft) sm:p-4",
              k.wide && "col-span-2 sm:col-span-1"
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
          Per servizio
        </p>
        <ul className="mt-3 space-y-3">
          {SERVIZI.map((s) => (
            <li key={s.nome} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-sm text-foreground sm:w-36">
                {s.nome}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: s.w }}
                />
              </span>
              <span className="w-16 shrink-0 text-right font-mono text-sm text-primary tabular">
                € {s.importo}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WidgetClienti() {
  const CLIENTI = [
    { nome: "B&B Le Magnolie", tipo: "Azienda", tel: "349 123 4003", str: 2 },
    { nome: "Famiglia Conti", tipo: "Privato", tel: "348 123 4001", str: 1 },
    { nome: "Palestra FitZone", tipo: "Azienda", tel: "02 555 0005", str: 2 },
    { nome: "Studio Legale Marino", tipo: "Azienda", tel: "02 555 0002", str: 1 },
  ];
  return (
    <div className="rounded-xl bg-card shadow-(--shadow-soft)">
      <div className="flex items-baseline justify-between border-b border-border px-5 py-3.5">
        <p className="font-display text-sm font-semibold">Clienti</p>
        <p className="font-mono text-xs text-muted-foreground">
          6 in anagrafica
        </p>
      </div>
      <ul className="divide-y divide-border">
        {CLIENTI.map((c) => (
          <li key={c.nome} className="flex items-center gap-3 px-5 py-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
              {c.nome
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
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
              {c.str} {c.str === 1 ? "struttura" : "strutture"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetStrutture() {
  return (
    <div className="relative">
      {/* Card retrostante: l'archivio ordinato che "spunta" */}
      <div className="absolute -top-4 right-3 left-8 rounded-xl bg-card/70 px-5 py-3 shadow-(--shadow-soft)">
        <p className="truncate text-sm font-semibold text-muted-foreground">
          B&amp;B Le Magnolie — Camere 1-3
        </p>
      </div>
      <div className="relative rounded-xl bg-card p-5 shadow-(--shadow-soft) sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Building2 className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold">
              Villetta Lombardi
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              Via delle Rose 3, Sesto San Giovanni
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground sm:block">
            Sig.ra Lombardi
          </span>
        </div>
        <div className="mt-4 rounded-lg bg-accent-soft p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-accent-ink">
            <KeyRound className="size-3.5" />
            Note d&apos;accesso
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            Suonare due volte e attendere. Cane piccolo in giardino, innocuo.
          </p>
        </div>
      </div>
    </div>
  );
}

function WidgetOperatori() {
  const CHECKLIST = [
    { voce: "Spolverare le superfici", fatta: true },
    { voce: "Aspirare e lavare i pavimenti", fatta: false },
    { voce: "Sanificare i bagni", fatta: false },
  ];
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
      {/* Telefono dell'operatore, ricostruito */}
      <div className="w-[240px] shrink-0 rounded-[2rem] bg-foreground p-2 shadow-(--shadow-widget)">
        <div className="rounded-[1.55rem] bg-card px-4 py-5">
          <p className="text-xs text-muted-foreground">Ciao,</p>
          <p className="font-display text-lg font-bold leading-tight">Elena</p>
          <div className="mt-3 rounded-lg border border-border p-3">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-ink">
              Pulizia domestica
            </span>
            <p className="mt-2 text-sm font-semibold">Sig.ra Lombardi</p>
            <p className="text-xs text-muted-foreground">
              Villetta Lombardi · Via delle Rose 3
            </p>
            <p className="mt-2 w-fit rounded bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-secondary-foreground tabular">
              Check-in 17:07
            </p>
          </div>
          <ul className="mt-3 space-y-1.5">
            {CHECKLIST.map((c) => (
              <li
                key={c.voce}
                className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5"
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded",
                    c.fatta
                      ? "bg-accent text-accent-foreground"
                      : "border border-border bg-card"
                  )}
                >
                  {c.fatta && <Check className="size-3" />}
                </span>
                <span
                  className={cn(
                    "text-[11px] leading-tight",
                    c.fatta
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  )}
                >
                  {c.voce}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] text-muted-foreground">
            1 di 3 voci completate
          </p>
        </div>
      </div>

      {/* Quello che vedi tu, dall'altra parte */}
      <div className="flex flex-row flex-wrap justify-center gap-3 sm:flex-col">
        <div className="flex items-center gap-2.5 rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft)">
          <span className="animate-live size-2 shrink-0 rounded-full bg-accent" />
          <div>
            <p className="text-sm font-semibold leading-tight">Elena Bianchi</p>
            <p className="text-xs text-muted-foreground">In servizio ora</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft)">
          <span className="size-2 shrink-0 rounded-full bg-border" />
          <div>
            <p className="text-sm font-semibold leading-tight">Ahmed Haddad</p>
            <p className="text-xs text-muted-foreground">
              2 interventi oggi · alle 14:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PILASTRI = [
  {
    n: "01",
    href: "/funzioni/entrate",
    nome: "Entrate",
    titolo: "Sai quanto entra, senza aprire Excel.",
    testo:
      "Il fatturato del mese, diviso per servizio, si aggiorna da solo a ogni intervento completato. Apri CleanFlow e sai come sta andando l'azienda — smetti di chiedere «com'è andata?» a fine giornata.",
    tile: "bg-tile-entrate",
    widget: <WidgetEntrate />,
  },
  {
    n: "02",
    href: "/funzioni/clienti",
    nome: "Clienti",
    titolo: "Ogni cliente al suo posto, una volta sola.",
    testo:
      "Anagrafica, contatti e strutture collegate: inserisci il cliente una volta e lo ritrovi ovunque — nel calendario, negli interventi, nello storico dei lavori. Basta cercare numeri su WhatsApp.",
    tile: "bg-tile-clienti",
    widget: <WidgetClienti />,
  },
  {
    n: "03",
    href: "/funzioni/strutture",
    nome: "Strutture",
    titolo: "Ogni struttura con indirizzo e note d'accesso.",
    testo:
      "Le camere del B&B, la sala pesi, l'ufficio: ogni struttura porta con sé indirizzo e note d'accesso, e ogni intervento è legato al posto giusto. Fine delle chiamate «non trovo il posto» e «come si entra?».",
    tile: "bg-tile-strutture",
    widget: <WidgetStrutture />,
  },
  {
    n: "04",
    href: "/funzioni/operatori",
    nome: "Operatori",
    titolo: "Chi lavora dove, e a che punto è.",
    testo:
      "Assegni l'intervento dal calendario e l'operatore riceve tutto sul telefono: indirizzo, checklist passo-passo, foto da caricare, check-in e check-out. Tu e il team leader vedete chi c'è, chi manca e a che punto è ogni lavoro — senza una raffica di telefonate.",
    tile: "bg-tile-operatori",
    widget: <WidgetOperatori />,
  },
];

export function Pilastri() {
  return (
    <section
      id="pilastri"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">Il gestionale</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tutto in un&apos;unica sala di controllo.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            CleanFlow mette entrate, clienti, strutture e operatori nello
            stesso posto. Tu vedi tutto dall&apos;alto. Chi è sul campo sa
            esattamente cosa fare. Niente più passaparola.
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
                  {p.n} — {p.nome}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem] sm:leading-snug">
                  {p.titolo}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {p.testo}
                </p>
                <Link
                  href={p.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-ink underline-offset-4 hover:underline"
                >
                  Vedi come funziona
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
