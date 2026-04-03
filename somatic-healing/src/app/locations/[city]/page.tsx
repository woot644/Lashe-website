import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, CheckCircle, Search } from "lucide-react";
import { locations } from "@/data/locations";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = locations.find((l) => l.slug === city);
  if (!loc) return { title: "Location Not Found" };

  return {
    title: `Somatic Therapists in ${loc.city} | Somatic Healing Australia`,
    description: `Find qualified somatic therapists in ${loc.city}, ${loc.stateFullName}. Browse verified practitioners offering body-based therapy for stress, trauma, anxiety, and tension. Search free, no account needed.`,
    keywords: loc.keywords.join(", "),
  };
}

const commonReasons = [
  "Persistent tension, pain, or tightness with no clear medical cause",
  "Anxiety that shows up as a racing heart, tight chest, or churning stomach",
  "Feeling emotionally numb, shut down, or disconnected from your body",
  "Trauma — whether a single event or ongoing — that talking has not fully resolved",
  "Chronic stress and burnout that has settled into your muscles and nervous system",
  "Grief or loss that feels like a weight in your body",
  "Difficulty regulating emotions — overwhelm, shutting down, or overreacting",
  "A sense that something is stuck, even if you cannot name what it is",
];

const whatToLookFor = [
  "Relevant qualifications and training in a recognised somatic modality",
  "Professional membership or registration (e.g. APS, PACFA, ACA)",
  "A clear explanation of how they work — in language you understand",
  "Session details including type (in-person or telehealth), length, and fees",
  "A warm, accessible profile that helps you feel comfortable before you even meet",
];

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = locations.find((l) => l.slug === city);

  if (!loc) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-4">
            <MapPin size={14} />
            {loc.state}, Australia
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Somatic Therapists in {loc.city}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            Find qualified, verified somatic therapists in {loc.city} and {loc.stateFullName}. Browse practitioner profiles, read about their approach, and reach out directly — all for free.
          </p>
          <Link
            href={`/find-a-therapist?location=${encodeURIComponent(loc.city)}`}
            className="gold-btn inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-xl transition-all text-sm uppercase tracking-wider"
          >
            <Search size={16} /> Search {loc.city} Practitioners
          </Link>
        </div>
      </section>

      {/* About somatic therapy + local context */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What is somatic therapy?
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Somatic therapy is a body-based approach to healing that works directly with physical sensation, tension, and nervous system patterns — not just thoughts and words. If you have ever noticed that stress goes straight to your shoulders, that anxiety lives in your chest, or that you feel physically braced even when nothing is wrong, somatic therapy addresses exactly that.
            </p>
            <p>
              Unlike traditional talk therapy, which works primarily through conversation, somatic therapists help you notice what your body is doing and support it to release what it has been holding. This might include guided attention to sensation, gentle movement, breathwork, or simply staying with what you feel in a safe, supported environment.
            </p>
            <p>
              {loc.description}
            </p>
          </div>
        </div>
      </section>

      {/* Common reasons */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Common reasons people in {loc.city} seek somatic therapy
          </h2>
          <div className="space-y-3">
            {commonReasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 bg-warm-white rounded-xl p-4"
              >
                <CheckCircle size={18} className="text-aqua shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--text-secondary)]">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to look for */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What to look for in a somatic therapist
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            Choosing a therapist is a personal decision. Here are some things to look for when browsing somatic practitioners in {loc.city}:
          </p>
          <div className="space-y-3">
            {whatToLookFor.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-cream rounded-xl p-4"
              >
                <CheckCircle size={18} className="text-aqua shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-6">
            Every practitioner on Somatic Healing Australia is verified — we check qualifications and professional memberships before a profile goes live.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-aqua-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to find a somatic therapist in {loc.city}?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
            Browse verified practitioners, read their profiles, and reach out directly. It is free to search and no account is required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/find-a-therapist?location=${encodeURIComponent(loc.city)}`}
              className="gold-btn inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-xl transition-all uppercase tracking-wider"
            >
              Search {loc.city} <ArrowRight size={16} />
            </Link>
            <Link
              href="/about-somatic-healing"
              className="inline-flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--text-secondary)] hover:border-aqua hover:text-aqua font-medium px-8 py-3 rounded-xl transition-colors"
            >
              Learn About Somatic Therapy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
