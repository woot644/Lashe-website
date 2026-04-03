import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Eye, Mail, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Try to fetch the practitioner profile
  const { data: practitioner } = await supabase
    .from("practitioners")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  // If no profile yet, show onboarding
  if (!practitioner) {
    return (
      <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-8 sm:p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={24} className="text-primary-dark" />
        </div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Welcome to Somatic Healing Australia
        </h1>
        <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
          Your account is set up. The next step is to create your practitioner profile so clients can find you.
        </p>
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm"
        >
          Create Your Profile <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Fetch enquiry count
  const { count: enquiryCount } = await supabase
    .from("enquiries")
    .select("*", { count: "exact", head: true })
    .eq("practitioner_id", practitioner.id);

  const { count: unreadCount } = await supabase
    .from("enquiries")
    .select("*", { count: "exact", head: true })
    .eq("practitioner_id", practitioner.id)
    .eq("read", false);

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[var(--text-primary)] mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Welcome back, {practitioner.full_name}.
        </p>
      </div>

      {/* Status Banner */}
      {!practitioner.published && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Your profile is not yet published</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {practitioner.verified
                ? "Your credentials have been verified. Complete your profile to go live."
                : "Your credentials are being reviewed. We will notify you once verified."}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <Eye size={16} className="text-primary-dark" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">Profile Views</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{practitioner.profile_views}</p>
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <Mail size={16} className="text-primary-dark" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">Total Enquiries</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{enquiryCount || 0}</p>
          {(unreadCount ?? 0) > 0 && (
            <p className="text-xs text-primary-dark mt-1">{unreadCount} unread</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
              <CheckCircle size={16} className="text-primary-dark" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">Status</span>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{practitioner.availability}</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {practitioner.listing_tier} tier
            {practitioner.verified && " · Verified"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/profile"
          className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-5 hover:shadow-md transition-shadow group"
        >
          <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-primary-dark transition-colors">
            Edit Profile
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Update your about section, modalities, fees, and availability.
          </p>
        </Link>
        <Link
          href="/dashboard/enquiries"
          className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-5 hover:shadow-md transition-shadow group"
        >
          <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-primary-dark transition-colors">
            View Enquiries
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            See messages from potential clients and mark them as read.
          </p>
        </Link>
      </div>
    </div>
  );
}
