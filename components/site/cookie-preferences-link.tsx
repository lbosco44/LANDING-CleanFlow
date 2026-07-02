"use client";

import { CONSENT_KEY, OPEN_COOKIE_EVENT } from "@/lib/site";

// Link nel footer per rivedere/revocare le preferenze cookie: azzera la scelta
// salvata e riapre il banner. Soddisfa "modifica in qualsiasi momento" della policy.
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {
          // ignora: procediamo comunque a riaprire il banner
        }
        window.dispatchEvent(new Event(OPEN_COOKIE_EVENT));
      }}
      className="text-left transition-colors hover:text-on-dark"
    >
      Preferenze cookie
    </button>
  );
}
