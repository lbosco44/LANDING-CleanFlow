import type { routing } from "@/i18n/routing";
import type messages from "./messages/it.json";

// Tipizzazione di next-intl: le chiavi passate a t() vengono controllate
// contro messages/it.json (un refuso è un errore di compilazione, non una
// stringa vuota in pagina) e gli href dei Link contro i pathname di routing.ts.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
