import type { Metadata } from "next";
import Image from "next/image";
import { FileText } from "lucide-react";

import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";

export const metadata: Metadata = {
  title: "Entrate — dal preventivo all'incasso, senza fogli",
  description:
    "Preventivi, incassi, fatturato per servizio e riepilogo del periodo: in CleanFlow la parte economica dell'impresa di pulizie vive in un posto solo.",
};

// Pagina delle funzioni ECONOMICHE: Preventivi → lavoro → Incassi →
// Metriche/Riepilogo. Contenuto ancorato alle schermate reali dove le
// abbiamo (Metriche, Dashboard); per Preventivi/Incassi/Riepilogo il copy
// resta sul beneficio, senza inventare dettagli di interfaccia.

function WidgetPreventivo() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft) sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FileText className="size-4 text-accent-ink" />
          Preventivo · Palestra FitZone
        </p>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
          Giugno 2026
        </span>
      </div>
      <ul className="mt-4 space-y-2 border-t border-border pt-4">
        <li className="flex items-baseline justify-between gap-4 text-sm">
          <span className="text-foreground">
            Pulizia sala pesi · 4 volte al mese
          </span>
          <span className="font-mono text-primary tabular">€ 204</span>
        </li>
        <li className="flex items-baseline justify-between gap-4 text-sm">
          <span className="text-foreground">
            Sanificazione spogliatoi · 2 volte al mese
          </span>
          <span className="font-mono text-primary tabular">€ 102</span>
        </li>
      </ul>
      <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
        <span className="text-sm font-semibold text-foreground">
          Totale al mese
        </span>
        <span className="font-mono text-lg font-semibold text-primary tabular">
          € 306
        </span>
      </div>
    </div>
  );
}

function WidgetKpiPeriodo() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {["Questo mese", "Ultimi 12 mesi", "Quest'anno"].map((f, i) => (
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
        {[
          { label: "Fatturato", value: "€ 4.280" },
          { label: "Interventi completati", value: "132" },
          { label: "Durata media", value: "54 min" },
          { label: "Valore medio", value: "€ 58" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-card p-4 shadow-(--shadow-soft)"
          >
            <p className="text-xs font-medium text-muted-foreground">
              {k.label}
            </p>
            <p className="mt-1.5 whitespace-nowrap font-mono text-xl font-semibold tracking-tight text-primary tabular">
              {k.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WidgetPerServizio() {
  const RIGHE = [
    { nome: "Pulizia settimanale", fatt: "1.430", n: 24, medio: "72" },
    { nome: "Pulizia uffici serale", fatt: "980", n: 18, medio: "54" },
    { nome: "Sanificazione spogliatoi", fatt: "745", n: 9, medio: "51" },
    { nome: "Pulizia domestica", fatt: "620", n: 12, medio: "48" },
  ];
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-border px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[1fr_auto_auto_auto] sm:px-5">
        <span>Servizio</span>
        <span className="text-right">Fatturato</span>
        <span className="hidden text-right sm:block">Lavori</span>
        <span className="text-right">Prezzo medio</span>
      </div>
      <ul className="divide-y divide-border">
        {RIGHE.map((r) => (
          <li
            key={r.nome}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3 sm:grid-cols-[1fr_auto_auto_auto] sm:px-5"
          >
            <span className="truncate text-sm font-medium text-foreground">
              {r.nome}
            </span>
            <span className="text-right font-mono text-sm text-primary tabular">
              € {r.fatt}
            </span>
            <span className="hidden text-right font-mono text-sm text-muted-foreground tabular sm:block">
              {r.n}
            </span>
            <span className="text-right font-mono text-sm text-muted-foreground tabular">
              € {r.medio}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetServizi() {
  const SERVIZI = [
    { nome: "Pulizia settimanale", durata: "1h", prezzo: "72" },
    { nome: "Pulizia uffici serale", durata: "45 min", prezzo: "54" },
    { nome: "Sanificazione spogliatoi", durata: "50 min", prezzo: "51" },
  ];
  return (
    <div className="space-y-3">
      {SERVIZI.map((s) => (
        <div
          key={s.nome}
          className="flex items-center justify-between gap-4 rounded-xl bg-card px-4 py-3.5 shadow-(--shadow-soft) sm:px-5"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {s.nome}
            </p>
            <p className="text-xs text-muted-foreground">
              Durata prevista: {s.durata}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-accent-soft px-3 py-1.5 font-mono text-sm font-semibold text-accent-ink tabular">
            € {s.prezzo}
          </span>
        </div>
      ))}
    </div>
  );
}

function WidgetIncassi() {
  const RIGHE = [
    {
      chi: "Famiglia Conti",
      cosa: "Pulizia settimanale · giugno",
      importo: "72",
      stato: "Incassato",
      cls: "bg-accent-soft text-accent-ink",
    },
    {
      chi: "Palestra FitZone",
      cosa: "Pulizie sala pesi · giugno",
      importo: "204",
      stato: "Incassato",
      cls: "bg-accent-soft text-accent-ink",
    },
    {
      chi: "B&B Le Magnolie",
      cosa: "Aree comuni · giugno",
      importo: "143",
      stato: "Da incassare",
      cls: "bg-amber-100 text-amber-700",
    },
  ];
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
        <ul className="divide-y divide-border">
          {RIGHE.map((r) => (
            <li
              key={r.chi}
              className="flex items-center gap-3 px-4 py-3 sm:px-5"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {r.chi}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {r.cosa}
                </span>
              </span>
              <span className="font-mono text-sm text-primary tabular">
                € {r.importo}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${r.cls}`}
              >
                {r.stato}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft) sm:px-5">
        <span className="text-sm font-medium text-muted-foreground">
          Da incassare a giugno
        </span>
        <span className="font-mono text-base font-semibold text-amber-700 tabular">
          € 143
        </span>
      </div>
    </div>
  );
}

export default function EntratePage() {
  return (
    <FunzioneShell
      slug="entrate"
      titolo="Dal preventivo all'incasso, senza fogli."
      lead="La parte economica dell'impresa vive in un posto solo: prepari i preventivi, ogni intervento completato aggiorna il fatturato da solo, segni gli incassi e vedi cosa manca. E quando vuoi tirare le somme, Metriche e Riepilogo hanno già fatto i conti."
      hero={
        <Screenshot aspect="aspect-[16/10]" tile="bg-tile-entrate">
          <Image
            src="/product/metriche.png"
            alt="La pagina Metriche di CleanFlow: fatturato del periodo, interventi completati, durata media, valore medio e fatturato per servizio"
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
          eyebrow="Preventivi"
          titolo="Il preventivo nasce dove stanno i tuoi prezzi."
          visual={
            <div className="rounded-[1.25rem] bg-tile-clienti p-5 sm:p-8">
              <WidgetPreventivo />
            </div>
          }
        >
          <p>
            Basta preventivi sul blocco note o persi in una chat: li prepari
            in CleanFlow, col cliente e i servizi già in anagrafica, e restano
            lì — pronti da ritrovare quando il cliente richiama dopo un mese.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Il periodo che vuoi"
          titolo="Il quadro del mese, dell'anno, o delle date che scegli tu."
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              <WidgetKpiPeriodo />
            </div>
          }
        >
          <p>
            Quattro numeri, sempre aggiornati: fatturato, interventi
            completati, durata media, valore medio per intervento. Ogni lavoro
            completato li aggiorna da solo — la pagina Metriche sostituisce il
            foglio di calcolo della domenica sera.
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow="Per servizio"
          titolo="Vedi quale servizio rende davvero."
          visual={
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              <WidgetPerServizio />
            </div>
          }
        >
          <p>
            Il fatturato è diviso per tipo di lavoro: quante pulizie
            settimanali, quanto rendono gli uffici serali, qual è il prezzo
            medio di ogni servizio. È la differenza tra «mi sembra che vada
            bene» e saperlo.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="I servizi hanno un prezzo"
          titolo="Ogni servizio ha prezzo e durata. Il conto si fa da solo."
          visual={
            <div className="rounded-[1.25rem] bg-tile-strutture p-5 sm:p-8">
              <WidgetServizi />
            </div>
          }
        >
          <p>
            Nel catalogo Servizi definisci una volta il prezzo e la durata
            prevista di ogni tipo di lavoro. Quando pianifichi un intervento,
            l&apos;importo è già lì: a fine mese non devi ricostruire niente.
          </p>
          <p className="text-base">
            Sono i{" "}
            <strong className="font-semibold text-foreground">tuoi</strong>{" "}
            prezzi, per i tuoi clienti — li cambi quando vuoi.
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow="Incassi"
          titolo="Chi ha pagato e chi no: lo vedi, non lo insegui."
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              <WidgetIncassi />
            </div>
          }
        >
          <p>
            Il lavoro fatto è metà della storia: nella sezione Incassi segni
            quello che è entrato e vedi subito cosa resta da incassare. I
            soldi da recuperare smettono di vivere nella tua memoria.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Riepilogo"
          titolo="Le somme del periodo, già tirate."
          visual={
            <Screenshot aspect="aspect-[16/11]" tile="bg-secondary/60">
              <Image
                src="/product/dashboard-2.png"
                alt="La dashboard di CleanFlow: interventi di oggi, fatturato della settimana e fatturato del mese per servizio"
                fill
                sizes="(min-width: 1104px) 600px, 100vw"
                className="object-cover object-top"
              />
            </Screenshot>
          }
        >
          <p>
            La dashboard ti dà i numeri del giorno appena apri — interventi,
            completati, fatturato della settimana e del mese per servizio. E
            il Riepilogo mette in fila il periodo, quando vuoi vedere tutto
            insieme senza aprire dieci pagine.
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
