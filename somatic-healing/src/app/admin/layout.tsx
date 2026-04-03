import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Shield, Users, Mail } from "lucide-react";

// Add admin email addresses here
const ADMIN_EMAILS = [
  "kate@somatichealingaustralia.com.au",
  "zac@arclightdigital.com.au",
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  if (!supabase) redirect("/auth/sign-in");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    redirect("/");
  }

  return (
    <div className="bg-cream min-h-[calc(100vh-80px)]">
      <div className="bg-[#2A1E1A] text-[var(--text-light)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-[var(--gold-bright)]" />
            <span className="text-xs font-semibold uppercase tracking-wider">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xs text-white/70 hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/admin/practitioners" className="text-xs text-white/70 hover:text-white transition-colors">
              Practitioners
            </Link>
            <Link href="/dashboard" className="text-xs text-white/70 hover:text-white transition-colors">
              My Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
