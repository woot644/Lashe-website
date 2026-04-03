"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export function MarkReadButton({ enquiryId }: { enquiryId: string }) {
  const router = useRouter();

  async function handleMarkRead() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase
      .from("enquiries")
      .update({ read: true })
      .eq("id", enquiryId);
    router.refresh();
  }

  return (
    <button
      onClick={handleMarkRead}
      className="text-xs text-primary-dark hover:text-primary font-medium whitespace-nowrap cursor-pointer"
    >
      Mark read
    </button>
  );
}
