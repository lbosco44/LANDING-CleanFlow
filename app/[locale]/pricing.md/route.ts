import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { MARKDOWN_HEADERS, pricingMd } from "@/lib/machine-readable";

// /en/pricing.md — listino machine-readable in inglese.
// (/pricing.md alla root resta italiano: app/pricing.md/route.ts.)
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
  return new Response(await pricingMd(locale), { headers: MARKDOWN_HEADERS });
}
