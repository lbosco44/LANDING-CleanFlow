import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link / router / pathname "locale-aware": vanno usati al posto di next/link e
// next/navigation in TUTTO il sito. Conoscono la mappa dei pathname di
// routing.ts, quindi <Link href="/funzioni/operatori"> diventa
// "/funzioni/operatori" in italiano e "/en/features/staff" in inglese.
// usePathname restituisce il percorso INTERNO senza prefisso ("/demo"), così i
// confronti (es. dove nascondere la CTA mobile) restano uguali nelle due lingue.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
