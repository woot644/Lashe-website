import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Users, Shield, Clock, Eye } from "lucide-react";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminDashboard() {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  const supabase = await createClient();
  if (!supabase) return null;

  const { count: totalPractitioners } = await supabase
    .from("practitioners")
    .select("*", { count: "exact", head: true });

  const { count: publishedCount } = await supabase
    .from("practitioners")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { count: pendingCount } = await supabase
    .from("practitioners")
    .select("*", { count: "exact", head: true })
    .eq("verified", false);

  const { count: totalEnquiries } = await supabase
    .from("enquiries")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Admin Overview
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Manage practitioners, verify credentials, and monitor the directory.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: "Total Practitioners",
            value: totalPractitioners || 0,
            color: "text-primary",
          },
          {
            icon: Eye,
            label: "Published",
            value: publishedCount || 0,
            color: "text-aqua",
          },
          {
            icon: Clock,
            label: "Pending Verification",
            value: pendingCount || 0,
            color: "text-amber-600",
          },
          {
            icon: Shield,
            label: "Total Enquiries",
            value: totalEnquiries || 0,
            color: "text-primary",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                <stat.icon size={16} className={stat.color} />
              </div>
              <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/practitioners"
          className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 hover:shadow-lg transition-shadow group"
        >
          <h3
            className="font-semibold text-[var(--text-primary)] mb-2 group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Manage Practitioners
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Review profiles, verify credentials, publish or unpublish listings, and manage tiers.
          </p>
        </Link>
        <Link
          href="/admin/practitioners?filter=pending"
          className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 hover:shadow-lg transition-shadow group"
        >
          <h3
            className="font-semibold text-[var(--text-primary)] mb-2 group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pending Verification
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Review practitioners awaiting credential verification.
            {(pendingCount ?? 0) > 0 && (
              <span className="ml-1 text-amber-600 font-medium">
                ({pendingCount} pending)
              </span>
            )}
          </p>
        </Link>
      </div>
    </div>
  );
}
