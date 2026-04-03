import { createClient } from "@/lib/supabase-server";
import {
  practitioners as staticPractitioners,
  type Practitioner,
} from "@/data/practitioners";

// Normalise a Supabase row into the Practitioner shape used by components
function fromRow(row: Record<string, unknown>): Practitioner {
  return {
    slug: row.slug as string,
    fullName: row.full_name as string,
    credentials: row.credentials as string,
    practiceName: row.practice_name as string,
    photo: (row.photo_url as string) || null,
    location: {
      address: row.address as string,
      suburb: row.suburb as string,
      city: row.city as string,
      state: row.state as string,
      postcode: row.postcode as string,
      lat: (row.lat as number) || 0,
      lng: (row.lng as number) || 0,
    },
    aboutMe: row.about_me as string,
    modalities: (row.modalities as string[]) || [],
    helpsWithTags: (row.helps_with_tags as string[]) || [],
    sessionTypes: row.session_types as Practitioner["sessionTypes"],
    sessionLength: row.session_length as string,
    feeRange: {
      min: (row.fee_min as number) || 0,
      max: (row.fee_max as number) || 0,
    },
    bookingMethod: row.booking_method as "url" | "enquiry",
    bookingUrl: (row.booking_url as string) || undefined,
    qualifications: row.qualifications as string,
    whyIDoThisWork: row.why_i_do_this_work as string,
    professionalMemberships: (row.professional_memberships as string[]) || [],
    gender: row.gender as Practitioner["gender"],
    availability: row.availability as Practitioner["availability"],
    listingTier: row.listing_tier as Practitioner["listingTier"],
    verified: row.verified as boolean,
    rating: 0,
    reviewCount: 0,
    // Database-only fields
    id: row.id as string | undefined,
  };
}

/**
 * Fetch all published practitioners from Supabase.
 * Falls back to static data if Supabase is not configured.
 */
export async function getPractitioners(): Promise<Practitioner[]> {
  const supabase = await createClient();
  if (!supabase) return staticPractitioners;

  const { data, error } = await supabase
    .from("practitioners")
    .select("*")
    .eq("published", true)
    .order("listing_tier", { ascending: true }); // featured first

  if (error || !data || data.length === 0) return staticPractitioners;

  return data.map(fromRow);
}

/**
 * Fetch featured/premium practitioners for the homepage carousel.
 */
export async function getFeaturedPractitioners(
  limit = 4
): Promise<Practitioner[]> {
  const supabase = await createClient();
  if (!supabase) {
    return staticPractitioners
      .filter((p) => p.listingTier === "featured" || p.listingTier === "premium")
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from("practitioners")
    .select("*")
    .eq("published", true)
    .in("listing_tier", ["featured", "premium"])
    .order("listing_tier", { ascending: true })
    .limit(limit);

  if (error || !data || data.length === 0) {
    return staticPractitioners
      .filter((p) => p.listingTier === "featured" || p.listingTier === "premium")
      .slice(0, limit);
  }

  return data.map(fromRow);
}

/**
 * Fetch a single practitioner by slug.
 */
export async function getPractitionerBySlug(
  slug: string
): Promise<Practitioner | null> {
  const supabase = await createClient();
  if (!supabase) {
    return staticPractitioners.find((p) => p.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from("practitioners")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    // Fall back to static data
    return staticPractitioners.find((p) => p.slug === slug) || null;
  }

  // Track profile view
  supabase.rpc("increment_profile_views", { p_slug: slug }).then(() => {});

  return fromRow(data);
}

/**
 * Fetch all practitioner slugs for static generation.
 */
export async function getAllPractitionerSlugs(): Promise<string[]> {
  const supabase = await createClient();
  if (!supabase) {
    return staticPractitioners.map((p) => p.slug);
  }

  const { data } = await supabase
    .from("practitioners")
    .select("slug")
    .eq("published", true);

  if (!data || data.length === 0) {
    return staticPractitioners.map((p) => p.slug);
  }

  // Merge DB slugs with static slugs so demo profiles always work
  const dbSlugs = data.map((r) => r.slug);
  const staticSlugs = staticPractitioners.map((p) => p.slug);
  return [...new Set([...dbSlugs, ...staticSlugs])];
}

/**
 * Search/filter practitioners.
 */
export async function searchPractitioners(filters: {
  location?: string;
  experience?: string;
  state?: string;
  sessionType?: string;
  gender?: string;
  availability?: string;
}): Promise<Practitioner[]> {
  const supabase = await createClient();
  if (!supabase) {
    // Client-side filtering is handled in the search page component
    return staticPractitioners;
  }

  let query = supabase
    .from("practitioners")
    .select("*")
    .eq("published", true);

  if (filters.state) {
    query = query.eq("state", filters.state);
  }
  if (filters.sessionType && filters.sessionType !== "both") {
    query = query.or(`session_types.eq.${filters.sessionType},session_types.eq.both`);
  }
  if (filters.gender) {
    query = query.eq("gender", filters.gender);
  }
  if (filters.availability) {
    query = query.eq("availability", filters.availability);
  }
  if (filters.experience) {
    query = query.contains("helps_with_tags", [filters.experience]);
  }
  if (filters.location) {
    const loc = filters.location.toLowerCase();
    query = query.or(
      `city.ilike.%${loc}%,suburb.ilike.%${loc}%,state.ilike.%${loc}%,postcode.ilike.%${loc}%`
    );
  }

  const { data, error } = await query.order("listing_tier", { ascending: true });

  if (error || !data) return staticPractitioners;

  return data.map(fromRow);
}

/**
 * Get aggregate stats for the homepage trust section.
 */
export async function getDirectoryStats(): Promise<{
  practitionerCount: number;
  averageRating: number;
}> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      practitionerCount: staticPractitioners.length,
      averageRating: 4.9,
    };
  }

  const { count } = await supabase
    .from("practitioners")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  return {
    practitionerCount: count || staticPractitioners.length,
    averageRating: 4.9,
  };
}
