"use client";

import { useTranslations } from "next-intl";

import { resetConsent } from "@/lib/use-consent";

// Link nel footer per rivedere/revocare le preferenze cookie: azzera la scelta
// salvata e riapre il banner. Soddisfa "modifica in qualsiasi momento" della policy.
export function CookiePreferencesLink() {
  const t = useTranslations("Footer");
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-left transition-colors hover:text-on-dark"
    >
      {t("cookiePrefs")}
    </button>
  );
}
