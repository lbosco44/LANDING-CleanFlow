// Fonte UNICA dei piani commerciali. Prima viveva dentro components/site/prezzi.tsx
// e i prezzi erano ricopiati a mano in tre punti (card, intestazione della tabella
// di confronto, offers dello schema JSON-LD): bastava aggiornarne uno e lo
// structured data avrebbe dichiarato a Google un prezzo diverso da quello in pagina.
//
// Da qui leggono: la sezione Prezzi, lo schema SoftwareApplication, e i file
// machine-readable /llms.txt e /pricing.md che le AI (ChatGPT, Perplexity, Claude)
// interrogano per confrontare i prodotti. Cambiare un prezzo QUI li aggiorna tutti.
//
// Prezzi NETTI, IVA esclusa. Value metric = numero di operatori; clienti e
// strutture sono illimitati su ogni piano.

export type PianoKey = "base" | "pro" | "business";

export const PIANI: {
  key: PianoKey;
  nome: string;
  prezzo: string;
  operatori: string;
  /** Tetto operatori in forma numerica, per i file machine-readable. */
  maxOperatori: string;
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
    maxOperatori: "8",
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
    maxOperatori: "18",
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
    maxOperatori: "illimitati",
    per: "Per la squadra grande, con una mano in più quando serve.",
    piu: "Tutto di Pro, più",
    punti: ["Onboarding assistito", "Supporto prioritario", "Storico esteso ed export"],
    evidenza: false,
  },
];

export const GRUPPI: {
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

export const LIMITI: { t: string; base: string; pro: string; business: string }[] = [
  { t: "Operatori", base: "8", pro: "18", business: "∞" },
  { t: "Clienti", base: "∞", pro: "∞", business: "∞" },
  { t: "Strutture", base: "∞", pro: "∞", business: "∞" },
];
