import { Quote } from "lucide-react";

export function Pilot() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-ink">
            Programma pilota
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Le prime imprese a bordo.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Stiamo lavorando con le prime imprese di pulizie italiane per
            costruire CleanFlow su problemi veri, non su idee da scrivania. Le
            loro parole — quelle vere — le trovi qui appena avranno i numeri per
            dirle.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-dashed border-border bg-card/50 p-6"
            >
              <Quote className="size-7 text-border" />
              <p className="mt-4 flex-1 text-base text-muted-foreground">
                La voce di una vera impresa a bordo arriverà qui.
              </p>
              <p className="mt-6 text-sm font-semibold text-accent-ink">
                Presto · voce reale
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base text-muted-foreground">
          Posti del programma pilota limitati: chi entra ora ha{" "}
          <span className="font-semibold text-foreground">
            condizioni dedicate
          </span>{" "}
          e una linea diretta con noi.
        </p>
      </div>
    </section>
  );
}
