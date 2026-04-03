"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/auth/sign-in?message=Check your email to confirm your account");
  }

  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Join as a Practitioner
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Create your account to list your practice on Somatic Healing Australia.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="Dr Sarah Mitchell"
            />
          </div>

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
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors text-sm"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary-dark font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
