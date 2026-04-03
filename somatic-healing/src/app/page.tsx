import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Calendar, CheckCircle, ArrowRight, Shield, Users, Star } from "lucide-react";
import { practitioners, experiences } from "@/data/practitioners";

const featuredPractitioners = practitioners.filter((p) => p.listingTier === "featured" || p.listingTier === "premium").slice(0, 4);

export default function Home() {
  return (
    <>
      {/* Hero — Sunset Tide Gradient */}
      <section className="relative hero-gradient overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="A person sitting peacefully in a warm, light-filled therapy room practising body awareness"
          fill
          priority
          className="object-cover opacity-15 mix-blend-overlay"
          sizes="100vw"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="gold-text font-semibold text-sm tracking-[0.2em] uppercase mb-4">Australia&apos;s Somatic Therapy Directory</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-light)] leading-[1.1] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Find a therapist who works with your body, <em className="text-[#FFF8F2] not-italic" style={{ textShadow: "0 2px 8px rgba(138,74,58,0.4)" }}>not just your mind</em>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Somatic therapy helps your body release what words alone cannot reach. Find a qualified, verified practitioner near you.
            </p>

            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-3 sm:p-4 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    placeholder="City, suburb, or postcode"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors"
                  />
                </div>
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <select className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-aqua transition-colors appearance-none text-[var(--text-secondary)]">
                    <option value="">What are you experiencing?</option>
                    {experiences.map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
                <Link
                  href="/find-a-therapist"
                  className="gold-btn font-semibold px-8 py-3 rounded-xl transition-all text-sm whitespace-nowrap text-center uppercase tracking-wider"
                >
                  Search
                </Link>
              </div>
            </div>

            <p className="text-xs text-white/50 mt-4">
              Search is free. No account required. Browse verified practitioners across Australia.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-aqua font-semibold text-sm tracking-[0.15em] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              Three steps to finding the right therapist
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Search,
                step: "1",
                title: "Describe what you\u2019re experiencing",
                desc: "Use plain language \u2014 no clinical terms needed. Search by what you feel, where you are, and how you\u2019d like to meet.",
              },
              {
                icon: Users,
                step: "2",
                title: "Browse matched practitioners",
                desc: "See verified profiles with real photos, qualifications, and descriptions written by the practitioners themselves.",
              },
              {
                icon: Calendar,
                step: "3",
                title: "Book a session",
                desc: "Reach out directly through the practitioner\u2019s profile. Book online, send an enquiry, or call \u2014 whatever works for you.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-aqua-50 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={24} className="text-aqua" />
                </div>
                <div className="text-xs font-semibold gold-text uppercase tracking-wider mb-2">Step {item.step}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Somatic Healing */}
      <section className="py-20 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-3">Understanding Somatic Therapy</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Your body remembers what your mind tries to forget
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                <p>
                  You might notice it as a tightness in your chest that never quite goes away. A jaw that clenches without reason. A feeling of being braced for something, even when everything is fine. Or maybe you feel strangely disconnected &mdash; like you&apos;re watching your life from behind glass.
                </p>
                <p>
                  These are not signs that something is wrong with you. They are signs that your body is holding onto something it has not yet been able to release. Stress, trauma, grief, overwhelm &mdash; they do not just live in your thoughts. They settle into your muscles, your breath, your nervous system.
                </p>
                <p>
                  Somatic therapy works directly with these physical patterns. Instead of only talking about what happened, a somatic therapist helps you notice what your body is doing right now &mdash; and gently supports it to let go.
                </p>
              </div>
              <Link
                href="/about-somatic-healing"
                className="inline-flex items-center gap-2 text-aqua font-medium mt-6 hover:gap-3 transition-all text-sm"
              >
                Learn more about somatic healing <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Does any of this sound familiar?
              </p>
              {[
                "\u201CI feel stuck, and I don\u2019t know why.\u201D",
                "\u201CMy body holds tension I cannot explain.\u201D",
                "\u201CTalk therapy helped my mind, but not my body.\u201D",
                "\u201CI feel disconnected from myself.\u201D",
                "\u201CI know something is unresolved, but I can\u2019t think my way through it.\u201D",
                "\u201CAnxiety lives in my chest, not just my thoughts.\u201D",
              ].map((quote) => (
                <div
                  key={quote}
                  className="bg-warm-white rounded-xl p-5 border border-[var(--border)] hover:border-primary-light transition-colors"
                >
                  <p className="text-[var(--text-secondary)] text-sm italic leading-relaxed">{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Practitioners */}
      <section className="py-20 sm:py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-[0.15em] uppercase mb-3">Featured Practitioners</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              Qualified, verified, and ready to help
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPractitioners.map((p) => (
              <Link key={p.slug} href={`/practitioners/${p.slug}`} className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer">
                <div className="aspect-[4/3] bg-primary-50 relative overflow-hidden">
                  {p.photo ? (
                    <Image src={p.photo} alt={p.fullName} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary-dark" style={{ fontFamily: "var(--font-heading)" }}>
                          {p.fullName.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-primary transition-colors">{p.fullName}</h3>
                  <p className="text-xs text-primary mb-2">{p.credentials}</p>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-3">
                    <MapPin size={12} />
                    {p.location.city}, {p.location.state}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-4">{p.helpsWithTags.slice(0, 2).join(", ")}</p>
                  <span className="block text-center text-sm font-medium text-aqua border border-aqua rounded-xl py-2 group-hover:bg-aqua group-hover:text-white transition-colors">
                    View Profile
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/find-a-therapist"
              className="gold-btn inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-xl transition-all text-sm uppercase tracking-wider"
            >
              Browse All Practitioners <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-aqua-50 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, num: "Verified", label: "Every practitioner\u2019s credentials are checked" },
              { icon: Users, num: "100+", label: "Qualified practitioners listed" },
              { icon: Star, num: "4.9", label: "Average practitioner rating" },
              { icon: CheckCircle, num: "Free", label: "Search and browse at no cost" },
            ].map((item) => (
              <div key={item.label}>
                <item.icon size={24} className="text-aqua mx-auto mb-3" />
                <div className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{item.num}</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practitioner CTA */}
      <section className="py-20 sm:py-24 bg-[#2A1E1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="gold-text font-semibold text-sm tracking-[0.2em] uppercase mb-3">For Practitioners</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-light)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Are you a somatic therapist?
          </h2>
          <p className="text-[var(--text-light)]/70 text-lg mb-8 leading-relaxed">
            Join Australia&apos;s first dedicated somatic therapy directory. Get found by people who are actively looking for what you offer &mdash; without managing your own SEO or marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/for-practitioners"
              className="gold-btn inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-xl transition-all uppercase tracking-wider"
            >
              List Your Practice <ArrowRight size={16} />
            </Link>
            <Link
              href="/for-practitioners#pricing"
              className="inline-flex items-center justify-center gap-2 border border-[var(--gold)]/30 text-[var(--gold-bright)] hover:bg-white/5 font-medium px-8 py-3 rounded-xl transition-colors"
            >
              See Listing Plans
            </Link>
          </div>
          <p className="text-white/30 text-xs mt-6">Free basic listing available. Premium plans from $29/month.</p>
        </div>
      </section>
    </>
  );
}
