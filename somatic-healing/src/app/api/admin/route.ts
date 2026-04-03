import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAILS = [
  "kate@somatichealingaustralia.com.au",
  "zac@arclightdigital.com.au",
];

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "SomaticAdmin2026!";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required." }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    if (!ADMIN_EMAILS.includes(emailLower)) {
      return NextResponse.json({ error: "This email is not authorised for admin access." }, { status: 403 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 403 });
    }

    // Set a simple admin session cookie
    const token = Buffer.from(`${emailLower}:${Date.now()}`).toString("base64");
    const cookieStore = await cookies();

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
