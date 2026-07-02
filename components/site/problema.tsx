import { Check } from "lucide-react";

// v2: il caos non si racconta con card uniformi — si FA VEDERE. Artefatti
// realistici (chat WhatsApp, cella Excel, foglietto) volutamente storti e
// sovrapposti, contro cui i pilastri ordinati della sezione dopo fanno contrasto.
export function Problema() {
  return (
    <section className="border-b border-border bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-[69rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-accent-ink">La giornata che conosci</p>
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

        {/* Composizione del caos: tre artefatti veri, storti, sovrapposti */}
        <div aria-hidden className="relative mx-auto w-full max-w-md py-6">
          {/* Chat WhatsApp */}
          <div className="relative z-10 -rotate-2 rounded-2xl bg-[#E5DDD5] p-4 shadow-(--shadow-soft)">
            <div className="w-fit max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
              <p className="text-sm text-neutral-800">
                Capo non trovo l&apos;indirizzo della palestra 🙏
              </p>
              <p className="mt-0.5 text-right text-[10px] text-neutral-400">
                7:58
              </p>
            </div>
            <div className="ml-auto mt-2 w-fit max-w-[85%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-3 py-2 shadow-sm">
              <p className="text-sm text-neutral-800">
                aspetta che controllo sul quaderno
              </p>
              <p className="mt-0.5 flex items-center justify-end gap-1 text-right text-[10px] text-neutral-400">
                8:12
                <Check className="size-3 text-neutral-400" />
              </p>
            </div>
          </div>

          {/* Frammento Excel */}
          <div className="relative z-20 -mt-5 ml-auto w-[78%] rotate-[1.5deg] overflow-hidden rounded-md border border-neutral-300 bg-white shadow-(--shadow-soft)">
            <div className="grid grid-cols-[2rem_1fr_1fr] text-[11px]">
              <div className="border-b border-r border-neutral-200 bg-neutral-100 px-1.5 py-1 text-center font-semibold text-neutral-500" />
              <div className="border-b border-r border-neutral-200 bg-neutral-100 px-2 py-1 font-semibold text-neutral-500">
                B
              </div>
              <div className="border-b border-neutral-200 bg-neutral-100 px-2 py-1 font-semibold text-neutral-500">
                C
              </div>
              <div className="border-b border-r border-neutral-200 bg-neutral-100 px-1.5 py-1.5 text-center font-semibold text-neutral-500">
                7
              </div>
              <div className="border-b border-r border-neutral-200 px-2 py-1.5 font-mono text-neutral-700">
                GIOVEDÌ
              </div>
              <div className="border-b border-neutral-200 px-2 py-1.5 font-mono text-red-600">
                elena?? ahmed?
              </div>
              <div className="border-r border-neutral-200 bg-neutral-100 px-1.5 py-1.5 text-center font-semibold text-neutral-500">
                8
              </div>
              <div className="border-r border-neutral-200 px-2 py-1.5 font-mono text-neutral-700">
                VENERDÌ
              </div>
              <div className="px-2 py-1.5 font-mono text-neutral-400">???</div>
            </div>
          </div>

          {/* Foglietto sulla scrivania */}
          <div className="relative z-30 -mt-3 w-[62%] rotate-[3deg] rounded-sm bg-[#FDE68A] p-4 shadow-(--shadow-soft)">
            <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-2deg] bg-white/50 shadow-sm" />
            <p className="text-sm font-medium italic leading-snug text-amber-900">
              richiamare sig.ra Lombardi!!
              <br />
              chiavi B&amp;B → chiedere a Elena
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
