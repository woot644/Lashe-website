import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, DollarSign, Video, Building2, Star, Shield, ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { practitioners } from "@/data/practitioners";

export function generateStaticParams() {
  return practitioners.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const p = practitioners.find((pr) => pr.slug === slug);
    if (!p) return { title: "Practitioner Not Found" };
    return {
      title: `${p.fullName} — ${p.credentials} | Somatic Healing Australia`,
      description: `${p.fullName} is a verified somatic therapist in ${p.location.city}, ${p.location.state}. ${p.aboutMe.split("\n")[0].slice(0, 150)}...`,
    };
  });
}

const sessionTypeLabels: Record<string, string> = {
  "in-person": "In-person only",
  telehealth: "Telehealth only",
  both: "In-person & Telehealth",
};

const availabilityLabels: Record<string, string> = {
  accepting: "Accepting new clients",
  waitlist: "Waitlist",
  full: "Currently full",
};

const availabilityColours: Record<string, string> = {
  accepting: "bg-emerald-100 text-emerald-700",
  waitlist: "bg-amber-100 text-amber-700",
  full: "bg-red-100 text-red-700",
};

export default async function PractitionerProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = practitioners.find((pr) => pr.slug === slug);

  if (!p) notFound();

  return (
    <>
      {/* Back Link */}
      <div className="bg-primary-50 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/find-a-therapist"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-aqua transition-colors"
          >
            <ArrowLeft size={14} /> Back to search results
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <section className="bg-primary-50 pb-12 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-primary-100 overflow-hidden relative shrink-0">
              {p.photo ? (
                <Image src={p.photo} alt={p.fullName} fill className="object-cover" sizes="128px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-semibold text-primary-dark" style={{ fontFamily: "var(--font-heading)" }}>
                    {p.fullName.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  {p.fullName}
                </h1>
                {p.verified && (
                  <span className="inline-flex items-center gap-1 bg-aqua-50 text-aqua text-xs font-medium px-2.5 py-1 rounded-full">
                    <Shield size={12} /> Verified
                  </span>
                )}
              </div>
              <p className="text-primary-dark font-medium mb-2">{p.credentials}</p>
              <p className="text-[var(--text-secondary)] text-sm mb-3">{p.practiceName}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {p.location.suburb}, {p.location.city} {p.location.state} {p.location.postcode}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  {p.rating} ({p.reviewCount} reviews)
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${availabilityColours[p.availability]}`}>
                  {availabilityLabels[p.availability]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Body */}
      <section className="py-12 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* About Me */}
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  About Me
                </h2>
                <div className="prose prose-neutral max-w-none text-[var(--text-secondary)] leading-relaxed space-y-4">
                  {p.aboutMe.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* What I Help With */}
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  What I Help With
                </h2>
                <div className="flex flex-wrap gap-2">
                  {p.helpsWithTags.map((tag) => (
                    <span key={tag} className="bg-sand-light text-[var(--text-secondary)] px-4 py-2 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modalities */}
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Modalities &amp; Approaches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {p.modalities.map((mod) => (
                    <span key={mod} className="bg-[#A8D8D0] text-[#5AA8A0] px-4 py-2 rounded-full text-sm font-medium">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Qualifications &amp; Training
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{p.qualifications}</p>
                {p.professionalMemberships.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Professional Memberships</p>
                    <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                      {p.professionalMemberships.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Why I Do This Work */}
              {p.whyIDoThisWork && (
                <div className="bg-cream rounded-xl p-6 border border-[var(--border)]">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Why I Do This Work
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed italic">
                    &ldquo;{p.whyIDoThisWork}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 sticky top-24">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Session Details
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    {p.sessionTypes === "telehealth" ? (
                      <Video size={16} className="text-aqua shrink-0" />
                    ) : (
                      <Building2 size={16} className="text-aqua shrink-0" />
                    )}
                    <span className="text-[var(--text-secondary)]">{sessionTypeLabels[p.sessionTypes]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-aqua shrink-0" />
                    <span className="text-[var(--text-secondary)]">{p.sessionLength}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign size={16} className="text-aqua shrink-0" />
                    <span className="text-[var(--text-secondary)]">
                      ${p.feeRange.min} &ndash; ${p.feeRange.max} per session
                    </span>
                  </div>
                </div>

                {p.bookingMethod === "url" && p.bookingUrl ? (
                  <a
                    href={p.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full gold-btn font-medium py-3 rounded-lg text-sm"
                  >
                    Book a Session <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link
                    href={`/contact?practitioner=${p.slug}`}
                    className="flex items-center justify-center gap-2 w-full gold-btn font-medium py-3 rounded-lg text-sm"
                  >
                    Send an Enquiry <Mail size={14} />
                  </Link>
                )}

                <p className="text-[10px] text-[var(--text-muted)] text-center mt-3">
                  You will be directed to the practitioner&apos;s own booking system.
                </p>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Location
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {p.location.address}<br />
                  {p.location.suburb}, {p.location.state} {p.location.postcode}
                </p>
                <div className="aspect-[4/3] rounded-lg bg-sand-light flex items-center justify-center">
                  <p className="text-xs text-[var(--text-muted)]">Map placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
