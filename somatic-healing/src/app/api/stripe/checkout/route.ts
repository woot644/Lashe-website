import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { getStripe, TIER_PRICES } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Payments not configured." }, { status: 503 });
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: "Auth not configured." }, { status: 503 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const body = await request.json();
    const { tier } = body;

    if (!tier || !TIER_PRICES[tier]) {
      return NextResponse.json({ error: "Invalid tier." }, { status: 400 });
    }

    const priceId = TIER_PRICES[tier];
    if (!priceId) {
      return NextResponse.json({ error: "Price not configured for this tier." }, { status: 503 });
    }

    // Get or create practitioner record
    const { data: practitioner } = await supabase
      .from("practitioners")
      .select("id, stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (!practitioner) {
      return NextResponse.json({ error: "Create your profile first." }, { status: 400 });
    }

    // Get or create Stripe customer
    let customerId = practitioner.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
          practitioner_id: practitioner.id,
        },
      });
      customerId = customer.id;

      await supabase
        .from("practitioners")
        .update({ stripe_customer_id: customerId })
        .eq("id", practitioner.id);
    }

    // Create checkout session
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard/billing?success=true`,
      cancel_url: `${origin}/dashboard/billing?cancelled=true`,
      metadata: {
        practitioner_id: practitioner.id,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
