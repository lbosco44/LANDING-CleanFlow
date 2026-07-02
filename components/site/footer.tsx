import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/#come-funziona", label: "Come funziona" },
  { href: "/#moduli", label: "I moduli" },
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

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-on-dark/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="tabular">2026</span> CleanFlow · [Ragione
            sociale] · P.IVA [—] · [Sede]
          </p>
          <Link
            href="/demo"
            className="font-medium text-on-dark transition-colors hover:text-accent"
          >
            Prenota una demo →
          </Link>
        </div>
      </div>
    </footer>
  );
}
