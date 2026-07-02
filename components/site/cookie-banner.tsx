"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

import { CONSENT_KEY, CONSENT_EVENT, OPEN_COOKIE_EVENT } from "@/lib/site";

// Banner cookie GDPR. Il sito usa oggi SOLO cookie tecnici, quindi il banner è
// informativo + memorizza la scelta (così, se un domani si attiva GA4/analytics,
// si può caricare solo quando il valore salvato è "all"). Riapribile dal footer.
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      stored = null;
    }
    if (!stored) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_EVENT, reopen);
  }, []);

  function choose(value: "all" | "necessary") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // storage non disponibile: chiudiamo comunque il banner
    }
    setOpen(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      aria-live="polite"
      className="animate-rise fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-6">
        <div className="flex gap-3">
          <Cookie className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Usiamo solo cookie tecnici necessari al funzionamento del sito. Se in
            futuro attiveremo strumenti di statistica, li caricheremo soltanto con
            il tuo consenso.{" "}
            <Link
              href="/cookie"
              className="font-medium text-accent-ink underline underline-offset-2"
            >
              Cookie policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="h-10 rounded-lg border border-border px-4 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="h-10 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
