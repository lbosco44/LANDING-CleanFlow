"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#come-funziona", label: "Come funziona" },
  { href: "/#moduli", label: "I moduli" },
  { href: "/#risultati", label: "Risultati" },
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
        "sticky top-0 z-50 bg-background/80 backdrop-blur-md transition-shadow",
        scrolled && "border-b border-border shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
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

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
