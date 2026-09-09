import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { DemoForm } from "@/components/site/demo-form";
import { alternatesFor, ensureLocale } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "DemoPage" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/demo"),
  };
}

export default async function DemoPage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("DemoPage");
  const points = t.raw("points") as string[];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("h1")}
            </h1>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                    <Check className="size-4" />
                  </span>
                  <span className="text-lg text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl border border-border bg-secondary/50 p-6">
              <p className="text-sm text-muted-foreground">
                {t.rich("trust", {
                  s: (chunks) => (
                    <span className="font-medium text-foreground">{chunks}</span>
                  ),
                })}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-xl ring-1 ring-black/5 sm:p-9">
            <DemoForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
