"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { navLinks } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Magnetic } from "@/components/animations/magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full p-2 md:p-2.5 md:pl-7 transition-all duration-500",
            "border border-transparent",
            scrolled
              ? "border-border/70 bg-background/70 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]"
              : "border-transparent bg-transparent"
          )}
          style={{ width: "min(100% - 1.5rem, 72rem)" }}
        >
          <Logo size={30} className="pl-2 md:pl-0" />

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative px-5 py-3 rounded-full transition-colors hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden md:inline-flex h-12 w-12" />
            <Magnetic className="hidden md:inline-block" strength={0.4}>
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-1.5 rounded-full bg-foreground pl-5 pr-2 text-sm font-medium text-background"
              >
                Start a project
                <span className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Magnetic>

            <button
              className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-background"
            >
              <div className="flex items-center justify-between px-6 py-6">
                <Logo size={30} />
                <div className="flex items-center gap-2">
                  <ThemeToggle className="h-12 w-12" />
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <nav className="px-6 pt-10">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-border"
                  >
                    <Link
                      href={l.href}
                      className="flex items-center justify-between py-6 text-3xl font-display"
                    >
                      <span>{l.label}</span>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-6 pt-10">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
                >
                  Start a project →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
