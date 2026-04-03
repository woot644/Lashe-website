import Link from "next/link";
import { ArrowRight, Shield, Eye, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Somatic Healing Australia",
  description:
    "Somatic Healing Australia is Australia's first dedicated directory connecting people with qualified somatic therapists. Learn about who we are, why we exist, and our standards.",
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About Somatic Healing Australia
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            We exist because finding a somatic therapist in Australia should not be this hard.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why We Built This
            </h2>
            <p>
              Somatic therapy is one of the most effective approaches for trauma, chronic stress, anxiety held in the body, and emotional patterns that talk therapy alone has not shifted. The evidence base is growing. Practitioners are training across Australia. And more people than ever are searching for body-based healing.
            </p>
            <p>
              But when someone in Australia searches for a somatic therapist, they find cluttered psychology directories with hundreds of irrelevant filters, bare-bones professional association listings with no personality, US-based platforms that do not serve the Australian market, and clinical jargon that means nothing to someone who just knows something feels stuck.
            </p>
            <p>
              There was no single, clean, Australian-specific platform where someone could search by what they are experiencing, in language they understand, and find a verified somatic practitioner with a real profile and a way to book.
            </p>
            <p className="text-lg font-medium text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              So we built one.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Accessibility",
                desc: "We write for real people, not clinicians. If someone does not know what somatic therapy is, they can find out here in plain language \u2014 and then find a practitioner who can help.",
              },
              {
                icon: Shield,
                title: "Credibility",
                desc: "Every practitioner on our platform is verified. We check qualifications and professional memberships because trust is the foundation of therapeutic work.",
              },
              {
                icon: Heart,
                title: "Respect",
                desc: "We respect the practitioners who do this work and the people who seek it. Our platform is not about selling wellness \u2014 it is about connecting people with qualified help.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-primary-dark" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Standards
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Practitioner Verification",
                desc: "We verify qualifications, training certifications, and professional memberships for every listed practitioner. Unverified practitioners are not published.",
              },
              {
                title: "Content Integrity",
                desc: "All educational content on this platform is written and reviewed to be accurate, evidence-informed, and free of misleading claims. We do not promote unsubstantiated treatments or make promises about outcomes.",
              },
              {
                title: "Review Moderation",
                desc: "Client reviews are moderated to ensure they are genuine, respectful, and constructive. We remove reviews that are abusive, fraudulent, or contain identifying clinical information.",
              },
              {
                title: "No Pay-for-Ranking Manipulation",
                desc: "Premium and Featured listings receive enhanced visibility, but no practitioner can pay to appear as 'recommended' or 'top-rated.' Ratings reflect genuine client feedback.",
              },
            ].map((s) => (
              <div key={s.title} className="bg-cream rounded-xl p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find the right practitioner for you
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Browse verified somatic therapists across Australia. It is free to search and no account is required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/find-a-therapist"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Find a Therapist <ArrowRight size={16} />
            </Link>
            <Link
              href="/for-practitioners"
              className="inline-flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--text-secondary)] hover:border-primary hover:text-primary-dark font-medium px-8 py-3 rounded-lg transition-colors"
            >
              I&apos;m a Practitioner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
