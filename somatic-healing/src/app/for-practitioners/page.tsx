import Link from "next/link";
import { CheckCircle, ArrowRight, Search, BarChart3, Shield, Users, Zap, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Practitioners — Join the Directory | Somatic Healing Australia",
  description:
    "List your somatic therapy practice on Australia's first dedicated directory. Get found by people actively searching for body-based therapy. Free and premium plans available.",
};

const benefits = [
  {
    icon: Search,
    title: "Get found by the right clients",
    desc: "People searching for somatic therapy are already looking for what you offer. We put you in front of them at the exact moment they are ready to book.",
  },
  {
    icon: Globe,
    title: "A profile that ranks on Google",
    desc: "Every practitioner profile is SEO-optimised to rank for local search terms like 'somatic therapist in [your city].' We handle the technical work so you do not have to.",
  },
  {
    icon: Users,
    title: "A niche community",
    desc: "This is not a generic therapy directory. It is built specifically for somatic practitioners and the people who need them. Your profile sits alongside colleagues, not competitors.",
  },
  {
    icon: Zap,
    title: "No marketing required",
    desc: "You do the therapeutic work. We handle visibility, SEO, and client matching. Spend your time with clients, not on Instagram.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started and be listed in the directory.",
    features: [
      "Name, location, and credentials listed",
      "Short practice description",
      "Appear in search results",
      "Basic profile page",
    ],
    missing: [
      "No professional photo",
      "No 'About me' narrative",
      "No booking integration",
      "Standard search ranking",
      "No profile analytics",
    ],
    cta: "Create Free Listing",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "The full profile experience. Most practitioners choose this.",
    features: [
      "Everything in Free, plus:",
      "Professional photo displayed",
      "Full 'About me' narrative",
      "Modalities and specialisations listed",
      "Booking link or enquiry form",
      "Client reviews enabled",
      "Featured placement in search results",
      "Profile view analytics",
      "Priority SEO optimisation",
    ],
    missing: [],
    cta: "Start Premium Listing",
    highlighted: true,
  },
  {
    name: "Featured",
    price: "$89",
    period: "/month",
    description: "Maximum visibility. Ideal for established practices.",
    features: [
      "Everything in Premium, plus:",
      "Homepage carousel placement",
      "Top of search results in your area",
      "Social media promotion",
      "Priority support",
      "Quarterly profile review and optimisation",
    ],
    missing: [],
    cta: "Become Featured",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Who can list on Somatic Healing Australia?",
    a: "We accept qualified somatic therapists, Somatic Experiencing practitioners, sensorimotor psychotherapists, TRE providers, body psychotherapists, and allied health professionals who incorporate somatic approaches into their clinical work. All practitioners must hold relevant qualifications and current professional membership or registration.",
  },
  {
    q: "How does the verification process work?",
    a: "When you sign up, we ask you to provide details of your qualifications, training, and professional memberships. Our team verifies these against the relevant professional bodies. Once verified, your profile displays a 'Verified' badge, giving potential clients confidence in your credentials. This process typically takes 2\u20135 business days.",
  },
  {
    q: "Can I try Premium before committing?",
    a: "Yes. New practitioners get a 14-day free trial of the Premium tier. You can downgrade to the Free listing at any time with no lock-in contract.",
  },
  {
    q: "How do clients find me?",
    a: "Clients search the directory by location, what they are experiencing, session type, and other filters. Your profile appears in results that match your location and specialisations. Premium and Featured listings receive priority placement in search results.",
  },
  {
    q: "Can I manage my own profile?",
    a: "Absolutely. You get a self-service dashboard where you can update your profile, change your availability status, view enquiries, and check your profile analytics at any time.",
  },
  {
    q: "Do you take a commission on bookings?",
    a: "No. We do not take any cut of your session fees. The listing fee is your only cost. Clients book directly with you through your own booking system or via our enquiry form.",
  },
];

export default function ForPractitioners() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">For Practitioners</p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let the right clients find you
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Building a client base is hard. Managing your own SEO is expensive. Generic directories do not serve the somatic niche. We do.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl border border-[var(--border)] p-6">
                <div className="w-10 h-10 rounded-xl bg-aqua-50 flex items-center justify-center mb-4">
                  <b.icon size={20} className="text-aqua" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {b.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Simple, transparent pricing
            </h2>
            <p className="text-[var(--text-secondary)]">No lock-in contracts. Cancel or change your plan any time.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 ${
                  tier.highlighted
                    ? "gold-gradient text-white border-0 ring-4 ring-[#C9963A]/10"
                    : "bg-white border border-[var(--border)]"
                }`}
              >
                {tier.highlighted && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/20 text-white px-2.5 py-1 rounded-full mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-[var(--text-primary)]"}`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {tier.name}
                </h3>
                <div className="mb-3">
                  <span className={`text-3xl font-bold ${tier.highlighted ? "text-white" : "text-[var(--text-primary)]"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.highlighted ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                    {tier.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlighted ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
                  {tier.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle
                        size={14}
                        className={`shrink-0 mt-0.5 ${tier.highlighted ? "text-white/80" : "text-aqua"}`}
                      />
                      <span className={`text-sm ${tier.highlighted ? "text-white/90" : "text-[var(--text-secondary)]"}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                  {tier.missing.map((f) => (
                    <div key={f} className="flex items-start gap-2 opacity-50">
                      <span className="w-3.5 h-3.5 shrink-0 mt-0.5 text-center text-xs">&mdash;</span>
                      <span className="text-sm text-[var(--text-muted)]">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                    tier.highlighted
                      ? "bg-white text-[#A07828] hover:bg-white/90"
                      : "gold-btn"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section id="verification" className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-aqua-50 flex items-center justify-center mx-auto mb-5">
              <Shield size={24} className="text-aqua" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Our Verification Process
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
              Every practitioner on Somatic Healing Australia is verified. This protects consumers and gives your listing credibility.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Submit your details",
                desc: "Complete the sign-up form with your qualifications, training, professional memberships, and registration details.",
              },
              {
                step: "2",
                title: "We verify your credentials",
                desc: "Our team checks your qualifications against the relevant professional bodies and training organisations. This typically takes 2\u20135 business days.",
              },
              {
                step: "3",
                title: "Your profile goes live",
                desc: "Once verified, your profile is published with a \u2018Verified\u2019 badge. You can update your profile at any time through your dashboard.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-cream rounded-xl p-5">
                <div className="w-8 h-8 rounded-full gold-gradient text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#2c2c2c]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to be found?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Join Australia&apos;s first dedicated somatic therapy directory. Free listing available. No lock-in contracts.
          </p>
          <Link
            href="/contact?type=practitioner"
            className="inline-flex items-center gap-2 gold-btn font-medium px-8 py-3 rounded-lg"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
