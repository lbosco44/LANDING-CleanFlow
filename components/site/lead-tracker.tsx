"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

// Evento di conversione della landing. Sta su /grazie e non sul submit del
// form di proposito: /grazie si raggiunge solo dopo un invio andato a buon
// fine, quindi non conta i tentativi falliti per validazione o errore di rete.
// Il ref evita il doppio invio in Strict Mode (in dev l'effect gira due volte).
export function LeadTracker() {
  const inviato = useRef(false);

  useEffect(() => {
    if (inviato.current) return;
    inviato.current = true;
    track("lead");
  }, []);

  return null;
}
