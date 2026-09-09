import { llmsTxt, TEXT_HEADERS } from "@/lib/machine-readable";

// /llms.txt — file di contesto per i sistemi AI (spec: llmstxt.org), italiano.
// La versione inglese vive su /en/llms.txt (app/[locale]/llms.txt/route.ts);
// il generatore è unico: lib/machine-readable.ts.
//
// Google dichiara di non usarlo per AI Overviews: serve per gli altri motori.
export const dynamic = "force-static";

export async function GET() {
  return new Response(await llmsTxt("it"), { headers: TEXT_HEADERS });
}
