"use client";

import { resetConsent } from "@/lib/use-consent";

// Link nel footer per rivedere/revocare le preferenze cookie: azzera la scelta
// salvata e riapre il banner. Soddisfa "modifica in qualsiasi momento" della policy.
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-left transition-colors hover:text-on-dark"
    >
      Preferenze cookie
    </button>
  );
}
