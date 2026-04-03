"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
    >
      <LogOut size={10} /> Sign Out
    </button>
  );
}
