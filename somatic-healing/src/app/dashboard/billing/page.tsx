"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Crown, Star, Zap, ExternalLink, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const tiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Basic listing with name and location",
      "Short practice description",
      "Appear in search results",
    ],
    icon: CheckCircle,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$39",
    period: "/month",
    features: [
      "Full profile with photo and narrative",
      "Booking integration",
      "Featured search placement",
      "Client reviews enabled",
      "Profile analytics",
    ],
    icon: Star,
    recommended: true,
  },
  {
    id: "featured",
    name: "Featured",
    price: "$89",
    period: "/month",
    features: [
      "Everything in Premium",
      "Homepage carousel placement",
      "Top of search results",
      "Social media promotion",
      "Quarterly profile review",
    ],
    icon: Crown,
  },
];

function BillingContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");

  const [currentTier, setCurrentTier] = useState("free");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from("practitioners")
        .select("listing_tier, stripe_subscription_id")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setCurrentTier(data.listing_tier || "free");
        setHasSubscription(!!data.stripe_subscription_id);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleUpgrade(tier: string) {
    setUpgrading(tier);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong.");
        setUpgrading(null);
      }
    } catch {
      alert("Failed to start checkout.");
      setUpgrading(null);
    }
  }

  async function handleManageBilling() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch {
      alert("Failed to open billing portal.");
    }
    setPortalLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="text-aqua animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Billing &amp; Plan
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Manage your listing tier and subscription.
        </p>
      </div>

      {success && (
        <div className="bg-emerald-50 text-emerald-700 text-sm rounded-xl p-4 flex items-center gap-2">
          <CheckCircle size={16} />
          Your subscription is active. Your listing has been upgraded.
        </div>
      )}

      {cancelled && (
        <div className="bg-amber-50 text-amber-700 text-sm rounded-xl p-4">
          Checkout was cancelled. Your plan has not changed.
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-1">Current Plan</p>
            <p className="text-lg font-bold text-[var(--text-primary)] capitalize" style={{ fontFamily: "var(--font-heading)" }}>
              {currentTier}
            </p>
          </div>
          {hasSubscription && (
            <button
              onClick={handleManageBilling}
              disabled={portalLoading}
              className="inline-flex items-center gap-2 text-sm text-aqua hover:text-aqua-light font-medium transition-colors"
            >
              {portalLoading ? <Loader2 size={14} className="animate-spin" /> : <ExternalLink size={14} />}
              Manage Billing
            </button>
          )}
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="grid sm:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          const isCurrent = tier.id === currentTier;
          const isUpgrade = tiers.findIndex(t => t.id === tier.id) > tiers.findIndex(t => t.id === currentTier);

          return (
            <div
              key={tier.id}
              className={`rounded-2xl p-5 ${
                isCurrent
                  ? "bg-aqua-50 border-2 border-aqua"
                  : "bg-white border border-[var(--border)]"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <tier.icon size={18} className={isCurrent ? "text-aqua" : "text-[var(--text-muted)]"} />
                <h3 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  {tier.name}
                </h3>
                {isCurrent && (
                  <span className="text-[10px] font-semibold bg-aqua text-white px-2 py-0.5 rounded-full uppercase">
                    Current
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-2xl font-bold text-[var(--text-primary)]">{tier.price}</span>
                <span className="text-sm text-[var(--text-muted)]">{tier.period}</span>
              </div>

              <div className="space-y-2 mb-5">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-aqua shrink-0 mt-0.5" />
                    <span className="text-xs text-[var(--text-secondary)]">{f}</span>
                  </div>
                ))}
              </div>

              {isCurrent ? (
                <div className="text-center text-xs text-aqua font-medium py-2">
                  Your current plan
                </div>
              ) : isUpgrade ? (
                <button
                  onClick={() => handleUpgrade(tier.id)}
                  disabled={upgrading === tier.id}
                  className="w-full gold-btn font-semibold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {upgrading === tier.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Zap size={14} />
                  )}
                  {upgrading === tier.id ? "Redirecting..." : `Upgrade to ${tier.name}`}
                </button>
              ) : (
                <div className="text-center text-xs text-[var(--text-muted)] py-2">
                  {hasSubscription ? "Manage via billing portal" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 size={24} className="text-aqua animate-spin" /></div>}>
      <BillingContent />
    </Suspense>
  );
}
