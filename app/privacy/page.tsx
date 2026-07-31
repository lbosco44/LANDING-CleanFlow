import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Come CleanFlow tratta i dati personali di chi visita il sito e richiede una demo, ai sensi del GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-sm text-muted-foreground">
        Ultimo aggiornamento: luglio 2026
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        {COMPANY.legalName} — P.IVA {COMPANY.vat} — {COMPANY.address}. PEC:{" "}
        {COMPANY.pec}. Email:{" "}
        <a
          href={`mailto:${COMPANY.email}`}
          className="font-medium text-accent-ink underline underline-offset-2"
        >
          {COMPANY.email}
        </a>
        .
      </p>

      <h2>Dati raccolti</h2>
      <p>
        Tramite il modulo di richiesta demo raccogliamo: nome e telefono
        (obbligatori) e, facoltativamente, email, numero di operatori, nome
        dell&apos;impresa e strumenti attualmente in uso.
      </p>

      <h2>Finalità</h2>
      <p>
        I dati sono usati esclusivamente per ricontattarti e organizzare la
        demo. Non vengono ceduti a terzi per finalità di marketing.
      </p>

      <h2>Fornitori e strumenti</h2>
      <p>
        Per erogare il servizio ci avvaliamo di fornitori che trattano i dati per
        nostro conto: Supabase (database), Resend (invio delle notifiche via
        email) e Vercel (hosting del sito). I dati possono essere trattati su
        infrastrutture nell&apos;Unione Europea o in Paesi terzi con garanzie
        adeguate.
      </p>

      <h2>Conservazione e diritti</h2>
      <p>
        Conserviamo i dati per il tempo necessario a gestire la tua richiesta.
        Puoi richiedere in qualsiasi momento accesso, rettifica o cancellazione
        scrivendo a{" "}
        <a
          href={`mailto:${COMPANY.email}`}
          className="font-medium text-accent-ink underline underline-offset-2"
        >
          {COMPANY.email}
        </a>{" "}
        o alla PEC {COMPANY.pec}.
      </p>
    </LegalPage>
  );
}
