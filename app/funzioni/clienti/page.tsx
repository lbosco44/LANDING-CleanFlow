import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";

export const metadata: Metadata = {
  title: "Gestione clienti per imprese di pulizie",
  description:
    "Privati e aziende, contatti e strutture collegate: inserisci il cliente una volta e lo ritrovi nel calendario, negli interventi e nello storico.",
  alternates: { canonical: "/funzioni/clienti" },
};

// Contenuto ancorato alla schermata reale Clienti (anagrafica con tipo,
// telefono, email, numero di strutture) e alla presenza del cliente in
// agenda/calendario.

function WidgetClienteOvunque() {
  return (
    <div className="space-y-3">
      {/* Lo stesso cliente, tre posti diversi */}
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          In anagrafica
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
            BL
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">B&amp;B Le Magnolie</p>
            <p className="text-xs text-muted-foreground">
              Azienda · 349 123 4003 · 2 strutture
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Nel calendario
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground tabular">
            08:00
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">B&amp;B Le Magnolie</p>
            <p className="text-xs text-muted-foreground">
              Aree comuni · Pulizia aree comuni
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            Programmato
          </span>
        </div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft)">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Nello storico
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground tabular">
            16 giu
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">B&amp;B Le Magnolie</p>
            <p className="text-xs text-muted-foreground">
              Camere 1-3 · Cambio camere check-out
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
            Completato
          </span>
        </div>
      </div>
    </div>
  );
}

function WidgetTipiCliente() {
  const CLIENTI = [
    { nome: "B&B Le Magnolie", tipo: "Azienda", extra: "2 strutture" },
    { nome: "Famiglia Conti", tipo: "Privato", extra: "1 struttura" },
    { nome: "Palestra FitZone", tipo: "Azienda", extra: "2 strutture" },
    { nome: "Sig.ra Lombardi", tipo: "Privato", extra: "1 struttura" },
    { nome: "Studio Legale Marino", tipo: "Azienda", extra: "1 struttura" },
  ];
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
      {CLIENTI.map((c) => (
        <li key={c.nome} className="flex items-center gap-3 px-4 py-3 sm:px-5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
            {c.nome
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">
            {c.nome}
          </span>
          <span className="hidden shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:block">
            {c.tipo}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {c.extra}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ClientiPage() {
  return (
    <FunzioneShell
      slug="clienti"
      titolo="Ogni cliente al suo posto, una volta sola."
      lead="L'anagrafica delle persone e delle attività che servi: privati e aziende, telefono, email e le strutture collegate. Inserisci il cliente una volta — poi lo ritrovi ovunque, senza mai ricopiarlo."
      hero={
        <Screenshot aspect="aspect-[16/10]" tile="bg-tile-clienti">
          <Image
            src="/product/clienti.png"
            alt="La pagina Clienti di CleanFlow: anagrafica con telefono, email e strutture collegate per ogni cliente"
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
          eyebrow="Privati e aziende"
          titolo="Il B&B, la palestra, la signora del piano di sopra."
          visual={
            <div className="rounded-[1.25rem] bg-tile-clienti p-5 sm:p-8">
              <WidgetTipiCliente />
            </div>
          }
        >
          <p>
            Ogni cliente ha la sua scheda: privato o azienda, telefono, email.
            Il numero non vive più nella chat di WhatsApp o su un foglio — è
            nell&apos;anagrafica, e ci arrivi in due tocchi anche dal telefono.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Cliente → strutture"
          titolo="Ogni cliente porta con sé i suoi posti."
          visual={
            <div className="rounded-[1.25rem] bg-tile-strutture p-5 sm:p-8">
              <div className="rounded-xl bg-card p-5 shadow-(--shadow-soft)">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                    BL
                  </span>
                  <div>
                    <p className="text-sm font-semibold">B&amp;B Le Magnolie</p>
                    <p className="text-xs text-muted-foreground">
                      Azienda · 2 strutture collegate
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {["B&B Le Magnolie — Camere 1-3", "B&B Le Magnolie — Aree comuni"].map(
                    (s) => (
                      <p
                        key={s}
                        className="rounded-lg border border-border px-3 py-2 text-sm text-foreground"
                      >
                        {s}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          }
        >
          <p>
            Le camere, le aree comuni, l&apos;appartamento: le strutture del
            cliente stanno sotto la sua scheda, con indirizzo e note
            d&apos;accesso. Quando pianifichi, scegli il cliente e il posto
            giusto è già lì.
          </p>
          <p className="text-base">
            <Link
              href="/funzioni/strutture"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              Vedi come funzionano le strutture →
            </Link>
          </p>
        </FeatureRow>

        <FeatureRow
          eyebrow="Un solo nome, ovunque"
          titolo="Il cliente ti segue in calendario, negli interventi, nello storico."
          visual={
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              <WidgetClienteOvunque />
            </div>
          }
        >
          <p>
            Niente doppioni, niente «ma questo è lo stesso cliente?»: la
            scheda è una, e ogni intervento passato e futuro le resta
            attaccato. Apri il cliente e sai cosa gli hai fatto, quando, e chi
            ci è andato.
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
