import { createClient } from "@/lib/supabase-server";
import { Mail, MailOpen } from "lucide-react";
import { MarkReadButton } from "./mark-read-button";

export default async function Enquiries() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();

  // Get practitioner ID
  const { data: practitioner } = await supabase
    .from("practitioners")
    .select("id")
    .eq("user_id", user!.id)
    .single();

  if (!practitioner) {
    return (
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-8 text-center">
        <p className="text-[var(--text-secondary)]">
          Create your practitioner profile first to receive enquiries.
        </p>
      </div>
    );
  }

  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .eq("practitioner_id", practitioner.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Enquiries
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Messages from potential clients.
        </p>
      </div>

      {!enquiries || enquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-12 text-center">
          <Mail size={32} className="text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-sm">No enquiries yet.</p>
          <p className="text-[var(--text-muted)] text-xs mt-1">
            When someone sends you a message through your profile, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`bg-white rounded-xl border shadow-sm p-5 ${
                enquiry.read ? "border-[var(--border)]" : "border-primary/30 bg-primary-50/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5">
                    {enquiry.read ? (
                      <MailOpen size={16} className="text-[var(--text-muted)]" />
                    ) : (
                      <Mail size={16} className="text-primary-dark" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{enquiry.name}</p>
                      {!enquiry.read && (
                        <span className="text-[10px] font-medium bg-primary text-white px-1.5 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">{enquiry.email}</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{enquiry.message}</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-2">
                      {new Date(enquiry.created_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {!enquiry.read && <MarkReadButton enquiryId={enquiry.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
