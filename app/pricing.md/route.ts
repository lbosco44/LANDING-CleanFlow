import { MARKDOWN_HEADERS, pricingMd } from "@/lib/machine-readable";

// /pricing.md — listino in formato machine-readable, italiano.
// Gli assistenti AI confrontano i prodotti PER CONTO di chi deve comprare: se i
// prezzi sono leggibili solo dopo aver renderizzato una pagina (o peggio, sono
// dietro un "contatta il commerciale"), il prodotto viene semplicemente escluso
// dal confronto a favore di concorrenti più leggibili. Qui il listino è testo
// puro, con i limiti numerici espliciti.
// La versione inglese vive su /en/pricing.md; il generatore è unico.
export const dynamic = "force-static";

export async function GET() {
  return new Response(await pricingMd("it"), { headers: MARKDOWN_HEADERS });
}
