import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/site/legal-page";
import { alternatesFor, ensureLocale } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Legal.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const tl = await getTranslations("Legal");
  const t = await getTranslations("Legal.privacy");

  const vars = {
    legalName: COMPANY.legalName,
    vat: COMPANY.vat,
    address: COMPANY.address,
    pec: COMPANY.pec,
    email: COMPANY.email,
    mail: (chunks: React.ReactNode) => (
      <a
        href={`mailto:${COMPANY.email}`}
        className="font-medium text-accent-ink underline underline-offset-2"
      >
        {chunks}
      </a>
    ),
  };

  return (
    <LegalPage title={t("title")} note={tl("courtesy")}>
      <p className="text-sm text-muted-foreground">{tl("updated")}</p>

      <h2>{t("controllerH")}</h2>
      <p>{t.rich("controllerP", vars)}</p>

      <h2>{t("dataH")}</h2>
      <p>{t("dataP")}</p>

      <h2>{t("purposeH")}</h2>
      <p>{t("purposeP")}</p>

      <h2>{t("providersH")}</h2>
      <p>{t("providersP")}</p>

      <h2>{t("rightsH")}</h2>
      <p>{t.rich("rightsP", vars)}</p>
    </LegalPage>
  );
}
