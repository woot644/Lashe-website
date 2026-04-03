import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { practitioner_id, name, email, message } = body;

    if (!practitioner_id || !name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: "Service not configured." }, { status: 503 });
    }

    const { error } = await supabase.from("enquiries").insert({
      practitioner_id,
      name,
      email,
      message,
      type: "general",
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to submit enquiry. Please try again." },
        { status: 500 }
      );
    }

    // Increment enquiry count on the practitioner
    await supabase.rpc("increment_enquiry_count", {
      p_id: practitioner_id,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
