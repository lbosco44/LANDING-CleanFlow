import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/site/legal-page";
import { alternatesFor, ensureLocale } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Legal.terms" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/termini"),
  };
}

export default async function TerminiPage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const tl = await getTranslations("Legal");
  const t = await getTranslations("Legal.terms");

  // t() accetta solo valori testuali; il tag <mail> serve solo a t.rich().
  const strings = {
    legalName: COMPANY.legalName,
    vat: COMPANY.vat,
    address: COMPANY.address,
    pec: COMPANY.pec,
    email: COMPANY.email,
  };
  const vars = {
    ...strings,
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

      <h2>{t("ownerH")}</h2>
      <p>{t("ownerP", strings)}</p>

      <h2>{t("subjectH")}</h2>
      <p>{t("subjectP")}</p>

      <h2>{t("demoH")}</h2>
      <p>{t("demoP")}</p>

      <h2>{t("limitsH")}</h2>
      <p>{t("limitsP")}</p>

      <h2>{t("contactsH")}</h2>
      <p>{t.rich("contactsP", vars)}</p>
    </LegalPage>
  );
}
