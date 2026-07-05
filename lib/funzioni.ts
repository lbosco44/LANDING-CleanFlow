// Registry delle pagine funzione (/funzioni/*): unica fonte per pilastri,
// footer, cross-link "Vedi anche" e sitemap. v2.1 — la landing resta corta,
// chi vuole approfondire clicca ed entra nella pagina dedicata.
// VIETATO in queste pagine: report automatici, punteggi qualità, AI, sezione HQ.
export const FUNZIONI = [
  {
    slug: "entrate",
    numero: "01",
    nome: "Entrate",
    short: "Quanto entra, da quale servizio",
  },
  {
    slug: "clienti",
    numero: "02",
    nome: "Clienti",
    short: "Anagrafica unica, per sempre",
  },
  {
    slug: "strutture",
    numero: "03",
    nome: "Strutture",
    short: "Indirizzi e note d'accesso",
  },
  {
    slug: "operatori",
    numero: "04",
    nome: "Operatori",
    short: "Squadra e app sul telefono",
  },
  {
    slug: "calendario",
    numero: "05",
    nome: "Calendario",
    short: "Pianifichi senza telefonate",
  },
] as const;

export type FunzioneSlug = (typeof FUNZIONI)[number]["slug"];

export const funzioneHref = (slug: FunzioneSlug) => `/funzioni/${slug}`;
