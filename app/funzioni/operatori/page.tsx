import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera, Check, KeyRound, Phone, Plus } from "lucide-react";

import {
  FunzioneShell,
  FeatureRow,
  Screenshot,
} from "@/components/site/funzione-shell";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "App operatori e turni per imprese di pulizie",
  description:
    "Assegni gli interventi dal calendario e l'operatore riceve tutto sul telefono: indirizzo, note d'accesso, checklist, check-in e check-out.",
  alternates: { canonical: "/funzioni/operatori" },
};

// Contenuto ancorato al prodotto reale: pagina Operatori (contatti, lavori
// svolti, stato), assegnazione dal calendario (chips + "Operatori"), app
// dell'operatore (giornata, chiama cliente, note, check-in/out, checklist,
// foto del lavoro). NIENTE report automatici / punteggi / AI.

function WidgetAssegnazione() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Palestra FitZone</p>
            <p className="text-xs text-muted-foreground">
              22:30–23:30 · Sala pesi · Pulizia sala pesi
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            Programmato
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft py-1 pl-1.5 pr-2.5 text-xs font-semibold text-accent-ink">
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              AH
            </span>
            Ahmed Haddad
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Plus className="size-3" />
            Operatori
          </span>
        </div>
      </div>
      <div className="rounded-xl bg-card p-4 shadow-(--shadow-soft) sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Famiglia Conti</p>
            <p className="text-xs text-muted-foreground">
              Giovedì · Appartamento Conti · Pulizia appartamento
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            Non assegnato
          </span>
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">
          I buchi si vedono subito: nessun intervento parte scoperto senza che
          tu lo sappia.
        </p>
      </div>
    </div>
  );
}

function WidgetPhoneOperatore() {
  const CHECKLIST = [
    { voce: "Spolverare le superfici", fatta: true },
    { voce: "Aspirare e lavare i pavimenti", fatta: true },
    { voce: "Sanificare i bagni", fatta: false },
  ];
  return (
    <div className="mx-auto w-[250px] rounded-[2rem] bg-foreground p-2 shadow-(--shadow-widget)">
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
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-medium text-primary">
              <Phone className="size-2.5" />
              Chiama il cliente
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2 py-1 text-[10px] font-medium text-accent-ink">
              <KeyRound className="size-2.5" />
              Note d&apos;accesso
            </span>
          </div>
          <div className="mt-2.5 flex gap-2">
            <span className="rounded bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-secondary-foreground tabular">
              Check-in 17:07
            </span>
            <span className="rounded bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-secondary-foreground tabular">
              Check-out 18:02
            </span>
          </div>
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
        <p className="mt-2.5 flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-2 text-[11px] font-medium text-secondary-foreground">
          <Camera className="size-3.5" />
          Foto del lavoro · 2 caricate
        </p>
      </div>
    </div>
  );
}

export default function OperatoriPage() {
  return (
    <FunzioneShell
      slug="operatori"
      titolo="Chi lavora dove, e a che punto è."
      lead="Tu assegni dal calendario, l'operatore riceve la giornata sul telefono: indirizzo, note d'accesso, checklist, foto. Tu e il team leader vedete chi c'è, chi manca e a che punto è ogni lavoro — senza telefonate."
      hero={
        <Screenshot aspect="aspect-[16/9]" tile="bg-tile-operatori">
          <Image
            src="/product/operatori.png"
            alt="La pagina Operatori di CleanFlow: contatti, lavori svolti e stato di ogni operatore"
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
          eyebrow="La squadra"
          titolo="Contatti e lavori svolti, per ogni operatore."
          visual={
            <div className="rounded-[1.25rem] bg-tile-operatori p-5 sm:p-8">
              <div className="overflow-hidden rounded-xl bg-card shadow-(--shadow-soft)">
                <ul className="divide-y divide-border">
                  {[
                    { nome: "Elena Bianchi", lavori: 4 },
                    { nome: "Ahmed Haddad", lavori: 2 },
                    { nome: "Michele Negrone", lavori: 0 },
                  ].map((o) => (
                    <li
                      key={o.nome}
                      className="flex items-center gap-3 px-4 py-3 sm:px-5"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                        {o.nome
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                        {o.nome}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground tabular">
                        {o.lavori} lavori
                      </span>
                      <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
                        Attivo
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        >
          <p>
            La pagina Operatori è il registro della squadra: telefono, email,
            quanti lavori ha fatto ognuno, chi è attivo. Quando devi decidere
            chi mandare, i numeri sono lì.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Assegnazione"
          titolo="Assegni dal calendario. I buchi si vedono da soli."
          visual={
            <div className="rounded-[1.25rem] bg-secondary/60 p-5 sm:p-8">
              <WidgetAssegnazione />
            </div>
          }
        >
          <p>
            Sull&apos;intervento metti uno o più operatori con un click. Se un
            lavoro resta scoperto, lo stato «Non assegnato» te lo dice prima
            che diventi un problema alle 8 del mattino.
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

        <FeatureRow
          eyebrow="L'app dell'operatore"
          titolo="La giornata sul telefono, semplice come WhatsApp."
          visual={
            <div className="rounded-[1.25rem] bg-tile-operatori p-5 sm:p-8">
              <WidgetPhoneOperatore />
            </div>
          }
        >
          <p>
            L&apos;operatore apre il telefono e trova i suoi interventi:
            cliente, struttura, indirizzo, il bottone per chiamare, le note
            d&apos;accesso. Check-in quando arriva, check-out quando finisce —
            con gli orari veri.
          </p>
          <p>
            Funziona dal browser del telefono,{" "}
            <strong className="font-semibold text-foreground">
              senza installare niente
            </strong>
            : nessuno store, nessun aggiornamento da spiegare.
          </p>
        </FeatureRow>

        <FeatureRow
          reverse
          eyebrow="Checklist e foto"
          titolo="Cosa fare, passo passo. E le foto restano sul lavoro."
          visual={
            <div className="rounded-[1.25rem] bg-tile-entrate p-5 sm:p-8">
              <div className="space-y-2.5">
                {[
                  { voce: "Spolverare tutte le superfici", fatta: true },
                  { voce: "Aspirare e lavare i pavimenti", fatta: true },
                  { voce: "Sanificare bagni (sanitari + specchi)", fatta: true },
                  { voce: "Svuotare i cestini", fatta: false },
                ].map((c) => (
                  <div
                    key={c.voce}
                    className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-(--shadow-soft)"
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded",
                        c.fatta
                          ? "bg-accent text-accent-foreground"
                          : "border border-border bg-card"
                      )}
                    >
                      {c.fatta && <Check className="size-3.5" />}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        c.fatta
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {c.voce}
                    </span>
                  </div>
                ))}
                <p className="px-1 font-mono text-xs text-muted-foreground tabular">
                  3 di 4 voci completate
                </p>
              </div>
            </div>
          }
        >
          <p>
            Ogni servizio ha la sua checklist: l&apos;operatore spunta le voci
            man mano, e tu sai cosa è stato fatto davvero — non «tutto ok
            capo». Le foto del lavoro si caricano dal telefono e restano
            attaccate all&apos;intervento.
          </p>
        </FeatureRow>
      </section>
    </FunzioneShell>
  );
}
