"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// v2: 3 ancore secche — chi entra capisce la mappa della pagina dal menu.
const NAV = [
  { href: "/#pilastri", label: "Cosa fa" },
  { href: "/#come-funziona", label: "Come funziona" },
  { href: "/#domande", label: "Domande" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-colors",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[69rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/cleanflow-mark.png"
            alt="CleanFlow"
            width={32}
            height={32}
            className="size-8"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-primary">Clean</span>
            <span className="text-accent-ink">Flow</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Link href="/demo" className={cn(buttonVariants({ size: "sm" }))}>
          Prenota una demo
        </Link>
      </div>
    </header>
  );
}
