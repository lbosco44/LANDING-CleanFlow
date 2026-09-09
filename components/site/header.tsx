"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/components/site/language-toggle";
import { buttonVariants } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// v2: 4 ancore secche — chi entra capisce la mappa della pagina dal menu.
// Passano dal Link di next-intl: su /en devono restare su /en, mentre un
// <a href="/#pilastri"> riporterebbe alla home italiana.
const NAV = [
  { hash: "pilastri", key: "what" },
  { hash: "come-funziona", key: "how" },
  { hash: "prezzi", key: "pricing" },
  { hash: "domande", key: "faq" },
] as const;

export function SiteHeader() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-colors",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[69rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/cleanflow-mark.png"
            alt="CleanFlow"
            width={32}
            height={32}
            className="size-8"
            priority
          />
          {/* Wordmark solo da sm: su mobile basta l'icona, così restano i bottoni */}
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
            <span className="text-primary">Clean</span>
            <span className="text-accent-ink">Flow</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.hash}
              href={{ pathname: "/", hash: n.hash }}
              className="text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <LanguageToggle />
          {/* Accesso alla SaaS (clienti già a bordo): bottone secondario outline
              — chiaramente distinto dal logo. La demo resta l'azione dominante.
              Sottodominio esterno → <a>, non <Link>. */}
          <a
            href={APP_URL}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "px-3 sm:px-4"
            )}
          >
            {t("login")}
          </a>
          <Link
            href="/demo"
            className={cn(buttonVariants({ size: "sm" }), "px-3 sm:px-4")}
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
