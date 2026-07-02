import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePage() {
  return (
    <LegalPage title="Cookie Policy">
      <p className="rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3 text-foreground">
        <strong>Bozza.</strong> Da aggiornare in base agli strumenti di analytics
        e tracking effettivamente attivati prima del lancio.
      </p>
      <h2>Cookie tecnici</h2>
      <p>
        Il sito utilizza solo cookie tecnici necessari al funzionamento. Non
        richiedono consenso.
      </p>
      <h2>Cookie analitici e di terze parti</h2>
      <p>
        [Da definire.] Eventuali strumenti di analisi o tracking delle
        conversioni verranno attivati solo previo consenso tramite banner.
      </p>
      <h2>Gestione delle preferenze</h2>
      <p>
        Potrai modificare le preferenze sui cookie in qualsiasi momento dal
        banner di consenso.
      </p>
    </LegalPage>
  );
}
