import { createClient } from "@/lib/supabase-server";
import { AdminPractitionerList } from "./practitioner-list";

export default async function AdminPractitioners() {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: practitioners } = await supabase
    .from("practitioners")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Manage Practitioners
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Verify credentials, publish profiles, and manage listing tiers.
        </p>
      </div>

      <AdminPractitionerList practitioners={practitioners || []} />
    </div>
  );
}
