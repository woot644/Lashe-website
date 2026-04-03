import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { locations } from "@/data/locations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Somatic Therapists by Location | Somatic Healing Australia",
  description:
    "Browse somatic therapists across Australia by city and region. Find verified body-based therapy practitioners in Sydney, Melbourne, Brisbane, Perth, Adelaide, and more.",
};

export default function LocationsIndex() {
  return (
    <>
      <section className="bg-primary-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Somatic Therapists Across Australia
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Find a qualified, verified somatic therapist near you. Browse by city or region.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-5 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-aqua" />
                  <span className="text-xs text-[var(--text-muted)]">{loc.state}</span>
                </div>
                <h2
                  className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {loc.city}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                  {loc.description.slice(0, 120)}...
                </p>
                <span className="text-xs text-aqua font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Find therapists <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
