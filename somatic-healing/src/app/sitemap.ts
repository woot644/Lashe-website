import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { practitioners as staticPractitioners } from "@/data/practitioners";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://somatic-healing.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/find-a-therapist`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about-somatic-healing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/for-practitioners`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  // Location pages
  const locationPages: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Practitioner profiles (static seed data — will be augmented by DB in future)
  let practitionerSlugs = staticPractitioners.map((p) => p.slug);

  // Try to fetch from Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/practitioners?select=slug&published=eq.true`,
        {
          headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
          next: { revalidate: 300 },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const dbSlugs = (data as { slug: string }[]).map((r) => r.slug);
        practitionerSlugs = [...new Set([...dbSlugs, ...practitionerSlugs])];
      }
    } catch {
      // Fall back to static data
    }
  }

  const practitionerPages: MetadataRoute.Sitemap = practitionerSlugs.map(
    (slug) => ({
      url: `${baseUrl}/practitioners/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  return [...staticPages, ...locationPages, ...practitionerPages];
}
