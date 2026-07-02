"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";

import { useConsent, setConsent } from "@/lib/use-consent";

// Banner cookie GDPR. Il sito usa oggi SOLO cookie tecnici, quindi il banner è
// informativo + memorizza la scelta (così, se un domani si attiva GA4/analytics,
// si può caricare solo quando il valore salvato è "all"). Riapribile dal footer.
// Stato letto da useConsent (external store): aperto ⇔ nessuna scelta salvata.
export function CookieBanner() {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      aria-live="polite"
      className="animate-rise fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-6 sm:pb-6"
    >
      {/* Compatto su mobile: una manciata di righe, non un terzo di schermo */}
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-border bg-card/95 p-3.5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:rounded-2xl sm:p-5">
        <div className="flex gap-2.5 sm:gap-3">
          <Cookie
            className="mt-0.5 hidden size-5 shrink-0 text-accent-ink sm:block"
            aria-hidden
          />
          <p className="text-[13px] leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
            Usiamo solo cookie tecnici necessari al funzionamento del sito.
            Eventuali statistiche future solo col tuo consenso.{" "}
            <Link
              href="/cookie"
              className="font-medium text-accent-ink underline underline-offset-2"
            >
              Cookie policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setConsent("necessary")}
            className="h-9 flex-1 rounded-lg border border-border px-3.5 text-[13px] font-semibold text-primary transition-colors duration-150 hover:bg-secondary sm:h-10 sm:flex-none sm:px-4 sm:text-sm"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => setConsent("all")}
            className="h-9 flex-1 rounded-lg bg-accent px-3.5 text-[13px] font-semibold text-accent-foreground shadow-sm transition-colors duration-150 hover:bg-accent-hover sm:h-10 sm:flex-none sm:px-4 sm:text-sm"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
