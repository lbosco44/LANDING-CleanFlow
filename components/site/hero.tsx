"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-anchor text-on-dark">
      {/* Atmosfera: glow teal + radiale + griglia a punti (control room) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-12%] h-[620px] w-[620px] rounded-full bg-accent/20 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        {/* Copy */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="lg:col-span-6 lg:pt-6"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-on-dark/15 bg-on-dark/5 px-3 py-1 text-xs font-medium text-on-dark-muted"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            In prova con le prime imprese di pulizie italiane
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            La tua impresa di pulizie,
            <br className="hidden sm:block" /> finalmente{" "}
            <span className="text-accent">sotto controllo</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark-muted"
          >
            Clienti, calendario, operatori sul campo e report: tutto in
            un&apos;unica schermata. Senza pi&ugrave; rincorrere messaggi e
            fogli Excel.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/demo" className={cn(buttonVariants({ size: "lg" }))}>
              Prenota una demo
            </Link>
            <a
              href="#come-funziona"
              className={cn(buttonVariants({ variant: "ghostDark", size: "lg" }))}
            >
              Guarda com&apos;&egrave; fatto
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-sm text-on-dark-muted">
            20 minuti · nessuna carta · te lo mostriamo sui tuoi dati
          </motion.p>
        </motion.div>

        {/* Prodotto-eroe in mockup browser neutro, "buca" il bordo basso */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-6"
        >
          <div className="overflow-hidden rounded-t-xl border border-white/10 bg-card shadow-2xl ring-1 ring-black/5">
            <div className="flex h-9 items-center gap-1.5 border-b border-border bg-secondary px-4">
              <span className="size-2.5 rounded-full bg-[#E2574C]" />
              <span className="size-2.5 rounded-full bg-[#E5A53B]" />
              <span className="size-2.5 rounded-full bg-[#3FB04F]" />
            </div>
            <Image
              src="/product/dashboard.png"
              alt="Pannello CleanFlow: interventi di oggi, agenda e operatori attivi"
              width={1249}
              height={1221}
              priority
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
