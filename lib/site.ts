// Dati reali dell'azienda e costanti condivise del sito.
// Usati da footer, pagine legali, CTA mobile e (futuro) schema.org.
export const COMPANY = {
  legalName: "JS DIGITAL SRLS",
  vat: "03000200901",
  sdi: "N92GLON",
  address: "Corso Vittorio Veneto 39, 07026 Olbia (SS)",
  pec: "jsdigitalsrls@pec.it",
  email: "serraonlinemarketing@gmail.com",
  // Contatto pubblico in pagina: email di dominio (fiducia B2B). Il Gmail
  // resta come recapito del titolare nelle pagine legali.
  publicEmail: "marketing@cleanflowapp.it",
  phoneDisplay: "333 807 4768",
  phoneHref: "tel:+393338074768",
} as const;

// Consenso cookie: chiave localStorage + eventi per coordinare banner / CTA mobile.
export const CONSENT_KEY = "cf-consent";
export const CONSENT_EVENT = "cf:consent"; // scelta effettuata → mostra CTA mobile
export const OPEN_COOKIE_EVENT = "cf:open-cookie"; // riapri il banner dal footer
