import Link from "next/link";
import { Check, Minus, ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// v2.4 — Sezione PREZZI (pattern top-SaaS: Linear/Vercel/Dropbox). Card CORTE
// (prezzo, per-chi-è, 3-4 punti chiave, CTA) + confronto dettagliato SEPARATO
// a fisarmonica per gruppo (Operativo/Economia/Squadra/Limiti), che su mobile
// evita la tabella a scroll orizzontale. <details> nativo = niente JS, SSR,
// accessibile. Value metric = operatori; clienti/strutture illimitati ovunque.
// Prezzi netti (IVA esclusa). CTA sempre "Prenota una demo" (demo-first).

type Key = "base" | "pro" | "business";

const PIANI: {
  key: Key;
  nome: string;
  prezzo: string;
  operatori: string;
  per: string;
  piu?: string;
  punti: string[];
  evidenza: boolean;
}[] = [
  {
    key: "base",
    nome: "Base",
    prezzo: "99",
    operatori: "fino a 8 operatori",
    per: "Per chi parte e vuole smettere di gestire tutto sui messaggi.",
    punti: [
      "Agenda, clienti e strutture, tutto collegato",
      "App operatore con checklist e foto",
      "Storico dei lavori sempre a portata",
    ],
    evidenza: false,
  },
  {
    key: "pro",
    nome: "Pro",
    prezzo: "129",
    operatori: "fino a 18 operatori",
    per: "Per l'impresa strutturata che vuole vedere anche i numeri.",
    piu: "Tutto di Base, più",
    punti: ["Preventivi e incassi", "Metriche: sai quanto entra", "Ruolo caposquadra"],
    evidenza: true,
  },
  {
    key: "business",
    nome: "Business",
    prezzo: "199",
    operatori: "operatori illimitati",
    per: "Per la squadra grande, con una mano in più quando serve.",
    piu: "Tutto di Pro, più",
    punti: ["Onboarding assistito", "Supporto prioritario", "Storico esteso ed export"],
    evidenza: false,
  },
];

const GRUPPI: {
  nome: string;
  voci: { t: string; base: boolean; pro: boolean; business: boolean }[];
}[] = [
  {
    nome: "Operativo",
    voci: [
      { t: "Calendario e agenda", base: true, pro: true, business: true },
      { t: "Clienti e strutture", base: true, pro: true, business: true },
      { t: "Servizi e listino", base: true, pro: true, business: true },
      { t: "Checklist e template", base: true, pro: true, business: true },
      { t: "Interventi ricorrenti", base: true, pro: true, business: true },
      { t: "App operatore (mobile)", base: true, pro: true, business: true },
      { t: "Foto a corredo dell'intervento", base: true, pro: true, business: true },
      { t: "Storico e cestino", base: true, pro: true, business: true },
      { t: "Manuali e guide", base: true, pro: true, business: true },
    ],
  },
  {
    nome: "Gestione economica",
    voci: [
      { t: "Preventivi", base: false, pro: true, business: true },
      { t: "Incassi", base: false, pro: true, business: true },
      { t: "Metriche e dashboard", base: false, pro: true, business: true },
      { t: "Riepilogo mensile", base: false, pro: true, business: true },
    ],
  },
  {
    nome: "Squadra e supporto",
    voci: [
      { t: "Ruolo caposquadra", base: false, pro: true, business: true },
      { t: "Onboarding assistito", base: false, pro: false, business: true },
      { t: "Supporto prioritario", base: false, pro: false, business: true },
      { t: "Export e storico esteso", base: false, pro: false, business: true },
    ],
  },
];

const LIMITI: { t: string; base: string; pro: string; business: string }[] = [
  { t: "Operatori", base: "8", pro: "18", business: "∞" },
  { t: "Clienti", base: "∞", pro: "∞", business: "∞" },
  { t: "Strutture", base: "∞", pro: "∞", business: "∞" },
];

// Griglia condivisa header+righe → colonne allineate anche tra <details> diversi.
const GRID =
  "grid grid-cols-[minmax(0,1fr)_3.75rem_3.75rem_3.75rem] items-center sm:grid-cols-[minmax(0,1fr)_7rem_7rem_7rem]";

function Val({ v }: { v: boolean | string }) {
  if (v === true)
    return <Check className="mx-auto size-4 text-accent-ink" aria-label="incluso" />;
  if (v === false)
    return (
      <Minus
        className="mx-auto size-4 text-muted-foreground/40"
        aria-label="non incluso"
      />
    );
  return (
    <span className="block text-center font-mono text-sm font-medium text-primary tabular">
      {v}
    </span>
  );
}

export function Prezzi() {
  return (
    <section
      id="prezzi"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">Piani</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Scegli il piano su misura per te.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Il prezzo dipende da una cosa sola: quanti operatori gestisci.
            Clienti e strutture sono sempre illimitati. Prezzi al mese, IVA
            esclusa.
          </p>
        </div>

        {/* Card corte */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PIANI.map((p) => {
            const dark = p.evidenza;
            return (
              <div
                key={p.key}
                className={cn(
                  "relative flex flex-col rounded-[1.25rem] p-6 sm:p-7",
                  dark
                    ? "overflow-hidden bg-anchor-deep text-on-dark shadow-(--shadow-widget) lg:z-10 lg:scale-[1.04]"
                    : "border border-border bg-card shadow-(--shadow-soft)"
                )}
              >
                {dark && (
                  <div
                    aria-hidden
                    className="dotgrid pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.12] [mask-image:linear-gradient(to_bottom,black,transparent)]"
                  />
                )}
                {dark && (
                  <span className="absolute right-5 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Consigliato
                  </span>
                )}

                <div className="relative flex flex-1 flex-col">
                  <p
                    className={cn(
                      "font-display text-xl font-bold",
                      dark ? "text-on-dark" : "text-foreground"
                    )}
                  >
                    {p.nome}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      dark ? "text-on-dark-muted" : "text-muted-foreground"
                    )}
                  >
                    {p.operatori}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span
                      className={cn(
                        "font-display text-5xl font-bold tracking-tight",
                        dark ? "text-on-dark" : "text-primary"
                      )}
                    >
                      <span className="text-accent">€</span>
                      {p.prezzo}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-sm",
                        dark ? "text-on-dark-muted" : "text-muted-foreground"
                      )}
                    >
                      /mese + IVA
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed",
                      dark ? "text-on-dark-muted" : "text-muted-foreground"
                    )}
                  >
                    {p.per}
                  </p>

                  {p.piu && (
                    <p
                      className={cn(
                        "mt-6 text-xs font-semibold uppercase tracking-wide",
                        dark ? "text-on-dark-muted" : "text-muted-foreground"
                      )}
                    >
                      {p.piu}
                    </p>
                  )}
                  <ul className={cn("space-y-2.5", p.piu ? "mt-3" : "mt-6")}>
                    {p.punti.map((punto) => (
                      <li key={punto} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            dark ? "text-accent" : "text-accent-ink"
                          )}
                        />
                        <span
                          className={cn(
                            "text-[15px] leading-snug",
                            dark ? "text-on-dark" : "text-foreground"
                          )}
                        >
                          {punto}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/demo"
                    className={cn(
                      buttonVariants({ variant: dark ? "primary" : "outline" }),
                      "mt-auto w-full"
                    )}
                  >
                    Prenota una demo
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confronto a fisarmonica per gruppo */}
        <div className="mx-auto mt-14 max-w-3xl">
          <p className="eyebrow text-center text-muted-foreground">
            Confronta i piani
          </p>

          {/* Intestazione colonne, resta in vista mentre scorri i gruppi */}
          <div
            className={cn(
              GRID,
              "sticky top-16 z-10 mt-5 border-b border-border bg-background pb-2 pt-1"
            )}
          >
            <span />
            {[
              { n: "Base", p: "99", hi: false },
              { n: "Pro", p: "129", hi: true },
              { n: "Business", p: "199", hi: false },
            ].map((c) => (
              <div key={c.n} className="text-center">
                <span
                  className={cn(
                    "block font-display text-[13px] font-bold sm:text-base",
                    c.hi ? "text-accent-ink" : "text-foreground"
                  )}
                >
                  {c.n}
                </span>
                <span className="block font-mono text-xs text-muted-foreground">
                  €{c.p}
                </span>
              </div>
            ))}
          </div>

          {GRUPPI.map((g) => (
            <details key={g.nome} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                <span className="eyebrow text-accent-ink">{g.nome}</span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pb-3">
                {g.voci.map((v) => (
                  <div key={v.t} className={cn(GRID, "border-t border-border/70 py-2.5")}>
                    <span className="pr-3 text-sm leading-snug text-foreground">
                      {v.t}
                    </span>
                    <Val v={v.base} />
                    <Val v={v.pro} />
                    <Val v={v.business} />
                  </div>
                ))}
              </div>
            </details>
          ))}

          <details className="group border-b border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
              <span className="eyebrow text-accent-ink">Limiti</span>
              <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-3">
              {LIMITI.map((l) => (
                <div key={l.t} className={cn(GRID, "border-t border-border/70 py-2.5")}>
                  <span className="pr-3 text-sm leading-snug text-foreground">
                    {l.t}
                  </span>
                  <Val v={l.base} />
                  <Val v={l.pro} />
                  <Val v={l.business} />
                </div>
              ))}
            </div>
          </details>

          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
            ✓ incluso · — non incluso · ∞ illimitati
          </p>
        </div>

        <p className="mt-10 text-center text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">
            14 giorni di prova gratuita
          </span>
          , nessuna carta. In demo vediamo insieme quale piano fa per te — sui
          tuoi numeri, senza impegno.
        </p>
      </div>
    </section>
  );
}
