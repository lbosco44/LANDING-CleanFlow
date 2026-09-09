import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/site/legal-page";
import { alternatesFor, ensureLocale } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Legal.cookies" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/cookie"),
  };
}

export default async function CookiePage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const tl = await getTranslations("Legal");
  const t = await getTranslations("Legal.cookies");
  const strong = { s: (chunks: React.ReactNode) => <strong>{chunks}</strong> };

  return (
    <LegalPage title={t("title")} note={tl("courtesy")}>
      <p className="text-sm text-muted-foreground">{tl("updated")}</p>

      <h2>{t("usedH")}</h2>
      <p>{t.rich("usedP", strong)}</p>

      <h2>{t("thirdH")}</h2>
      <p>{t("thirdP")}</p>

      <h2>{t("manageH")}</h2>
      <p>{t.rich("manageP", strong)}</p>
    </LegalPage>
  );
}
