"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { HeartHandshake, ShieldCheck } from "lucide-react";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular">
      {v}
    </span>
  );
}

export function Risultato() {
  return (
    <section
      id="risultati"
      className="relative scroll-mt-20 overflow-hidden bg-anchor text-on-dark"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Meno tempo a coordinare.
            <br className="hidden sm:block" /> Più tempo per far crescere
            l&apos;azienda.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {/* North star */}
          <div className="text-center">
            <div className="font-display text-6xl font-bold leading-none text-accent sm:text-7xl">
              <span className="align-top text-4xl sm:text-5xl">~</span>
              <Counter to={10} />
            </div>
            <p className="mt-3 text-lg font-semibold">ore a settimana</p>
            <p className="mx-auto mt-1 max-w-[15rem] text-sm text-on-dark-muted">
              che non passi più tra messaggi ed Excel{" "}
              <span className="opacity-70">(stima, da tarare in demo)</span>
            </p>
          </div>

          {/* Meno errori */}
          <div className="text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-on-dark/5 text-accent ring-1 ring-on-dark/10">
              <ShieldCheck className="size-8" />
            </span>
            <p className="mt-3 text-lg font-semibold">Meno errori</p>
            <p className="mx-auto mt-1 max-w-[15rem] text-sm text-on-dark-muted">
              su indirizzi, orari e interventi dimenticati
            </p>
          </div>

          {/* Clienti più seguiti */}
          <div className="text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-on-dark/5 text-accent ring-1 ring-on-dark/10">
              <HeartHandshake className="size-8" />
            </span>
            <p className="mt-3 text-lg font-semibold">Clienti più seguiti</p>
            <p className="mx-auto mt-1 max-w-[15rem] text-sm text-on-dark-muted">
              con report e foto di ogni lavoro
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center text-on-dark-muted"
        >
          I tuoi numeri li vediamo insieme, sui tuoi dati, durante la demo.
        </motion.p>
      </div>
    </section>
  );
}
