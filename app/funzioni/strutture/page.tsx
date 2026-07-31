import type { Metadata } from "next";
import Link from "next/link";
import { Building2, KeyRound, MapPin, Phone } from "lucide-react";

import {
  FunzioneShell,
  FeatureRow,
} from "@/components/site/funzione-shell";

export const metadata: Metadata = {
  title: "Gestione strutture per imprese di pulizie",
  description:
    "Camere, uffici, palestre, appartamenti: ogni struttura ha indirizzo e note d'accesso, e ogni intervento è legato al posto giusto.",
  alternates: { canonical: "/funzioni/strutture" },
};

// Contenuto ancorato al prodotto reale: voce "Strutture" nel menu, colonna
// Struttura in agenda/calendario, note d'accesso visibili all'operatore.

function WidgetElencoStrutture() {
  const STRUTTURE = [
    {
      nome: "Villetta Lombardi",
      indirizzo: "Via delle Rose 3, Sesto San Giovanni",
      cliente: "Sig.ra Lombardi",
    },
    {
      nome: "B&B Le Magnolie — Camere 1-3",
      indirizzo: "Via Manzoni 12, Monza",
      cliente: "B&B Le Magnolie",
    },
    {
      nome: "FitZone — Sala pesi",
      indirizzo: "Viale Brianza 41, Cinisello",
      cliente: "Palestra FitZone",
    },
  ];
  return (
    <div className="space-y-3">
      {STRUTTURE.map((s) => (
        <div
          key={s.nome}
          className="flex items-start gap-3.5 rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Building2 className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {s.nome}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{s.indirizzo}</span>
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground sm:block">
            {s.cliente}
          </span>
        </div>
      ))}
    </div>
  );
}

function WidgetNoteAccesso() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft)">
        <p className="text-sm font-semibold text-foreground">
          Villetta Lombardi
        </p>
        <div className="mt-3 rounded-lg bg-accent-soft p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-accent-ink">
            <KeyRound className="size-3.5" />
            Note d&apos;accesso
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            Suonare due volte e attendere. Cane piccolo in giardino, innocuo.
          </p>
        </div>
      </div>
      {/* Come le vede l'operatore, sul telefono */}
      <div className="ml-auto w-[85%] rounded-xl border border-border bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Sul telefono dell&apos;operatore
        </p>
        <p className="mt-2 text-sm font-semibold">Sig.ra Lombardi</p>
        <p className="text-xs text-muted-foreground">
          Villetta Lombardi · Via delle Rose 3
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-primary">
            <Phone className="size-3" />
            Chiama il cliente
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-2.5 py-1.5 text-xs font-medium text-accent-ink">
            <KeyRound className="size-3" />
            Note d&apos;accesso
          </span>
        </div>
      </div>
    </div>
  );
}

function WidgetColonnaStruttura() {
  const RIGHE = [
    {
      ora: "08:00",
      cliente: "B&B Le Magnolie",
      struttura: "Aree comuni",
      servizio: "Pulizia aree comuni",
    },
    {
      ora: "09:00",
      cliente: "Famiglia Conti",
      struttura: "Appartamento Conti",
      servizio: "Pulizia settimanale",
    },
    {
      ora: "22:30",
      cliente: "Palestra FitZone",
      struttura: "Sala pesi",
      servizio: "Pulizia sala pesi",
    },
  ];
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 border-b border-border px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-5">
        <span>Orario</span>
        <span>Cliente</span>
        <span>Struttura</span>
      </div>
      <ul className="divide-y divide-border">
        {RIGHE.map((r) => (
          <li
            key={r.ora}
            className="grid grid-cols-[auto_1fr_1fr] items-center gap-x-4 px-4 py-3 sm:px-5"
          >
            <span className="font-mono text-sm text-muted-foreground tabular">
              {r.ora}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">
                {r.cliente}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {r.servizio}
              </span>
            </span>
            <span className="truncate text-sm font-medium text-accent-ink">
              {r.struttura}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StrutturePage() {
  return (
    <FunzioneShell
      slug="strutture"
      titolo="Ogni struttura con indirizzo e note d'accesso."
      lead="Le camere del B&B, la sala pesi, l'ufficio, l'appartamento: ogni posto dove lavori ha la sua scheda, con l'indirizzo e le note per entrare. Fine delle chiamate «non trovo il posto» e «come si entra?»."
      hero={
        <div className="rounded-[1.25rem] bg-tile-strutture p-5 sm:p-8">
          <WidgetElencoStrutture />
        </div>
      }
    >
      <section className="border-b border-border">
        <FeatureRow
          first
          eyebrow="Un cliente, i suoi posti"
          titolo="La struttura appartiene al cliente. E si vede."
          visual={
            <div className="rounded-[1.25rem] bg-tile-clienti p-5 sm:p-8">
              <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft)">
                <p className="text-sm font-semibold">B&amp;B Le Magnolie</p>
                <p className="text-xs text-muted-foreground">
                  2 strutture collegate
                </p>
                <div className="mt-3 space-y-2">
                  <p className="rounded-lg border border-border px-3 py-2 text-sm">
                    Camere 1-3
                  </p>
                  <p className="rounded-lg border border-border px-3 py-2 text-sm">
                    Aree comuni
                  </p>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Un B&amp;B non è un posto solo: ci sono le camere e le aree
            comuni, magari con esigenze diverse. Ogni struttura è collegata al
            suo cliente, così l&apos;anagrafica resta una e i posti sono
            tutti al loro posto.
          </p>
          <p className="text-base">
            <Link
              href="/funzioni/clienti"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              Vedi come funzionano i clienti →
            </Link>
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Note d'accesso"
          titolo="Citofono, chiavi, allarme: le note viaggiano con l'intervento."
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              <WidgetNoteAccesso />
            </div>
          }
        >
          <p>
            «Suonare due volte», «le chiavi sono dal portiere», «attenzione al
            cane»: le scrivi una volta sulla struttura e l&apos;operatore le
            trova sul telefono, dentro l&apos;intervento. Senza chiamarti alle
            7 di mattina.
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow="In calendario"
          titolo="Ogni intervento è legato al posto giusto."
          visual={
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              <WidgetColonnaStruttura />
            </div>
          }
        >
          <p>
            Nel calendario e nell&apos;agenda ogni riga ha la sua struttura:
            chi va dove è scritto, non ricordato. E quando il cliente ha più
            posti, non c&apos;è più margine per l&apos;equivoco.
          </p>
          <p className="text-base">
            <Link
              href="/funzioni/calendario"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              Vedi come funziona il calendario →
            </Link>
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
