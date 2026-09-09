import { getTranslations } from "next-intl/server";

import { getPathname } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { FUNZIONI, funzioneHref } from "@/lib/funzioni";
import { readPiani } from "@/lib/piani";
import { SITE_URL } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

// Generatori dei file machine-readable letti dai sistemi AI (ChatGPT,
// Perplexity, Claude): /llms.txt (anagrafica del prodotto, spec llmstxt.org) e
// /pricing.md (listino in testo puro). Le versioni italiane stanno alla root,
// quelle inglesi sotto /en/. Stesse costanti che alimentano la pagina (piani,
// FAQ, funzioni), così non possono divergere dal sito. Nessun claim nuovo qui
// dentro: solo testi già approvati in Brief/COPY.md e nel dizionario.

const HEADERS = (type: string) => ({
  "Content-Type": `${type}; charset=utf-8`,
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
});

export const TEXT_HEADERS = HEADERS("text/plain");
export const MARKDOWN_HEADERS = HEADERS("text/markdown");

const url = (locale: Locale, href: Pathname) =>
  `${SITE_URL}${getPathname({ locale, href })}`;

/** Radice dei file di lingua: "" per l'italiano, "/en" per l'inglese. */
const prefix = (locale: Locale) => (locale === "it" ? "" : `/${locale}`);

export async function llmsTxt(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "Llms" });
  const tf = await getTranslations({ locale, namespace: "Funzioni" });
  const tq = await getTranslations({ locale, namespace: "Faq" });
  const tp = await getTranslations({ locale, namespace: "Piani" });
  const { piani } = readPiani(tp.raw);
  const faqs = tq.raw("items") as { q: string; a: string }[];
  const bullets = t.raw("bullets") as string[];
  const notes = t.raw("notes") as string[];
  const pricingUrl = `${SITE_URL}${prefix(locale)}/pricing.md`;

  return `# CleanFlow

> ${t("tagline")}

## ${t("whatH")}

${t("whatP")}

${bullets.map((b) => `- ${b}`).join("\n")}

## ${t("featuresH")}

${FUNZIONI.map(
  (f) =>
    `- [${tf(`items.${f.slug}.name`)}](${url(locale, funzioneHref(f.slug))}): ${tf(`items.${f.slug}.short`)}`
).join("\n")}

## ${t("pricesH")}

${t("pricesP")}

${piani
  .map(
    (p) =>
      `- ${t("planLine", { name: p.name, price: p.price, operators: p.operators, for: p.for })}`
  )
  .join("\n")}

${t("detail")}: [${pricingUrl}](${pricingUrl})

## ${t("faqH")}

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## ${t("contactsH")}

- ${t("contactDemo")}: ${url(locale, "/demo")}
- ${t("contactEmail")}: ${COMPANY.publicEmail}
- ${t("contactPhone")}: ${locale === "it" ? COMPANY.phoneDisplay : COMPANY.phoneIntl}
- ${t("contactCompany")}: ${COMPANY.legalName}, ${COMPANY.address} — ${t("vat")} ${COMPANY.vat}

## ${t("notesH")}

${notes.map((n) => `- ${n}`).join("\n")}
`;
}

export async function pricingMd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "PricingMd" });
  const tp = await getTranslations({ locale, namespace: "Piani" });
  const { piani, gruppi, limiti } = readPiani(tp.raw);
  const notes = t.raw("notes") as string[];
  const segno = (v: boolean) => (v ? t("included") : t("notIncluded"));
  const lim = (v: string) => (v === "∞" ? t("unlimitedM") : v);
  const heads = piani.map((p) => p.name).join(" | ");

  return `# ${t("title")}

${t("intro1")}
${t("intro2")}
${t("intro3")}

${t("updated")} · ${t("official")}: ${SITE_URL}${prefix(locale)}/#prezzi

${piani
  .map(
    (p) => `## ${p.name}

- ${t("price")}: ${t("priceLine", { price: p.price })}
- ${t("operatorsIncluded")}: ${p.maxOperators}
- ${t("clients")}: ${t("unlimitedM")}
- ${t("sites")}: ${t("unlimitedF")}
- ${t("for")}: ${p.for}
- ${t("highlights")}: ${p.points.join("; ")}`
  )
  .join("\n\n")}

## ${t("comparisonH")}

${gruppi
  .map(
    (g) => `### ${g.name}

| ${t("feature")} | ${heads} |
|---|---|---|---|
${g.items.map((v) => `| ${v.t} | ${segno(v.base)} | ${segno(v.pro)} | ${segno(v.business)} |`).join("\n")}`
  )
  .join("\n\n")}

### ${t("limitsH")}

| | ${heads} |
|---|---|---|---|
${limiti.map((l) => `| ${l.t} | ${lim(l.base)} | ${lim(l.pro)} | ${lim(l.business)} |`).join("\n")}

## ${t("buyH")}

${t("buyP")}

${t("booking")}: ${url(locale, "/demo")}

## ${t("notesH")}

${notes.map((n) => `- ${n}`).join("\n")}
`;
}
