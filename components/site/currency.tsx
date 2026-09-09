"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

import {
  CURRENCIES,
  CURRENCY_CODE,
  CURRENCY_SYMBOL,
  isCurrency,
  type Currency,
} from "@/lib/piani";
import { cn } from "@/lib/utils";

// Valuta della sezione Prezzi. La sezione resta un server component: qui
// vivono solo le tre isole client che le servono — il provider con lo stato,
// il selettore a pillole e il prezzo che cambia. Il resto della pagina non
// idrata nulla in più.
//
// La scelta si ricorda nel browser (localStorage): chi torna ritrova la sua
// valuta, in entrambe le lingue. Il primo render usa la valuta di default
// della lingua (€ in italiano, £ in inglese), così l'HTML statico ha già un
// prezzo leggibile e i crawler non vedono un buco.
//
// Lo stato è uno store esterno letto con `useSyncExternalStore`: niente
// useState + useEffect (la regola `react-hooks/set-state-in-effect` lo vieta,
// e a ragione: un render in più a ogni montaggio). Il server legge sempre
// `null` → default della lingua; il client legge localStorage, e React
// riconcilia da solo dopo l'idratazione.

const STORAGE_KEY = "cf-currency";

// Copia in memoria: vale anche quando localStorage è bloccato (modalità
// privata, policy aziendali): la scelta dura la visita invece di perdersi.
let memory: Currency | null = null;
const listeners = new Set<() => void>();

function readStored(): Currency | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (isCurrency(v)) return v;
  } catch {
    // localStorage non disponibile: resta la copia in memoria.
  }
  return memory;
}

function store(c: Currency) {
  memory = c;
  try {
    localStorage.setItem(STORAGE_KEY, c);
  } catch {
    // idem: la scelta vale per questa visita.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Un'altra scheda cambia valuta → questa la segue.
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
} | null>(null);

export function CurrencyProvider({
  initial,
  children,
}: {
  initial: Currency;
  children: ReactNode;
}) {
  const stored = useSyncExternalStore(subscribe, readStored, () => null);
  const currency = stored ?? initial;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: store }}>
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency va usato dentro <CurrencyProvider>.");
  return ctx;
}

/** Pillole EUR | USD | GBP, stesso disegno del toggle lingua nell'header. */
export function CurrencyPicker({ label }: { label: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="flex items-center rounded-full border border-border bg-card p-0.5"
      >
        {CURRENCIES.map((c) => {
          const active = c === currency;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCurrency(c)}
              className={cn(
                // Pill da 36px con area di tocco ≥44px via pseudo-elemento,
                // come il toggle lingua: il disegno resta leggero, il pollice no.
                "relative h-9 rounded-full px-3 text-xs font-semibold tracking-wide transition-colors duration-150 before:absolute before:-inset-x-0.5 before:-inset-y-1.5 before:content-['']",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span aria-hidden className="mr-1">
                {CURRENCY_SYMBOL[c]}
              </span>
              {CURRENCY_CODE[c]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Simbolo + importo nella valuta scelta: "€99", "$115", "£85". */
export function Price({
  prices,
  symbolClassName,
}: {
  prices: Record<Currency, string>;
  symbolClassName?: string;
}) {
  const { currency } = useCurrency();
  return (
    <>
      <span className={symbolClassName}>{CURRENCY_SYMBOL[currency]}</span>
      {prices[currency]}
    </>
  );
}

/** Testo che dipende dalla valuta, es. "/mese + IVA" contro "/mese + tasse". */
export function PerCurrency({ labels }: { labels: Record<Currency, string> }) {
  const { currency } = useCurrency();
  return <>{labels[currency]}</>;
}
