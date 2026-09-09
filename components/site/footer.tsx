import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { APP_URL, COMPANY } from "@/lib/site";
import { FUNZIONI, funzioneHref } from "@/lib/funzioni";
import { CookiePreferencesLink } from "@/components/site/cookie-preferences-link";

// La colonna "Funzioni" linka le pagine di approfondimento /funzioni/*
// (le ancore di sezione restano nell'header).
const LEGAL = [
  { href: "/privacy", key: "privacy" },
  { href: "/cookie", key: "cookie" },
  { href: "/termini", key: "terms" },
] as const;

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tf = useTranslations("Funzioni");
  const locale = useLocale();
  // In inglese il numero va mostrato col prefisso internazionale.
  const phone = locale === "it" ? COMPANY.phoneDisplay : COMPANY.phoneIntl;

  return (
    <footer className="border-t border-on-dark/10 bg-anchor-deep text-on-dark-muted">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-white">
                <Image
                  src="/cleanflow-mark.png"
                  alt="CleanFlow"
                  width={28}
                  height={28}
                  className="size-7"
                />
              </span>
              <span className="font-display text-lg font-semibold">
                <span className="text-on-dark">Clean</span>
                <span className="text-accent">Flow</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          {/* 3 colonne solo da lg: a 768 l'email di dominio (26 char, senza wrap)
              non ci sta e sfonderebbe il viewport — Contatti scende di riga */}
          <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-16">
            <nav className="flex flex-col gap-3 text-sm">
              <span className="font-semibold text-on-dark">{t("features")}</span>
              {FUNZIONI.map((f) => (
                <Link
                  key={f.slug}
                  href={funzioneHref(f.slug)}
                  className="transition-colors hover:text-on-dark"
                >
                  {tf(`items.${f.slug}.name`)}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-3 text-sm">
              <span className="font-semibold text-on-dark">{t("legal")}</span>
              {LEGAL.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="transition-colors hover:text-on-dark"
                >
                  {t(n.key)}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 text-sm">
              <span className="font-semibold text-on-dark">{t("contacts")}</span>
              <a
                href={COMPANY.phoneHref}
                className="transition-colors hover:text-on-dark"
              >
                {phone}
              </a>
              <a
                href={`mailto:${COMPANY.publicEmail}`}
                className="transition-colors hover:text-on-dark"
              >
                {COMPANY.publicEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-on-dark/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="tabular">2026</span> CleanFlow · {COMPANY.legalName}{" "}
            · {t("vatLabel")} {COMPANY.vat} · {COMPANY.address} · {t("pecLabel")}{" "}
            {COMPANY.pec}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <CookiePreferencesLink />
            <a
              href={APP_URL}
              className="font-medium text-on-dark transition-colors hover:text-accent"
            >
              {t("login")}
            </a>
            <Link
              href="/demo"
              className="font-medium text-on-dark transition-colors hover:text-accent"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
