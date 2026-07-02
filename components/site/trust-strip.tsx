import { ShieldCheck, Smartphone, Users } from "lucide-react";

const ITEMS = [
  { icon: Users, text: "Costruito con titolari veri, non in laboratorio." },
  { icon: Smartphone, text: "Funziona da telefono e da computer." },
  { icon: ShieldCheck, text: "I tuoi dati restano tuoi, su server europei." },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="grid gap-4 py-6 sm:grid-cols-3 sm:gap-8 sm:py-7">
          {ITEMS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                <Icon className="size-[18px]" strokeWidth={2} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
