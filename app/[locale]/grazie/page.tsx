import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CircleCheckBig } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { LeadTracker } from "@/components/site/lead-tracker";
import { buttonVariants } from "@/components/ui/button";
import { ensureLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

// noindex in entrambe le lingue: pagina post-submit, ospita il tracking di
// conversione. Niente canonical/hreflang: non deve entrare in indice.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = ensureLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Grazie" });
  return {
    title: t("title"),
    robots: { index: false, follow: false },
  };
}

export default async function GraziePage({ params }: Props) {
  const locale = ensureLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Grazie");
  const prep = t.raw("prep") as string[];

  return (
    <>
      <LeadTracker />
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
            <CircleCheckBig className="size-8" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("h1")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.rich("text", {
              s: (chunks) => (
                <span className="font-medium text-foreground">{chunks}</span>
              ),
            })}
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-7 text-left shadow-sm">
            <p className="font-display text-lg font-semibold text-foreground">
              {t("prepTitle")}
            </p>
            <ul className="mt-4 space-y-3">
              {prep.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "mt-10")}
          >
            {t("back")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
