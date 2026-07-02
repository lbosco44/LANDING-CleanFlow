// v2: stat card alla Mintlify su tela chiara — numero grande STATICO + label
// corta. Niente count-up su una stima dichiarata (animare un numero finto è il
// peggio dei due mondi), niente icone-slogan travestite da metriche.

const STATS = [
  {
    valore: "~10 ore",
    label: "a settimana che non passi più tra messaggi ed Excel",
    nota: "stima, da tarare in demo",
  },
  {
    valore: "Zero",
    label: "fogli Excel da tenere aggiornati a mano",
    nota: null,
  },
  {
    valore: "1",
    label: "solo posto per entrate, clienti, strutture e operatori",
    nota: null,
  },
];

export function Risultato() {
  return (
    <section
      id="risultati"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-ink">Il risultato</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Meno tempo a coordinare. Più tempo per far crescere l&apos;azienda.
          </h2>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.valore} className="bg-card p-7 sm:p-8">
              <dd className="font-display text-4xl font-bold tracking-tight text-primary tabular sm:text-5xl">
                {s.valore}
              </dd>
              <dt className="mt-3 max-w-[16rem] text-[15px] leading-relaxed text-muted-foreground">
                {s.label}
                {s.nota && (
                  <span className="mt-1 block font-mono text-xs text-muted-foreground/70">
                    ({s.nota})
                  </span>
                )}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-[15px] text-muted-foreground">
          I tuoi numeri li vediamo insieme, sui tuoi dati, durante la demo.
        </p>
      </div>
    </section>
  );
}
