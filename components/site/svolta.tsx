"use client";

import { motion, type Variants } from "motion/react";

const CHIPS = ["Clienti", "Immobili", "Calendario", "Operatori", "Report"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Svolta() {
  return (
    <section className="relative overflow-hidden bg-anchor-deep text-on-dark">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32"
      >
        <motion.h2
          variants={reveal}
          className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem]"
        >
          Tutto in un&apos;unica{" "}
          <span className="text-accent">sala di controllo</span>.
        </motion.h2>
        <motion.p
          variants={reveal}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted"
        >
          CleanFlow mette clienti, immobili, calendario, operatori e report
          nello stesso posto. Tu vedi tutto dall&apos;alto. Chi è sul campo sa
          esattamente cosa fare. Niente più passaparola.
        </motion.p>
        <motion.ul
          variants={reveal}
          className="mt-9 flex flex-wrap justify-center gap-2.5"
        >
          {CHIPS.map((c) => (
            <li
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-on-dark/15 bg-on-dark/5 px-4 py-1.5 text-sm font-medium text-on-dark-muted"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {c}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
