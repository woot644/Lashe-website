"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { experiences, modalities as allModalities } from "@/data/practitioners";

const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const sessionTypeOptions = [
  { value: "in-person", label: "In-person only" },
  { value: "telehealth", label: "Telehealth only" },
  { value: "both", label: "In-person & Telehealth" },
];
const availabilityOptions = [
  { value: "accepting", label: "Accepting new clients" },
  { value: "waitlist", label: "Waitlist" },
  { value: "full", label: "Currently full" },
];
const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
];

type ProfileData = {
  full_name: string;
  credentials: string;
  practice_name: string;
  address: string;
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  about_me: string;
  modalities: string[];
  helps_with_tags: string[];
  session_types: string;
  session_length: string;
  fee_min: number | "";
  fee_max: number | "";
  booking_method: string;
  booking_url: string;
  qualifications: string;
  why_i_do_this_work: string;
  professional_memberships: string[];
  gender: string;
  availability: string;
};

const emptyProfile: ProfileData = {
  full_name: "",
  credentials: "",
  practice_name: "",
  address: "",
  suburb: "",
  city: "",
  state: "",
  postcode: "",
  about_me: "",
  modalities: [],
  helps_with_tags: [],
  session_types: "both",
  session_length: "60 minutes",
  fee_min: "",
  fee_max: "",
  booking_method: "enquiry",
  booking_url: "",
  qualifications: "",
  why_i_do_this_work: "",
  professional_memberships: [],
  gender: "",
  availability: "accepting",
};

export default function ProfileEditor() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [membershipsInput, setMembershipsInput] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("practitioners")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setPractitionerId(data.id);
        setProfile({
          full_name: data.full_name || "",
          credentials: data.credentials || "",
          practice_name: data.practice_name || "",
          address: data.address || "",
          suburb: data.suburb || "",
          city: data.city || "",
          state: data.state || "",
          postcode: data.postcode || "",
          about_me: data.about_me || "",
          modalities: data.modalities || [],
          helps_with_tags: data.helps_with_tags || [],
          session_types: data.session_types || "both",
          session_length: data.session_length || "60 minutes",
          fee_min: data.fee_min ?? "",
          fee_max: data.fee_max ?? "",
          booking_method: data.booking_method || "enquiry",
          booking_url: data.booking_url || "",
          qualifications: data.qualifications || "",
          why_i_do_this_work: data.why_i_do_this_work || "",
          professional_memberships: data.professional_memberships || [],
          gender: data.gender || "",
          availability: data.availability || "accepting",
        });
        setMembershipsInput((data.professional_memberships || []).join(", "));
      } else {
        // Pre-fill name from auth metadata
        const name = user.user_metadata?.full_name || "";
        setProfile({ ...emptyProfile, full_name: name });
      }

      setLoading(false);
    }
    load();
  }, []);

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function toggleArrayItem(arr: string[], item: string): string[] {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const memberships = membershipsInput
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    const record = {
      user_id: user.id,
      slug: generateSlug(profile.full_name),
      full_name: profile.full_name,
      credentials: profile.credentials,
      practice_name: profile.practice_name,
      address: profile.address,
      suburb: profile.suburb,
      city: profile.city,
      state: profile.state,
      postcode: profile.postcode,
      about_me: profile.about_me,
      modalities: profile.modalities,
      helps_with_tags: profile.helps_with_tags,
      session_types: profile.session_types,
      session_length: profile.session_length,
      fee_min: profile.fee_min === "" ? null : Number(profile.fee_min),
      fee_max: profile.fee_max === "" ? null : Number(profile.fee_max),
      booking_method: profile.booking_method,
      booking_url: profile.booking_url || null,
      qualifications: profile.qualifications,
      why_i_do_this_work: profile.why_i_do_this_work,
      professional_memberships: memberships,
      gender: profile.gender,
      availability: profile.availability,
    };

    let result;
    if (practitionerId) {
      result = await supabase
        .from("practitioners")
        .update(record)
        .eq("id", practitionerId);
    } else {
      result = await supabase
        .from("practitioners")
        .insert(record)
        .select()
        .single();
      if (result.data) {
        setPractitionerId(result.data.id);
      }
    }

    if (result.error) {
      setError(result.error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="text-primary-dark animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {practitionerId ? "Edit Profile" : "Create Profile"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            This information will appear on your public listing.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</div>
      )}
      {saved && (
        <div className="bg-emerald-50 text-emerald-700 text-sm rounded-lg p-3">Profile saved successfully.</div>
      )}

      {/* Basic Info */}
      <Section title="Basic Information">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" required>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className={inputClass}
              placeholder="Dr Sarah Mitchell"
            />
          </Field>
          <Field label="Credentials">
            <input
              type="text"
              value={profile.credentials}
              onChange={(e) => setProfile({ ...profile, credentials: e.target.value })}
              className={inputClass}
              placeholder="Clinical Psychologist, SE Practitioner"
            />
          </Field>
          <Field label="Practice name">
            <input
              type="text"
              value={profile.practice_name}
              onChange={(e) => setProfile({ ...profile, practice_name: e.target.value })}
              className={inputClass}
              placeholder="Embodied Psychology Sydney"
            />
          </Field>
          <Field label="Gender">
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className={inputClass}
            >
              <option value="">Select</option>
              {genderOptions.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      {/* Location */}
      <Section title="Location">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Street address" className="sm:col-span-2">
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className={inputClass}
              placeholder="Level 3, 45 Oxford Street"
            />
          </Field>
          <Field label="Suburb">
            <input
              type="text"
              value={profile.suburb}
              onChange={(e) => setProfile({ ...profile, suburb: e.target.value })}
              className={inputClass}
              placeholder="Darlinghurst"
            />
          </Field>
          <Field label="City">
            <input
              type="text"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              className={inputClass}
              placeholder="Sydney"
            />
          </Field>
          <Field label="State">
            <select
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className={inputClass}
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Postcode">
            <input
              type="text"
              value={profile.postcode}
              onChange={(e) => setProfile({ ...profile, postcode: e.target.value })}
              className={inputClass}
              placeholder="2010"
            />
          </Field>
        </div>
      </Section>

      {/* About Me */}
      <Section title="About Me" description="Write in first person. Be warm and accessible — explain your approach and what clients can expect.">
        <Field label="About me">
          <textarea
            rows={8}
            value={profile.about_me}
            onChange={(e) => setProfile({ ...profile, about_me: e.target.value })}
            className={inputClass + " resize-none"}
            placeholder="I work with people who have tried talking about their problems and found it helpful — but not enough..."
          />
        </Field>
        <Field label="Why I do this work" description="A short personal statement (2-3 sentences).">
          <textarea
            rows={3}
            value={profile.why_i_do_this_work}
            onChange={(e) => setProfile({ ...profile, why_i_do_this_work: e.target.value })}
            className={inputClass + " resize-none"}
            placeholder="I became a somatic therapist because..."
          />
        </Field>
      </Section>

      {/* Modalities */}
      <Section title="Modalities & Approaches" description="Select all that apply.">
        <div className="flex flex-wrap gap-2">
          {allModalities.map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => setProfile({ ...profile, modalities: toggleArrayItem(profile.modalities, mod) })}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                profile.modalities.includes(mod)
                  ? "bg-primary text-white"
                  : "bg-primary-50 text-[var(--text-secondary)] hover:bg-primary-100"
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </Section>

      {/* What I Help With */}
      <Section title="What I Help With" description="Select the experiences your clients typically present with.">
        <div className="flex flex-wrap gap-2">
          {experiences.map((exp) => (
            <button
              key={exp}
              type="button"
              onClick={() => setProfile({ ...profile, helps_with_tags: toggleArrayItem(profile.helps_with_tags, exp) })}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                profile.helps_with_tags.includes(exp)
                  ? "bg-primary text-white"
                  : "bg-primary-50 text-[var(--text-secondary)] hover:bg-primary-100"
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </Section>

      {/* Session Details */}
      <Section title="Session Details">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Session type">
            <select
              value={profile.session_types}
              onChange={(e) => setProfile({ ...profile, session_types: e.target.value })}
              className={inputClass}
            >
              {sessionTypeOptions.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Session length">
            <input
              type="text"
              value={profile.session_length}
              onChange={(e) => setProfile({ ...profile, session_length: e.target.value })}
              className={inputClass}
              placeholder="60 minutes"
            />
          </Field>
          <Field label="Fee minimum ($)">
            <input
              type="number"
              value={profile.fee_min}
              onChange={(e) => setProfile({ ...profile, fee_min: e.target.value === "" ? "" : Number(e.target.value) })}
              className={inputClass}
              placeholder="150"
            />
          </Field>
          <Field label="Fee maximum ($)">
            <input
              type="number"
              value={profile.fee_max}
              onChange={(e) => setProfile({ ...profile, fee_max: e.target.value === "" ? "" : Number(e.target.value) })}
              className={inputClass}
              placeholder="220"
            />
          </Field>
          <Field label="Booking method">
            <select
              value={profile.booking_method}
              onChange={(e) => setProfile({ ...profile, booking_method: e.target.value })}
              className={inputClass}
            >
              <option value="enquiry">Enquiry form (we handle it)</option>
              <option value="url">External booking link</option>
            </select>
          </Field>
          {profile.booking_method === "url" && (
            <Field label="Booking URL">
              <input
                type="url"
                value={profile.booking_url}
                onChange={(e) => setProfile({ ...profile, booking_url: e.target.value })}
                className={inputClass}
                placeholder="https://your-booking-page.com"
              />
            </Field>
          )}
          <Field label="Availability">
            <select
              value={profile.availability}
              onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
              className={inputClass}
            >
              {availabilityOptions.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      {/* Qualifications */}
      <Section title="Qualifications & Training">
        <Field label="Qualifications" description="List your degrees, certifications, and training.">
          <textarea
            rows={4}
            value={profile.qualifications}
            onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
            className={inputClass + " resize-none"}
            placeholder="Doctor of Psychology (Clinical), University of Sydney. Somatic Experiencing Practitioner (SEP)..."
          />
        </Field>
        <Field label="Professional memberships" description="Separate with commas.">
          <input
            type="text"
            value={membershipsInput}
            onChange={(e) => setMembershipsInput(e.target.value)}
            className={inputClass}
            placeholder="APS, SE Australia, PACFA"
          />
        </Field>
      </Section>

      {/* Save */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-medium px-8 py-3 rounded-lg transition-colors text-sm"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

// -- Reusable UI pieces --

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-primary transition-colors";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm p-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      {description && <p className="text-xs text-[var(--text-muted)] mb-5">{description}</p>}
      {!description && <div className="mb-5" />}
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  description,
  required,
  className,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {description && <p className="text-xs text-[var(--text-muted)] mb-1.5">{description}</p>}
      {children}
    </div>
  );
}
