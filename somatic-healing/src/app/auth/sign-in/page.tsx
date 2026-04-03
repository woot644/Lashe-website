"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Authentication service is not configured.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-6 sm:p-8 space-y-5">
      {message && (
        <div className="bg-primary-50 text-primary-dark text-sm rounded-lg p-3">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="Your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors text-sm"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-secondary)]">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="text-primary-dark font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default function SignIn() {
  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Practitioner Sign In
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Sign in to manage your listing on Somatic Healing Australia.
          </p>
        </div>

        <Suspense fallback={<div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-8 text-center text-sm text-[var(--text-muted)]">Loading...</div>}>
          <SignInForm />
        </Suspense>
      </div>
    </section>
  );
}
