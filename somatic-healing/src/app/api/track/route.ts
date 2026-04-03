import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ ok: true }); // Silently skip if not configured
    }

    const body = await request.json();
    const { path, referrer, visitorId } = body;

    if (!path || !visitorId) {
      return NextResponse.json({ ok: true });
    }

    const userAgent = request.headers.get("user-agent") || "";

    // Skip bots
    if (/bot|crawler|spider|crawling/i.test(userAgent)) {
      return NextResponse.json({ ok: true });
    }

    await supabase.from("page_views").insert({
      path,
      referrer: referrer || null,
      user_agent: userAgent,
      visitor_id: visitorId,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
