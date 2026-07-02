"use client";

import { motion, type Variants } from "motion/react";
import { MessageCircle, NotebookPen, Phone, Table2 } from "lucide-react";

import { cn } from "@/lib/utils";

const CHAOS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    note: "richieste e foto sparse in mille chat",
    rot: "lg:-rotate-2",
  },
  {
    icon: Table2,
    label: "Excel",
    note: "«chi è libero giovedì?»",
    rot: "lg:rotate-1",
  },
  {
    icon: Phone,
    label: "Telefonate",
    note: "«non trovo l'indirizzo»",
    rot: "lg:rotate-2",
  },
  {
    icon: NotebookPen,
    label: "Carta",
    note: "il calendario sulla scrivania",
    rot: "lg:-rotate-1",
  },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Problema() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-ink">
            La giornata che conosci
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Tieni insieme tutto a mano.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Un cliente scrive su WhatsApp. Un operatore chiama perché non trova
            l&apos;indirizzo. Cerchi su Excel chi è libero giovedì. Aggiorni il
            calendario cartaceo. E intanto non sai davvero come sta andando
            l&apos;azienda.
          </p>
          <p className="mt-6 text-lg font-semibold text-foreground">
            Non è disorganizzazione. È che stai tenendo insieme tutto a mano.
          </p>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={list}
          className="grid grid-cols-2 gap-4 sm:gap-5"
        >
          {CHAOS.map(({ icon: Icon, label, note, rot }) => (
            <motion.li
              key={label}
              variants={card}
              className={cn(
                "rounded-xl border border-border bg-card p-5 shadow-sm",
                rot
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-semibold text-foreground">{label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
