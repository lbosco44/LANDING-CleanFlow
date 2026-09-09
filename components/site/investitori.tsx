import Image from "next/image";
import { useTranslations } from "next-intl";

// v2.5 — "Chi ci sostiene". Con UN solo investitore una griglia larga
// resterebbe vuota: qui il peso sta nel copy a sinistra e la voce a destra è
// una riga sobria del solito registro. Tenuta volutamente piccola — un
// investitore vero detto piano regge; gonfiato sembra il contrario.
//
// Per aggiungere il secondo investitore: una voce in più nell'array. Se resta
// anonimo per sua scelta → nome "Investitore privato", iniziali "—".
// Vale il vincolo di _ANALISI.md: nessun numero da investitore in pagina
// (importi, valutazione, TAM). Qui si dice CHI, mai QUANTO.

// La foto di Marco non è un headshot su fondo chiaro come quelle dei tre
// fondatori: è ambientata (scrivania, mezzo busto). In un riquadro quadrato un
// crop centrato gli taglierebbe la testa → object-top. Originale non
// pre-compresso: ci pensa next/image (vedi nota in team.tsx).
const INVESTITORI = [
  { nome: "Marco", iniziali: "M", foto: "/team/marco.png" },
] as const;

export function Investitori() {
  const t = useTranslations("Investitori");
  const etichetta = t("label");

  return (
    <section
      id="investitori"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[69rem] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-16">
          <div>
            <p className="eyebrow text-accent-ink">{t("eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("h2")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {t("text")}
            </p>
          </div>

          {/* w-fit: con una voce sola un riquadro a piena colonna sarebbe un
              contenitore mezzo vuoto. Cresce da sé quando si aggiungono voci. */}
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:w-fit">
            {INVESTITORI.map((i) => (
              <li key={i.nome} className="flex items-center gap-4 bg-card p-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-primary ring-1 ring-border">
                  {i.foto ? (
                    <Image
                      src={i.foto}
                      alt={`${i.nome}, ${etichetta.toLowerCase()}`}
                      fill
                      sizes="4rem"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-full w-full items-center justify-center font-display text-lg font-bold tracking-tight text-accent"
                    >
                      {i.iniziali}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {i.nome}
                  </p>
                  <p className="eyebrow mt-1 text-accent-ink">{etichetta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
