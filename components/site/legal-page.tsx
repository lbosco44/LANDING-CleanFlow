import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

// `note`: riga sotto il titolo, usata dalla versione inglese per dichiarare
// che è una traduzione di cortesia e che prevale l'italiano. Vuota in italiano
// (non renderizzata).
export function LegalPage({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {note ? (
            <p className="mt-4 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
              {note}
            </p>
          ) : null}
          <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
