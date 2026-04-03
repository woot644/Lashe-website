import { cookies } from "next/headers";

const ADMIN_EMAILS = [
  "kate@somatichealingaustralia.com.au",
  "zac@arclightdigital.com.au",
];

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) return null;

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email] = decoded.split(":");

    if (!ADMIN_EMAILS.includes(email)) return null;

    return email;
  } catch {
    return null;
  }
}
