"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ClipboardCheck, LayoutDashboard, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

const MODULES = [
  {
    role: "Per il titolare",
    icon: LayoutDashboard,
    title: "Vedi tutto senza chiedere niente",
    text: "Fatturato, interventi della settimana, qualità del lavoro: aggiornati da soli, sempre sott'occhio. Smetti di chiedere «com'è andata?» a fine giornata.",
    img: "/product/dashboard-2.png",
    alt: "Dashboard del titolare: fatturato, interventi e qualità",
  },
  {
    role: "Per il team leader",
    icon: ClipboardCheck,
    title: "Niente più sorprese alle 8 del mattino",
    text: "Controlli checklist e foto di ogni intervento, gestisci ritardi e sostituzioni senza una raffica di telefonate. Sai chi c'è e chi manca prima che diventi un problema.",
    img: "/product/operatori.png",
    alt: "Gestione operatori e squadre in CleanFlow",
  },
  {
    role: "Per l'operatore",
    icon: Smartphone,
    title: "Sa sempre cosa fare, dal telefono",
    text: "Gli interventi di oggi, l'indirizzo con la navigazione, la checklist passo-passo, le foto da caricare. Tutto in un'app semplice come WhatsApp.",
    img: "/product/operatore-mobile.png",
    alt: "App mobile dell'operatore CleanFlow",
  },
];

export function Moduli() {
  return (
    <section id="moduli" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-ink">
            I moduli
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Uno strumento per ogni persona della tua squadra.
          </h2>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-24">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-ink">
                  <m.icon className="size-4" />
                  {m.role}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </div>

              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl ring-1 ring-black/5">
                  <div className="flex h-8 items-center gap-1.5 border-b border-border bg-secondary px-3.5">
                    <span className="size-2 rounded-full bg-[#E2574C]" />
                    <span className="size-2 rounded-full bg-[#E5A53B]" />
                    <span className="size-2 rounded-full bg-[#3FB04F]" />
                  </div>
                  <div className="relative aspect-16/10 bg-card">
                    <Image
                      src={m.img}
                      alt={m.alt}
                      fill
                      sizes="(min-width:1024px) 45vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
