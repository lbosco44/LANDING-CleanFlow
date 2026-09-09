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
// Prezzi NETTI, IVA esclusa, in euro in entrambe le lingue finché non arriva la
// multivaluta (punto 3b del piano). Value metric = numero di operatori.

export type PianoKey = "base" | "pro" | "business";

export type Piano = {
  key: PianoKey;
  name: string;
  price: string;
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
