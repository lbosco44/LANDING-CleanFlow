import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3 text-foreground">
        <strong>Bozza.</strong> Documento da finalizzare con i dati reali
        dell&apos;azienda (titolare del trattamento, P.IVA, sede) e gli strumenti
        effettivamente usati.
      </p>
      <h2>Titolare del trattamento</h2>
      <p>[Ragione sociale] — P.IVA [—] — [Sede]. Email: [email].</p>
      <h2>Dati raccolti</h2>
      <p>
        Tramite il modulo di richiesta demo raccogliamo: nome, telefono, numero
        di operatori e, facoltativamente, nome dell&apos;impresa e strumenti
        attualmente in uso.
      </p>
      <h2>Finalità</h2>
      <p>
        I dati sono usati esclusivamente per ricontattarti e organizzare la
        demo. Non vengono ceduti a terzi per finalità di marketing.
      </p>
      <h2>Conservazione e diritti</h2>
      <p>
        I dati sono conservati su server nell&apos;Unione Europea. Puoi
        richiedere in qualsiasi momento accesso, rettifica o cancellazione
        scrivendo a [email].
      </p>
    </LegalPage>
  );
}
