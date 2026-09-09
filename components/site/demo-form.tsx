"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DemoForm() {
  const t = useTranslations("DemoForm");
  const locale = useLocale();
  const router = useRouter();
  const OPERATORI = t.raw("operatorOptions") as string[];
  const TOOLS = t.raw("toolOptions") as string[];

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [op, setOp] = useState("");
  const [azienda, setAzienda] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [gdpr, setGdpr] = useState(false);
  // Honeypot anti-bot: campo invisibile agli umani. Se valorizzato → è un bot.
  const [website, setWebsite] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleTool = (x: string) =>
    setTools((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !tel.trim() || !op) {
      setErr(t("errRequired"));
      return;
    }
    if (!gdpr) {
      setErr(t("errGdpr"));
      return;
    }
    setErr("");
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefono: tel,
          operatori: op,
          azienda,
          tools,
          website, // honeypot
          // Lingua della pagina: in HQ si vede se il lead va ricontattato in inglese.
          lingua: locale,
        }),
      });
    } catch {
      // non blocchiamo l'utente: prosegue comunque
    }
    router.push("/grazie");
  }

  const labelCls = "block text-sm font-medium text-foreground";
  const inputCls =
    "mt-1.5 h-11 w-full rounded-lg border border-input bg-card px-3.5 text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring";
  const chip = (active: boolean) =>
    cn(
      "rounded-lg border px-3.5 text-sm font-medium transition-colors",
      active
        ? "border-accent bg-accent-soft text-accent-ink"
        : "border-border bg-card text-muted-foreground hover:border-accent/40"
    );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nome" className={labelCls}>
          {t("name")} <span className="text-accent-ink">*</span>
        </label>
        <input
          id="nome"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputCls}
          placeholder={t("namePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="tel" className={labelCls}>
          {t("phone")} <span className="text-accent-ink">*</span>
        </label>
        <input
          id="tel"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className={inputCls}
          placeholder={t("phonePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          {t("email")}{" "}
          <span className="font-normal text-muted-foreground">{t("optionalF")}</span>
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      {/* Honeypot: fuori schermo, ignorato dagli umani, riempito dai bot. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">{t("honeypot")}</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <span className={labelCls}>
          {t("operators")} <span className="text-accent-ink">*</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {OPERATORI.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOp(o)}
              className={cn(chip(op === o), "h-10 px-4")}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="azienda" className={labelCls}>
          {t("company")}{" "}
          <span className="font-normal text-muted-foreground">{t("optionalM")}</span>
        </label>
        <input
          id="azienda"
          autoComplete="organization"
          value={azienda}
          onChange={(e) => setAzienda(e.target.value)}
          className={inputCls}
          placeholder={t("companyPlaceholder")}
        />
      </div>

      <div>
        <span className={labelCls}>
          {t("tools")}{" "}
          <span className="font-normal text-muted-foreground">{t("optionalM")}</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOOLS.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => toggleTool(x)}
              className={cn(chip(tools.includes(x)), "h-9")}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={gdpr}
          onChange={(e) => setGdpr(e.target.checked)}
          className="mt-0.5 size-4 rounded border-input accent-accent"
        />
        <span>
          {t.rich("gdpr", {
            a: (chunks) => (
              <Link
                href="/privacy"
                className="font-medium text-accent-ink underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>

      {err && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {err}
        </p>
      )}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? t("sending") : t("submit")}
      </Button>
      <p className="text-center text-sm text-muted-foreground">{t("footnote")}</p>
    </form>
  );
}
