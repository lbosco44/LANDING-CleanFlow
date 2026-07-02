"use client";

import { useEffect, useState } from "react";

// Odometro del widget hero: il numero "lavora" una volta sola, al load.
// È un dato dimostrativo della UI ricostruita (come nell'app), non una metrica
// di marketing — per le stime dichiarate niente animazioni (Brief v2).
export function KpiCounter({
  to,
  duration = 900,
}: {
  to: number;
  duration?: number;
}) {
  const [v, setV] = useState(0);

  useEffect(() => {
    // Con reduced-motion la durata è 0: il primo frame salta subito al valore
    // finale (setState solo dentro il callback rAF, mai nel corpo dell'effect).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : duration;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = dur === 0 ? 1 : Math.min(1, (t - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  // Separatore migliaia manuale: toLocaleString("it-IT") non è affidabile
  // ovunque (build di browser senza dati ICU completi restituiscono "4280").
  return <>{String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</>;
}
