"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, CheckCircle, XCircle, MapPin, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

interface PractitionerRow {
  id: string;
  full_name: string;
  credentials: string;
  city: string;
  state: string;
  listing_tier: string;
  verified: boolean;
  published: boolean;
  created_at: string;
  profile_views: number;
  enquiry_count: number;
}

export function AdminPractitionerList({
  practitioners,
}: {
  practitioners: PractitionerRow[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "pending" | "published">("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = practitioners.filter((p) => {
    if (filter === "pending") return !p.verified;
    if (filter === "published") return p.published;
    return true;
  });

  async function updatePractitioner(
    id: string,
    updates: Partial<PractitionerRow>
  ) {
    setUpdating(id);
    const supabase = createClient();
    if (!supabase) return;

    await supabase.from("practitioners").update(updates).eq("id", id);

    router.refresh();
    setUpdating(null);
  }

  return (
    <>
      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "pending", "published"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              filter === f
                ? "bg-primary text-white"
                : "bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:border-primary"
            }`}
          >
            {f === "all"
              ? `All (${practitioners.length})`
              : f === "pending"
              ? `Pending (${practitioners.filter((p) => !p.verified).length})`
              : `Published (${practitioners.filter((p) => p.published).length})`}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-12 text-center">
          <p className="text-[var(--text-secondary)]">No practitioners match this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {p.full_name}
                    </h3>
                    {p.verified && (
                      <span className="text-[10px] bg-aqua-50 text-aqua font-medium px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    )}
                    {p.published && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 font-medium px-1.5 py-0.5 rounded">
                        Published
                      </span>
                    )}
                    <span className="text-[10px] bg-sand-light text-[var(--text-muted)] font-medium px-1.5 py-0.5 rounded capitalize">
                      {p.listing_tier}
                    </span>
                  </div>
                  <p className="text-xs text-primary mb-1">{p.credentials}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {p.city}, {p.state}
                    </span>
                    <span>{p.profile_views} views</span>
                    <span>{p.enquiry_count} enquiries</span>
                    <span>
                      Joined{" "}
                      {new Date(p.created_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {updating === p.id ? (
                    <Loader2 size={16} className="animate-spin text-[var(--text-muted)]" />
                  ) : (
                    <>
                      {!p.verified ? (
                        <button
                          onClick={() =>
                            updatePractitioner(p.id, { verified: true })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-aqua text-white hover:bg-aqua-light transition-colors cursor-pointer"
                          title="Verify credentials"
                        >
                          <Shield size={12} /> Verify
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updatePractitioner(p.id, { verified: false })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer"
                          title="Revoke verification"
                        >
                          <XCircle size={12} /> Unverify
                        </button>
                      )}

                      {!p.published ? (
                        <button
                          onClick={() =>
                            updatePractitioner(p.id, { published: true })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer"
                          title="Publish profile"
                        >
                          <Eye size={12} /> Publish
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updatePractitioner(p.id, { published: false })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] text-[var(--text-muted)] hover:text-amber-600 hover:border-amber-300 transition-colors cursor-pointer"
                          title="Unpublish profile"
                        >
                          <EyeOff size={12} /> Unpublish
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
