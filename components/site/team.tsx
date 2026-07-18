import Image from "next/image";

// v2.5 — "Chi c'è dietro": rende vera la promessa che il copy fa già altrove
// ("ti risponde direttamente chi costruisce CleanFlow, niente call center").
// Linguaggio della v2: griglia a hairline (gap-px su bg-border) come Risultato,
// niente card rotonde uniformi, niente virgolette da testimonial.
//
// FOTO: headshot originali (1122×1402) serviti tali e quali a next/image, che
// li ridimensiona e comprime UNA volta sola alla misura richiesta. Non
// pre-comprimere a mano: un WebP fatto prima verrebbe ricompresso da next/image
// e i volti si impastano (provato il 2026-07-16). Il fallback a monogramma
// resta per chiunque venga aggiunto senza foto.

type Membro = {
  nome: string;
  ruolo: string;
  iniziali: string;
  foto: string | null;
};

const TEAM: Membro[] = [
  {
    nome: "Jacopo Serra",
    ruolo: "CEO · co-fondatore",
    iniziali: "JS",
    foto: "/team/jacopo.png",
  },
  {
    nome: "Lorenzo Bosco",
    ruolo: "CTO · co-fondatore",
    iniziali: "LB",
    foto: "/team/lorenzo.png",
  },
  {
    nome: "Michele Raffone",
    ruolo: "Head of Sales · co-fondatore",
    iniziali: "MR",
    foto: "/team/michele.png",
  },
];

export function Team() {
  return (
    <section
      id="chi-siamo"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">Chi c&apos;è dietro</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Siamo in tre. Quando chiami, rispondiamo noi.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Niente call center, niente commerciali a provvigione. CleanFlow lo
            costruiamo in tre, e le imprese con cui lavoriamo parlano con chi il
            prodotto lo decide e lo scrive.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {TEAM.map((m) => (
            <li key={m.nome} className="bg-card p-6 sm:p-7">
              {/* mobile: riga compatta (monogramma + nome) · desktop: ritratto
                  4:5 volutamente PICCOLO — su questa pagina il navy è riservato
                  ai due momenti di comando (hero, CTA finale): tre ritratti a
                  piena larghezza diventerebbero muri scuri fuori sistema. */}
              <div className="flex items-center gap-4 sm:block">
                {/* ring: gli headshot hanno fondo chiaro e senza hairline il
                    ritratto si fonderebbe con la card bianca. */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-primary ring-1 ring-border sm:h-auto sm:w-32 sm:aspect-[4/5]">
                  {m.foto ? (
                    <Image
                      src={m.foto}
                      alt={`${m.nome}, ${m.ruolo}`}
                      fill
                      sizes="(min-width: 640px) 8rem, 4rem"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-full w-full items-center justify-center font-display text-xl font-bold tracking-tight text-accent sm:text-2xl"
                    >
                      {m.iniziali}
                    </span>
                  )}
                </div>
                <div className="sm:mt-5">
                  <p className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {m.nome}
                  </p>
                  <p className="eyebrow mt-1.5 text-accent-ink">{m.ruolo}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[15px] text-muted-foreground">
          Tutti e tre fondatori. Nessuno di noi ha un capo a cui rimandarti.
        </p>
      </div>
    </section>
  );
}
