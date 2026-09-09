import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Config per-richiesta: risolve la locale del segmento [locale] e carica il
// dizionario messages/<locale>.json. Una locale sconosciuta ricade sull'italiano
// (il layout fa comunque notFound() prima di arrivare qui).
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
