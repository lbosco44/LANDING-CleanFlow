import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termini di servizio",
  description:
    "Condizioni d'uso del sito e del servizio CleanFlow, gestionale per imprese di pulizie.",
  alternates: { canonical: "/termini" },
};

export default function TerminiPage() {
  return (
    <LegalPage title="Termini di servizio">
      <p className="text-sm text-muted-foreground">
        Ultimo aggiornamento: luglio 2026
      </p>

      <h2>Titolare</h2>
      <p>
        Il sito è gestito da {COMPANY.legalName} — P.IVA {COMPANY.vat} —{" "}
        {COMPANY.address}.
      </p>

      <h2>Oggetto</h2>
      <p>
        Le presenti condizioni regolano l&apos;uso del sito e la richiesta di una
        demo di CleanFlow.
      </p>

      <h2>Demo e programma pilota</h2>
      <p>
        La richiesta di demo non comporta alcun obbligo di acquisto. Le
        condizioni economiche vengono illustrate in chiaro durante la demo.
      </p>

      <h2>Limitazioni</h2>
      <p>
        CleanFlow è un prodotto in fase di affinamento con le prime imprese a
        bordo: funzionalità e condizioni possono evolvere.
      </p>

      <h2>Contatti</h2>
      <p>
        Per qualsiasi domanda scrivi a{" "}
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
