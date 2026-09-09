// Registry delle pagine funzione (/funzioni/*): unica fonte per pilastri,
// footer, cross-link "Vedi anche" e sitemap. v2.1 — la landing resta corta,
// chi vuole approfondire clicca ed entra nella pagina dedicata.
// VIETATO in queste pagine: report automatici, punteggi qualità, AI, sezione HQ.
//
// Nome e sottotitolo di ogni funzione vivono in messages/<locale>.json sotto
// `Funzioni.items.<slug>` (sono testo visibile, quindi tradotti). Qui restano
// solo slug e numero, che non cambiano con la lingua.
export const FUNZIONI = [
  { slug: "entrate", numero: "01" },
  { slug: "clienti", numero: "02" },
  { slug: "strutture", numero: "03" },
  { slug: "operatori", numero: "04" },
  { slug: "calendario", numero: "05" },
] as const;

export type FunzioneSlug = (typeof FUNZIONI)[number]["slug"];

/** Percorso INTERNO della pagina: i Link di @/i18n/navigation lo traducono nello slug della lingua. */
export const funzioneHref = (slug: FunzioneSlug) =>
  `/funzioni/${slug}` as const;
