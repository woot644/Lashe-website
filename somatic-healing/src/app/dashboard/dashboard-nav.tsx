"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, FileText, Mail, BarChart3, CreditCard, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/profile", label: "Edit Profile", icon: FileText },
  { href: "/dashboard/enquiries", label: "Enquiries", icon: Mail },
  { href: "/dashboard/billing", label: "Billing & Plan", icon: CreditCard },
];

export function DashboardNav({ userId, userEmail }: { userId: string; userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="lg:w-56 shrink-0">
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-4 sticky top-24">
        <div className="mb-4 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
              <User size={14} className="text-primary-dark" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] truncate">{userEmail}</p>
              <p className="text-[10px] text-[var(--text-muted)]">Practitioner</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-dark font-medium"
                    : "text-[var(--text-secondary)] hover:bg-primary-50/50"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
