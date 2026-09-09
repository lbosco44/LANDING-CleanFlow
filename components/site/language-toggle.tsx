"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Segmented IT | EN nell'header. Cambia lingua restando sulla stessa pagina:
// usePathname di next-intl dà il percorso INTERNO (es. /funzioni/operatori) e
// il router lo riscrive nello slug della lingua scelta (/en/features/staff).
export function LanguageToggle() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("langLabel")}
      className="flex items-center rounded-full border border-border bg-card p-0.5"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            onClick={() => {
              if (!active) router.replace(pathname, { locale: l });
            }}
            className={cn(
              "h-8 rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-150",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
