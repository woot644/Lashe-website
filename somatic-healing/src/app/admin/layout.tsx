import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { getAdminSession } from "@/lib/admin-auth";
import { AdminLogout } from "./admin-logout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminEmail = await getAdminSession();

  // Allow the login page through without auth
  // The login page is rendered as a child of this layout,
  // so we check the path via a different mechanism
  if (!adminEmail) {
    // We can't check the path here easily, so we'll handle this
    // by making the login page bypass the layout
    return <>{children}</>;
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
            <span className="text-xs text-white/40">{adminEmail}</span>
            <AdminLogout />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
