"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_KEY, CONSENT_EVENT, OPEN_COOKIE_EVENT } from "@/lib/site";

// Stato consenso cookie come external store (localStorage + eventi custom).
// useSyncExternalStore evita il setState-negli-effect (react-hooks v6) e
// tiene banner e CTA mobile sincronizzati senza stato duplicato.

// Fallback in memoria quando localStorage è bloccato (Safari private, policy):
// la scelta vale per la sessione e il banner non riappare a ogni pagina.
let memoryConsent: string | null = null;

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener(OPEN_COOKIE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener(OPEN_COOKIE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? memoryConsent;
  } catch {
    return memoryConsent;
  }
}

// Sul server il consenso è ignoto: sentinella ≠ null così il banner non viene
// renderizzato nell'HTML SSR (comparirà dopo l'hydration solo se serve).
const getServerSnapshot = () => "ssr";

/** null = nessuna scelta (banner da mostrare) · "all" | "necessary" = scelta fatta · "ssr" = render server */
export function useConsent(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setConsent(value: "all" | "necessary") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    memoryConsent = value;
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Azzera la scelta e riapre il banner (link "Preferenze cookie" nel footer). */
export function resetConsent() {
  memoryConsent = null;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // storage bloccato: basta l'azzeramento in memoria
  }
  window.dispatchEvent(new Event(OPEN_COOKIE_EVENT));
}
