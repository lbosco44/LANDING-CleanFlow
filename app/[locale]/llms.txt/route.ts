import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { llmsTxt, TEXT_HEADERS } from "@/lib/machine-readable";

// /en/llms.txt — anagrafica del prodotto per i sistemi AI, in inglese.
// (/llms.txt alla root resta italiano: app/llms.txt/route.ts.)
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(await llmsTxt(locale), { headers: TEXT_HEADERS });
}
