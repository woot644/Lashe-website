"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, SlidersHorizontal, Star, X } from "lucide-react";
import { practitioners, experiences, type Practitioner } from "@/data/practitioners";

const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const sessionTypeOptions = ["in-person", "telehealth", "both"] as const;
const genderOptions = ["female", "male", "non-binary"] as const;
const availabilityOptions = ["accepting", "waitlist", "full"] as const;

const availabilityLabels: Record<string, string> = {
  accepting: "Accepting new clients",
  waitlist: "Waitlist",
  full: "Full",
};

const availabilityColours: Record<string, string> = {
  accepting: "bg-emerald-100 text-emerald-700",
  waitlist: "bg-amber-100 text-amber-700",
  full: "bg-red-100 text-red-700",
};

export default function FindATherapist() {
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedSessionType, setSelectedSessionType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"relevance" | "rating">("relevance");

  const filtered = useMemo(() => {
    let result = [...practitioners];

    if (locationQuery) {
      const q = locationQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.location.city.toLowerCase().includes(q) ||
          p.location.suburb.toLowerCase().includes(q) ||
          p.location.state.toLowerCase().includes(q) ||
          p.location.postcode.includes(q)
      );
    }

    if (selectedExperience) {
      result = result.filter((p) => p.helpsWithTags.includes(selectedExperience));
    }

    if (selectedState) {
      result = result.filter((p) => p.location.state === selectedState);
    }

    if (selectedSessionType) {
      result = result.filter(
        (p) => p.sessionTypes === selectedSessionType || p.sessionTypes === "both"
      );
    }

    if (selectedGender) {
      result = result.filter((p) => p.gender === selectedGender);
    }

    if (selectedAvailability) {
      result = result.filter((p) => p.availability === selectedAvailability);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => {
        const tierOrder = { featured: 0, premium: 1, free: 2 };
        return tierOrder[a.listingTier] - tierOrder[b.listingTier];
      });
    }

    return result;
  }, [locationQuery, selectedExperience, selectedState, selectedSessionType, selectedGender, selectedAvailability, sortBy]);

  const activeFilterCount = [selectedState, selectedSessionType, selectedGender, selectedAvailability].filter(Boolean).length;

  function clearFilters() {
    setLocationQuery("");
    setSelectedExperience("");
    setSelectedState("");
    setSelectedSessionType("");
    setSelectedGender("");
    setSelectedAvailability("");
  }

  return (
    <>
      {/* Header */}
      <section className="bg-sage-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Find a Somatic Therapist
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Browse verified practitioners across Australia. Search by location, what you are experiencing, or how you would like to meet.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Results */}
      <section className="py-8 sm:py-12 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, suburb, or postcode"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-sage transition-colors"
                />
              </div>
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-sage transition-colors appearance-none text-[var(--text-secondary)]"
                >
                  <option value="">What are you experiencing?</option>
                  {experiences.map((exp) => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  showFilters || activeFilterCount > 0
                    ? "bg-sage text-white border-sage"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-sage"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-white/20 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-[var(--border)] grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-sage"
                  >
                    <option value="">All states</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Session type</label>
                  <select
                    value={selectedSessionType}
                    onChange={(e) => setSelectedSessionType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-sage"
                  >
                    <option value="">Any</option>
                    {sessionTypeOptions.map((t) => (
                      <option key={t} value={t}>{t === "both" ? "In-person & Telehealth" : t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Practitioner gender</label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-sage"
                  >
                    <option value="">No preference</option>
                    {genderOptions.map((g) => (
                      <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Availability</label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-cream border border-[var(--border)] text-sm focus:outline-none focus:border-sage"
                  >
                    <option value="">Any</option>
                    {availabilityOptions.map((a) => (
                      <option key={a} value={a}>{availabilityLabels[a]}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "practitioner" : "practitioners"} found
              </p>
              {(locationQuery || selectedExperience || activeFilterCount > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-sage hover:text-sage-dark flex items-center gap-1"
                >
                  <X size={12} /> Clear all
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "relevance" | "rating")}
              className="text-sm border border-[var(--border)] rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-sage"
            >
              <option value="relevance">Sort by relevance</option>
              <option value="rating">Sort by rating</option>
            </select>
          </div>

          {/* Results Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PractitionerCard key={p.slug} practitioner={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                No practitioners found
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Try adjusting your search or removing some filters.
              </p>
              <button
                onClick={clearFilters}
                className="text-sm text-sage hover:text-sage-dark font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PractitionerCard({ practitioner: p }: { practitioner: Practitioner }) {
  return (
    <Link
      href={`/practitioners/${p.slug}`}
      className="bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="aspect-[3/1] bg-sage-50 relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center">
          <span className="text-xl font-semibold text-sage-dark" style={{ fontFamily: "var(--font-heading)" }}>
            {p.fullName.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        {p.listingTier === "featured" && (
          <span className="absolute top-3 right-3 bg-sage text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-sage-dark transition-colors">
            {p.fullName}
          </h3>
          {p.verified && (
            <span className="text-[10px] bg-sage-50 text-sage-dark font-medium px-1.5 py-0.5 rounded">
              Verified
            </span>
          )}
        </div>
        <p className="text-xs text-sage-dark mb-2">{p.credentials}</p>
        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-3">
          <MapPin size={12} />
          {p.location.suburb}, {p.location.city} {p.location.state}
        </div>

        <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">
          {p.aboutMe.split("\n")[0]}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.helpsWithTags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-sand-light text-[var(--text-secondary)] px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-medium text-[var(--text-primary)]">{p.rating}</span>
            <span className="text-xs text-[var(--text-muted)]">({p.reviewCount})</span>
          </div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${availabilityColours[p.availability]}`}>
            {availabilityLabels[p.availability]}
          </span>
        </div>
      </div>
    </Link>
  );
}
