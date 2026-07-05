import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Calendario — pianifichi in minuti, non a telefonate",
  description:
    "Il mese a colpo d'occhio, ogni intervento con orario, cliente, struttura, servizio, stato e operatori. La pianificazione dell'impresa di pulizie in una schermata.",
};

// Contenuto ancorato alla schermata reale Calendario: vista mese con conteggio
// interventi per giorno, lista del giorno con orario/cliente/struttura/
// servizio/stato/operatori, stati (Programmato, Completato, Annullato,
// Non assegnato), bottone Nuovo intervento.

function WidgetStati() {
  const STATI = [
    { label: "Programmato", cls: "bg-secondary text-muted-foreground" },
    { label: "In corso", cls: "bg-amber-100 text-amber-700" },
    { label: "Completato", cls: "bg-accent-soft text-accent-ink" },
    { label: "Non assegnato", cls: "bg-amber-100 text-amber-700" },
    { label: "Annullato", cls: "bg-red-50 text-red-600" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {STATI.map((s) => (
          <span
            key={s.label}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold",
              s.cls
            )}
          >
            {s.label}
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Sig.ra Lombardi</p>
            <p className="text-xs text-muted-foreground">
              Giovedì 14:00 · Villetta Lombardi · Pulizia domestica
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            Non assegnato
          </span>
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">
          Quello che manca salta all&apos;occhio prima che manchi davvero.
        </p>
      </div>
    </div>
  );
}

function WidgetSettimana() {
  const GIORNI = [
    {
      giorno: "Mercoledì 17 · oggi",
      righe: [
        { ora: "08:00", chi: "B&B Le Magnolie", stato: "Programmato", cls: "bg-secondary text-muted-foreground" },
        { ora: "09:00", chi: "Famiglia Conti", stato: "Completato", cls: "bg-accent-soft text-accent-ink" },
        { ora: "22:30", chi: "Palestra FitZone", stato: "Programmato", cls: "bg-secondary text-muted-foreground" },
      ],
    },
    {
      giorno: "Giovedì 18",
      righe: [
        { ora: "14:00", chi: "Sig.ra Lombardi", stato: "Non assegnato", cls: "bg-amber-100 text-amber-700" },
        { ora: "19:00", chi: "Studio Legale Marino", stato: "Programmato", cls: "bg-secondary text-muted-foreground" },
      ],
    },
  ];
  return (
    <div className="space-y-3">
      {GIORNI.map((g) => (
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
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                    r.cls
                  )}
                >
                  {r.stato}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function CalendarioPage() {
  return (
    <FunzioneShell
      slug="calendario"
      titolo="Pianifichi in minuti, non a telefonate."
      lead="Il mese a colpo d'occhio, con il numero di interventi su ogni giorno. Clicchi una data e vedi la lista completa: orario, cliente, struttura, servizio, stato e operatori. Il quaderno e l'Excel dei turni vanno in pensione."
      hero={
        <Screenshot aspect="aspect-[16/10]" tile="bg-tile-clienti">
          <Image
            src="/product/calendario.png"
            alt="Il calendario di CleanFlow: vista mese con interventi per giorno e lista del giorno con cliente, struttura, servizio, stato e operatori"
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
          eyebrow="Ogni riga dice tutto"
          titolo="Orario, cliente, struttura, servizio, operatori. Su una riga."
          visual={
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
                <ul className="divide-y divide-border">
                  <li className="px-4 py-3.5 sm:px-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm text-muted-foreground tabular">
                        08:00–09:30
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                        Programmato
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold">
                      B&amp;B Le Magnolie
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Aree comuni · Pulizia aree comuni
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft py-0.5 pl-1 pr-2 text-[11px] font-semibold text-accent-ink">
                        <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                          AH
                        </span>
                        Ahmed Haddad
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          }
        >
          <p>
            Niente più «a che ora era?», «in quale sede?», «chi ci va?»: ogni
            intervento porta con sé tutto quello che serve, e lo modifichi con
            un click. Un nuovo lavoro si crea in pochi secondi.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Gli stati"
          titolo="Programmato, in corso, completato: lo stato parla da solo."
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              <WidgetStati />
            </div>
          }
        >
          <p>
            Ogni intervento ha uno stato chiaro, con un colore chiaro. Un
            lavoro senza operatore si presenta da solo come «Non assegnato»:
            lo vedi oggi, non domattina alle 8.
          </p>
          <p className="text-base">
            <Link
              href="/funzioni/operatori"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              Vedi come funzionano gli operatori →
            </Link>
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow="La settimana"
          titolo="E la settimana intera, giorno per giorno."
          visual={
            <div className="rounded-[1.25rem] bg-tile-operatori p-5 sm:p-8">
              <WidgetSettimana />
            </div>
          }
        >
          <p>
            Nella dashboard trovi anche la settimana in corso, giorno per
            giorno, con gli stati di ogni intervento. La domanda «come siamo
            messi questa settimana?» smette di richiedere una riunione.
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
