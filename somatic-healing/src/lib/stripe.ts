import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-03-31.basil" });
}

// Listing tier → Stripe price mapping
// Set these in your .env.local after creating products in Stripe Dashboard
export const TIER_PRICES: Record<string, string | undefined> = {
  premium: process.env.STRIPE_PRICE_PREMIUM,
  featured: process.env.STRIPE_PRICE_FEATURED,
};

export const TIER_LABELS: Record<string, string> = {
  premium: "Premium",
  featured: "Featured",
};
