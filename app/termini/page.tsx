import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Termini di servizio" };

export default function TerminiPage() {
  return (
    <LegalPage title="Termini di servizio">
      <p className="rounded-lg border-l-2 border-accent bg-accent-soft px-4 py-3 text-foreground">
        <strong>Bozza.</strong> Documento da finalizzare con i dati reali
        dell&apos;azienda e le condizioni del programma pilota.
      </p>
      <h2>Oggetto</h2>
      <p>
        Le presenti condizioni regolano l&apos;uso del sito e la richiesta di
        una demo di CleanFlow.
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
      <p>Per qualsiasi domanda: [email].</p>
    </LegalPage>
  );
}
