import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 chiama "proxy" quello che prima era il middleware. next-intl 4.14
// espone ancora createMiddleware: fa la negoziazione della lingua, riscrive
// gli slug inglesi sui percorsi interni (/en/features/staff →
// /en/funzioni/operatori) e lascia "/" invariato per l'italiano.
export default createMiddleware(routing);

export const config = {
  matcher: [
    // La home
    "/",
    // Tutto ciò che ha già un prefisso lingua, compresi /en/llms.txt e
    // /en/pricing.md (hanno un punto: la terza regola li scarterebbe).
    // Esclusa l'immagine OG: Next la pubblica come /it/opengraph-image/… e
    // /en/opengraph-image/…, e il redirect che toglie "/it" ai crawler social
    // (WhatsApp, LinkedIn) fa perdere l'anteprima. Servita così com'è.
    "/(it|en)/((?!opengraph-image).*)",
    // Tutto il resto tranne api, asset interni e file con estensione
    // (favicon, og image, /llms.txt e /pricing.md della root restano italiani)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
