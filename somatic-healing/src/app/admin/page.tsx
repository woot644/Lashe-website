import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Users, Shield, Clock, Eye, Globe, TrendingUp, BarChart3, MousePointer } from "lucide-react";
import { getAdminSession } from "@/lib/admin-auth";
import { createClient as createServiceClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createServiceClient(url, key);
}

export default async function AdminDashboard() {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");

  const supabase = await createClient();
  const adminDb = getAdminSupabase();

  // Practitioner stats
  let totalPractitioners = 0;
  let publishedCount = 0;
  let pendingCount = 0;
  let totalEnquiries = 0;

  if (supabase) {
    const [total, published, pending, enquiries] = await Promise.all([
      supabase.from("practitioners").select("*", { count: "exact", head: true }),
      supabase.from("practitioners").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("practitioners").select("*", { count: "exact", head: true }).eq("verified", false),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
    ]);
    totalPractitioners = total.count || 0;
    publishedCount = published.count || 0;
    pendingCount = pending.count || 0;
    totalEnquiries = enquiries.count || 0;
  }

  // Analytics stats
  let totalPageViews = 0;
  let todayPageViews = 0;
  let weekPageViews = 0;
  let uniqueVisitors = 0;
  let todayVisitors = 0;
  let topPages: { path: string; views: number }[] = [];

  if (adminDb) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [allViews, todayViews, weekViews] = await Promise.all([
      adminDb.from("page_views").select("*", { count: "exact", head: true }),
      adminDb.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", todayStart),
      adminDb.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", weekStart),
    ]);

    totalPageViews = allViews.count || 0;
    todayPageViews = todayViews.count || 0;
    weekPageViews = weekViews.count || 0;

    // Unique visitors (all time)
    const { data: allVisitors } = await adminDb
      .from("page_views")
      .select("visitor_id")
      .limit(10000);
    if (allVisitors) {
      uniqueVisitors = new Set(allVisitors.map((v) => v.visitor_id)).size;
    }

    // Today's unique visitors
    const { data: todayVisitorData } = await adminDb
      .from("page_views")
      .select("visitor_id")
      .gte("created_at", todayStart)
      .limit(10000);
    if (todayVisitorData) {
      todayVisitors = new Set(todayVisitorData.map((v) => v.visitor_id)).size;
    }

    // Top pages (last 7 days)
    const { data: recentViews } = await adminDb
      .from("page_views")
      .select("path")
      .gte("created_at", weekStart)
      .limit(10000);
    if (recentViews) {
      const counts: Record<string, number> = {};
      recentViews.forEach((v) => {
        counts[v.path] = (counts[v.path] || 0) + 1;
      });
      topPages = Object.entries(counts)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Admin Overview
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Manage practitioners, verify credentials, and monitor site traffic.
        </p>
      </div>

      {/* Directory Stats */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Directory</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Total Practitioners", value: totalPractitioners, color: "text-primary" },
            { icon: Eye, label: "Published", value: publishedCount, color: "text-aqua" },
            { icon: Clock, label: "Pending Verification", value: pendingCount, color: "text-amber-600" },
            { icon: Shield, label: "Total Enquiries", value: totalEnquiries, color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5">
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
      </div>

      {/* Traffic Stats */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Site Traffic</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: MousePointer, label: "Today's Page Views", value: todayPageViews, sub: `${todayVisitors} unique visitor${todayVisitors !== 1 ? "s" : ""}` },
            { icon: TrendingUp, label: "This Week", value: weekPageViews, sub: "last 7 days" },
            { icon: Globe, label: "All Time Views", value: totalPageViews, sub: `${uniqueVisitors} unique visitors` },
            { icon: BarChart3, label: "Avg Views/Day", value: weekPageViews > 0 ? Math.round(weekPageViews / 7) : 0, sub: "based on last 7 days" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-aqua-50 flex items-center justify-center">
                  <stat.icon size={16} className="text-aqua" />
                </div>
                <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      {topPages.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Top Pages (Last 7 Days)</h2>
          <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
            {topPages.map((page, i) => (
              <div
                key={page.path}
                className={`flex items-center justify-between px-5 py-3 ${
                  i < topPages.length - 1 ? "border-b border-[var(--border)]" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-[var(--text-muted)] w-5 text-right">{i + 1}</span>
                  <span className="text-sm text-[var(--text-primary)] truncate">{page.path}</span>
                </div>
                <span className="text-sm font-medium text-[var(--text-secondary)] shrink-0 ml-4">
                  {page.views} view{page.views !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Quick Actions</h2>
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
              Review profiles, verify credentials, publish or unpublish listings.
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
              {pendingCount > 0 && (
                <span className="ml-1 text-amber-600 font-medium">
                  ({pendingCount} pending)
                </span>
              )}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
