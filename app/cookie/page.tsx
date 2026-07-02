import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePage() {
  return (
    <LegalPage title="Cookie Policy">
      <p className="text-sm text-muted-foreground">
        Ultimo aggiornamento: luglio 2026
      </p>

      <h2>Cookie utilizzati</h2>
      <p>
        Questo sito utilizza <strong>solo cookie e archiviazione locale
        tecnici</strong>, necessari al funzionamento (ad esempio per ricordare la
        tua scelta sulle preferenze cookie). Non richiedono il tuo consenso.
      </p>

      <h2>Statistiche e terze parti</h2>
      <p>
        Al momento non sono attivi strumenti di analisi statistica né di
        tracciamento pubblicitario. Se in futuro verranno introdotti, saranno
        caricati soltanto dopo il tuo consenso tramite l&apos;apposito banner.
      </p>

      <h2>Gestione delle preferenze</h2>
      <p>
        Puoi rivedere o revocare le tue preferenze in qualsiasi momento dal link{" "}
        <strong>&ldquo;Preferenze cookie&rdquo;</strong> presente nel footer del
        sito.
      </p>
    </LegalPage>
  );
}
