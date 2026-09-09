import type { Locale } from "@/i18n/routing";

// Fonte UNICA dei piani commerciali. Prima viveva dentro components/site/prezzi.tsx
// e i prezzi erano ricopiati a mano in tre punti (card, intestazione della tabella
// di confronto, offers dello schema JSON-LD): bastava aggiornarne uno e lo
// structured data avrebbe dichiarato a Google un prezzo diverso da quello in pagina.
//
// Con le due lingue i dati stanno in messages/<locale>.json sotto `Piani`
// (nomi, "per chi", punti sono testo visibile). Da lì leggono: la sezione Prezzi,
// lo schema SoftwareApplication e i file machine-readable /llms.txt e
// /pricing.md. Cambiare un prezzo nei DUE json li aggiorna tutti.
//
// Prezzi NETTI (IVA o tasse escluse), in TRE valute: euro, dollaro USA, sterlina.
// Lingua e valuta sono indipendenti (decisione del 30/08/2026): la sezione Prezzi
// parte dalla valuta di default della lingua e lascia scegliere le altre due.
// Dollaro e sterlina sono prezzi FISSI (cambio BCE dell'8/9/2026 arrotondato al
// tondo, scelta di Lorenzo del 09/09), gli stessi caricati su Stripe come
// `currency_options`: devono coincidere con `LISTINO` nell'app.
// Value metric = numero di operatori.

export const CURRENCIES = ["eur", "usd", "gbp"] as const;
export type Currency = (typeof CURRENCIES)[number];

/** Valuta proposta per prima: euro in italiano, sterlina in inglese (pubblico
 *  UK-first; chi è negli USA passa al dollaro con un tocco). */
export const DEFAULT_CURRENCY: Record<Locale, Currency> = { it: "eur", en: "gbp" };

export const CURRENCY_SYMBOL: Record<Currency, string> = { eur: "€", usd: "$", gbp: "£" };

/** Codice ISO maiuscolo, per lo schema.org (`priceCurrency`) e le etichette. */
export const CURRENCY_CODE: Record<Currency, string> = { eur: "EUR", usd: "USD", gbp: "GBP" };

export function isCurrency(v: unknown): v is Currency {
  return typeof v === "string" && (CURRENCIES as readonly string[]).includes(v);
}

export type PianoKey = "base" | "pro" | "business";

export type Piano = {
  key: PianoKey;
  name: string;
  /** Prezzo mensile intero per valuta, come stringa ("99", "115", "85"). */
  prices: Record<Currency, string>;
  operators: string;
  /** Tetto operatori in forma numerica, per i file machine-readable. */
  maxOperators: string;
  for: string;
  /** Vuoto sul piano base ("Tutto di X, più" solo dal secondo in poi). */
  plus: string;
  points: string[];
  highlight: boolean;
};

export type Gruppo = {
  name: string;
  items: { t: string; base: boolean; pro: boolean; business: boolean }[];
};

export type Limite = { t: string; base: string; pro: string; business: string };

type PianiRaw = (key: "plans" | "groups" | "limitRows") => unknown;

/** Legge piani, gruppi di confronto e limiti dal namespace `Piani` (t.raw). */
export function readPiani(raw: PianiRaw) {
  return {
    piani: raw("plans") as Piano[],
    gruppi: raw("groups") as Gruppo[],
    limiti: raw("limitRows") as Limite[],
  };
}
