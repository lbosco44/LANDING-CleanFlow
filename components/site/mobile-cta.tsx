"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { COMPANY } from "@/lib/site";
import { useConsent } from "@/lib/use-consent";

// CTA sticky solo mobile: barra in basso con "Prenota demo" + pulsante chiama.
// Compare dopo un po' di scroll (non copre l'hero) e mai su /demo o /grazie.
// Resta nascosta finché il banner cookie è aperto, per non sovrapporsi
// (consenso letto dallo stesso external store del banner).
const HIDDEN_ON = ["/demo", "/grazie"];

export function MobileCta() {
  const pathname = usePathname();
  const consent = useConsent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_ON.includes(pathname)) return null;
  const consented = consent === "all" || consent === "necessary";
  if (!scrolled || !consented) return null;

  return (
    <div
      className="animate-rise fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-2.5 border-t border-border bg-background/90 p-3 backdrop-blur-md">
        <a
          href={COMPANY.phoneHref}
          aria-label={`Chiama ${COMPANY.phoneDisplay}`}
          className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors active:bg-secondary"
        >
          <Phone className="size-5" />
        </a>
        <Link
          href="/demo"
          className="flex h-12 flex-1 items-center justify-center rounded-lg bg-accent text-[15px] font-semibold text-accent-foreground shadow-sm transition-colors active:bg-accent-hover"
        >
          Prenota una demo
        </Link>
      </div>
    </div>
  );
}
