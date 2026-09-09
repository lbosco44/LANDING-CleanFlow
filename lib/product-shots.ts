import type { Locale } from "@/i18n/routing";

// Screenshot reali dell'app usati dalle pagine /funzioni/*. L'app è solo in
// italiano: la versione inglese (`<nome>-en.png`) è lo stesso scatto con i
// testi dell'interfaccia tradotti nel DOM prima della cattura. Nessuna persona
// reale in nessuna delle due: nomi ed email sono quelli della demo.
export type ProductShot =
  | "operatori"
  | "clienti"
  | "metriche"
  | "calendario"
  | "dashboard-2";

export function productShot(locale: Locale, key: ProductShot) {
  return locale === "it" ? `/product/${key}.png` : `/product/${key}-en.png`;
}
