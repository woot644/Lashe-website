"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const links = [
  { href: "/", label: "Home" },
  { href: "/find-a-therapist", label: "Find a Therapist" },
  { href: "/about-somatic-healing", label: "What Is Somatic Healing?" },
  { href: "/for-practitioners", label: "For Practitioners" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22c4-4 8-7 8-12a8 8 0 0 0-16 0c0 5 4 8 8 12z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                Somatic Healing
              </span>
              <span className="hidden sm:inline text-xs text-[var(--text-muted)] ml-1">Australia</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-secondary)] hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm font-semibold gold-btn px-5 py-2.5 rounded-xl transition-all inline-flex items-center gap-2"
              >
                <User size={14} /> Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/sign-up"
                className="text-sm font-semibold gold-btn px-5 py-2.5 rounded-xl transition-all"
              >
                List Your Practice
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[var(--text-secondary)]"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-warm-white">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-[var(--text-secondary)] hover:text-primary py-2"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block text-center font-semibold gold-btn px-5 py-2.5 rounded-xl transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/sign-up"
                onClick={() => setOpen(false)}
                className="block text-center font-semibold gold-btn px-5 py-2.5 rounded-xl transition-all"
              >
                List Your Practice
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
