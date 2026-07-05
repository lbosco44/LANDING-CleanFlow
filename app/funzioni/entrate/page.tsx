import type { Metadata } from "next";
import Image from "next/image";

import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";

export const metadata: Metadata = {
  title: "Entrate — sai quanto entra, senza aprire Excel",
  description:
    "Fatturato del periodo, valore medio per intervento e resa di ogni servizio: in CleanFlow le entrate si aggiornano da sole a ogni lavoro completato.",
};

// Contenuto ancorato alle schermate reali: Metriche (KPI + per servizio),
// Servizi (catalogo con prezzi) e Dashboard (fatturato settimana + per mese).

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

export default function EntratePage() {
  return (
    <FunzioneShell
      slug="entrate"
      titolo="Sai quanto entra, senza aprire Excel."
      lead="Ogni intervento completato aggiorna il fatturato da solo. Tu apri CleanFlow e trovi il quadro già fatto: quanto è entrato, da quale servizio, a che valore medio. La pagina si chiama Metriche — e sostituisce il foglio di calcolo della domenica sera."
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
            completati, durata media, valore medio per intervento. Cambi
            periodo con un click — questo mese, gli ultimi 12, o le date che
            decidi tu.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
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
            Sono i <strong className="font-semibold text-foreground">tuoi</strong>{" "}
            prezzi, per i tuoi clienti — li cambi quando vuoi.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Ogni mattina"
          titolo="Appena apri, la settimana è già sotto controllo."
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
            Anche senza aprire Metriche, la dashboard ti dà i numeri del
            giorno: interventi di oggi, quanti completati, fatturato della
            settimana e del mese per servizio. Un colpo d&apos;occhio mentre
            bevi il caffè.
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
