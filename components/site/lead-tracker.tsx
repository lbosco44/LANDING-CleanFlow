"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

// Evento di conversione della landing. Sta su /grazie e non sul submit del
// form di proposito: /grazie si raggiunge solo dopo un invio andato a buon
// fine, quindi non conta i tentativi falliti per validazione o errore di rete.
// Il ref evita il doppio invio in Strict Mode (in dev l'effect gira due volte).
//
// ATTENZIONE — non semplificare in un `track("lead")` secco. Il sorgente di
// track() è `window.va?.call(...)`: se lo script di Vercel non ha ancora fatto
// boot, l'optional chaining SCARTA l'evento senza errori né log. Al mount di
// questa pagina lo script non è pronto, quindi la conversione sparirebbe in
// silenzio e il contatore resterebbe a zero per sempre. `window.vaq` è la coda
// che la libreria stessa usa per gli eventi emessi prima del boot: lo script
// la svuota appena parte ("Running queued event" nei log di sviluppo).
export function LeadTracker() {
  const inviato = useRef(false);

  useEffect(() => {
    if (inviato.current) return;
    inviato.current = true;

    if (window.va) {
      track("lead");
    } else {
      window.vaq = window.vaq ?? [];
      window.vaq.push(["event", { name: "lead" }]);
    }
  }, []);

  return null;
}
