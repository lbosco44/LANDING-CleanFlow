import Link from "next/link";
import Image from "next/image";

import { APP_URL, COMPANY } from "@/lib/site";
import { CookiePreferencesLink } from "@/components/site/cookie-preferences-link";

const NAV = [
  { href: "/#pilastri", label: "Cosa fa" },
  { href: "/#come-funziona", label: "Come funziona" },
  { href: "/#risultati", label: "Risultati" },
  { href: "/#domande", label: "Domande" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookie", label: "Cookie" },
  { href: "/termini", label: "Termini" },
];

export function SiteFooter() {
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
            <p className="mt-4 text-sm leading-relaxed">
              Il gestionale per le imprese di pulizie. Clienti, calendario,
              operatori e report in un&apos;unica schermata.
            </p>
          </div>

          {/* 3 colonne solo da lg: a 768 l'email di dominio (26 char, senza wrap)
              non ci sta e sfonderebbe il viewport — Contatti scende di riga */}
          <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-16">
            <nav className="flex flex-col gap-3 text-sm">
              <span className="font-semibold text-on-dark">Prodotto</span>
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="transition-colors hover:text-on-dark"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-3 text-sm">
              <span className="font-semibold text-on-dark">Legale</span>
              {LEGAL.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="transition-colors hover:text-on-dark"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 text-sm">
              <span className="font-semibold text-on-dark">Contatti</span>
              <a
                href={COMPANY.phoneHref}
                className="transition-colors hover:text-on-dark"
              >
                {COMPANY.phoneDisplay}
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
            · P.IVA {COMPANY.vat} · {COMPANY.address} · PEC {COMPANY.pec}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <CookiePreferencesLink />
            <a
              href={APP_URL}
              className="font-medium text-on-dark transition-colors hover:text-accent"
            >
              Accedi
            </a>
            <Link
              href="/demo"
              className="font-medium text-on-dark transition-colors hover:text-accent"
            >
              Prenota una demo →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
