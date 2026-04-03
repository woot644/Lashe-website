"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Access denied.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-cream py-16">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4">
            <Shield size={20} className="text-white" />
          </div>
          <h1
            className="text-2xl font-bold text-[var(--text-primary)] mb-1"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Admin Access
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Somatic Healing Australia
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 space-y-5"
        >
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-xl p-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors"
              placeholder="admin@somatichealingaustralia.com.au"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-btn font-semibold py-3 rounded-xl transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Shield size={14} />}
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
