# Somatic Healing Australia — Build Plan

**Client:** Kate Engledow
**Builder:** Zac Engledow / Arclight Digital
**Platform:** Next.js (App Router) + Tailwind CSS, deployed on Vercel
**Date:** April 2026

---

## 1. Project Overview

**What:** Australia's first dedicated directory platform connecting people with qualified somatic therapists and body-based healing practitioners.

**Tagline:** *Find a therapist who works with your body, not just your mind.*

**Problem:** People who need somatic therapy can't find a therapist. Existing directories are cluttered, US-centric, or buried in clinical jargon.

**Target Audiences:**
- **Consumers (primary):** Adults 25-65 experiencing persistent tension, body-held anxiety, emotional disconnection, trauma responses, chronic stress. May not know the word "somatic."
- **Practitioners (secondary):** Qualified somatic therapists wanting visibility, profiles, and client referrals without managing their own SEO.

---

## 2. Brand Identity

### Tone
Warm, grounded, accessible, credible. Not clinical. Not alternative-wellness-woo. A knowledgeable friend who also happens to be a clinician.

### Colour Palette
| Role | Colour | Hex |
|------|--------|-----|
| Primary | Deep Clay | `#A0725B` |
| Secondary | Warm Stone | `#C4B5A0` |
| Accent | Soft Terracotta | `#C4785B` |
| Background | Off-White | `#FAF8F5` |
| Text | Warm Charcoal | `#3A3A38` |
| Light Surface | Sand | `#EDE8E0` |

### Typography
- **Headings:** Refined serif (e.g., Lora, Playfair Display) — warmth + credibility
- **Body:** Clean sans-serif (e.g., Inter, DM Sans) — readable, modern
- **Australian English throughout** — honour, practise, colour, organise, centre

### Language Rules
- Lead with experience, not diagnosis ("anxiety that lives in your chest" not "somatic symptom disorder")
- Use "you" language — speak directly to the reader
- Normalise without minimising
- Explain all clinical terms immediately
- **Avoid:** journey, transformation, holistic, wellness, mindfulness, energy healing, manifest, vibration, chakra, "hold space," "mind-body-spirit"
- **Use:** body, healing, release, held, stuck, tension, grounded, connected, safe, settled, restore, shift, ease, relief

---

## 3. Site Architecture — Pages to Build

### 3.1 Homepage (`/`)
- Hero section with tagline + one-liner ("Somatic therapy helps your body release what words alone cannot reach") + prominent search bar (location + experience-type filters)
- "How it works" — 3 steps: describe what you're experiencing → browse matched practitioners → book a session
- "What is somatic healing?" explainer for consumers (not clinicians)
- Common experiences section: "I feel stuck," "My body holds tension I can't explain," "Talk therapy helped my mind but not my body"
- Featured practitioners carousel (photo, name, location, specialisation)
- Trust indicators: number of listed practitioners, verification badge explanation, testimonials
- Practitioner CTA: "Are you a somatic therapist? Join the directory"
- Footer with links, contact, privacy policy, terms of use

### 3.2 Search & Results (`/search`)
Filters:
- Location (suburb, city, state, postcode + radius slider)
- What they're experiencing (plain-language options):
  - Anxiety that lives in my body
  - Tension and pain with no medical cause
  - Feeling disconnected or numb
  - Trauma responses
  - Chronic stress and burnout
  - Emotional overwhelm
  - Difficulty regulating emotions
  - Grief held in the body
- Session type: in-person / telehealth / both
- Practitioner gender preference
- Availability: accepting new clients / waitlist / full

Results display as cards: photo, name, credentials, location, brief description, star rating, "View Profile" button. Sortable by relevance, proximity, rating.

### 3.3 Practitioner Profile (`/practitioners/[slug]`)
- Professional photo
- Full name + credentials
- Practice name + location (with embedded map)
- "About me" narrative (first person, warm, accessible)
- Modalities and approaches (with plain-language explanations)
- "What I help with" — tagged to consumer experience categories
- Session types, length, fee range
- Booking method (external link/embed or contact/enquiry form)
- Qualifications, training, professional memberships
- Client reviews/testimonials (moderated)
- "Why I do this work" — optional personal statement

### 3.4 Educational Hub (`/learn`)
- `/learn/what-is-somatic-healing` — comprehensive, jargon-free explainer
- `/learn/somatic-vs-talk-therapy` — comparison page
- `/learn/what-happens-in-a-session` — demystifying the experience
- `/learn/is-somatic-therapy-right-for-me` — guided self-assessment or quiz
- `/learn/types-of-somatic-therapy` — SE, sensorimotor, TRE, body psychotherapy explained simply
- `/blog` — articles section for ongoing SEO content

### 3.5 For Practitioners (`/for-practitioners`)
- Benefits of listing (visibility, SEO, client referrals, professional community)
- Listing tier comparison: Free / Premium ($29-49/mo) / Featured ($79-99/mo)
- Verification and credentialing process
- Sign-up and onboarding flow
- Practitioner FAQ

### 3.6 About Us (`/about`)
Who is behind Somatic Healing Australia, why it exists, editorial and verification standards. Clinical and professional credibility without being a personal ad.

### 3.7 Contact (`/contact`)
Form with category selector: general enquiries, practitioner enquiries, media/partnership enquiries.

---

## 4. Technical Architecture

### Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Database:** To be decided (Supabase recommended for auth + postgres + storage)
- **Search/Geocoding:** Google Places API or similar for location search
- **Maps:** Google Maps embed or Mapbox for practitioner profiles
- **Payments:** Stripe for premium listing subscriptions
- **Email:** Resend or similar for transactional emails (enquiries, notifications)
- **Analytics:** Google Analytics 4 + Search Console

### Requirements
- Mobile-first responsive design (non-negotiable)
- Fast load times (under 3 seconds)
- HTTPS throughout (Vercel handles this)
- WCAG 2.1 AA accessibility compliance
- SEO-optimised with meta tags, schema markup, XML sitemap

---

## 5. Data Model (Practitioner Listing)

```
Practitioner {
  id
  slug
  fullName
  credentials
  practiceName
  photo (URL)
  location {
    address
    suburb
    city
    state
    postcode
    lat/lng (geocoded)
  }
  aboutMe (rich text, first person)
  modalities[] (taxonomy — SE, sensorimotor, TRE, body psychotherapy, etc.)
  helpsWithTags[] (consumer-friendly taxonomy)
  sessionTypes (in-person | telehealth | both)
  sessionLength
  feeRange { min, max }
  bookingMethod (url | enquiry-form)
  bookingUrl?
  qualifications (rich text)
  whyIDoThisWork (short text)
  professionalMemberships[]
  gender
  availability (accepting | waitlist | full)
  listingTier (free | premium | featured)
  verified (boolean)
  reviews[] { rating, text, author, date, approved }
  createdAt
  updatedAt
}
```

---

## 6. SEO Strategy

**Primary growth channel.** Every page optimised for search.

### Target Keywords
- "somatic therapist near me"
- "somatic therapist [city/suburb]"
- "somatic healing Australia"
- "body-based therapy"
- "somatic experiencing practitioner [location]"
- "trauma therapy that is not just talking"
- "therapist for anxiety in my body"

### Location Pages
Auto-generate location-based landing pages for all major Australian cities/regions:
- `/locations/sydney` — "Somatic Therapists in Sydney"
- `/locations/melbourne` — "Somatic Healing in Melbourne"
- `/locations/brisbane`, `/locations/perth`, `/locations/adelaide`, `/locations/hobart`, `/locations/canberra`, `/locations/darwin`, `/locations/gold-coast`, etc.

Each practitioner profile functions as a standalone SEO-optimised page. Blog content targets long-tail informational queries.

### Technical SEO
- Schema markup (LocalBusiness, MedicalBusiness, or HealthAndBeautyBusiness)
- XML sitemap (auto-generated)
- Canonical URLs
- Open Graph + Twitter meta tags
- Alt text on all images

---

## 7. Revenue Model

### Listing Tiers
| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | Name, location, credentials, short description. Lower search visibility. |
| **Premium** | $29-49/mo | Full profile, photo, "About me," booking integration, featured search placement, reviews, analytics, priority SEO. |
| **Featured** | $79-99/mo | All Premium + homepage carousel, top of search results in their area, social media promotion. |

### Future Revenue (post-launch)
- Booking commission (if integrated booking built)
- Sponsored content / CPD event promotion
- Affiliate partnerships (books, tools, courses)
- Branded workshops or online courses

---

## 8. Build Phases

### Phase 1 — Foundation & Core UI
- [ ] Project scaffolding (Next.js + Tailwind — already done)
- [ ] Design system: colours, typography, component library (buttons, cards, forms, nav)
- [ ] Layout: header, footer, nav structure
- [ ] Homepage — all sections (hero, search, how it works, explainer, featured carousel, trust, practitioner CTA)
- [ ] Mobile responsiveness from the start

### Phase 2 — Directory Core
- [ ] Practitioner data model and seed data (5-10 sample practitioners)
- [ ] Search & results page with all filters
- [ ] Practitioner profile page (full template)
- [ ] Location-based search with geocoding
- [ ] Map integration on profiles

### Phase 3 — Content Pages
- [ ] Educational hub: What is somatic healing, vs talk therapy, session expectations, types, quiz
- [ ] For Practitioners page with tier comparison and sign-up CTA
- [ ] About Us page
- [ ] Contact page with categorised form
- [ ] Blog infrastructure (if using MDX or CMS)

### Phase 4 — Backend & Auth (when ready for real practitioners)
- [ ] Database setup (Supabase or similar)
- [ ] Practitioner auth + self-service dashboard
- [ ] Admin dashboard for verification and moderation
- [ ] Stripe integration for premium/featured subscriptions
- [ ] Enquiry form per practitioner (email notifications)

### Phase 5 — SEO & Launch
- [ ] Location landing pages for all major Australian cities
- [ ] Schema markup + technical SEO audit
- [ ] Google Analytics 4 + Search Console
- [ ] Sitemap + robots.txt
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG 2.1 AA)

### Phase 6 — Growth (Ongoing)
- [ ] Blog content for long-tail SEO
- [ ] Practitioner outreach and directory seeding
- [ ] Social media profiles (Instagram, Facebook, LinkedIn)
- [ ] Client review system (moderated)
- [ ] Iterate based on analytics and feedback

---

## 9. Key Decisions (Confirm with Kate)

1. **Domain:** Is `somatichealingaustralia.com.au` available? Secure `.com` and `.com.au`.
2. **Pricing tiers:** Confirm Free / Premium ($29-49/mo) / Featured ($79-99/mo) or adjust.
3. **Booking integration:** Start with enquiry forms only, or integrate Cliniko/Halaxy/Calendly from launch?
4. **Client reviews:** Enable from launch (with moderation) or add later?
5. **Business structure:** Under Create Allied Health Services Pty Ltd or separate entity?
6. **Verification standards:** What minimum qualifications required for listing?
7. **Working arrangement:** Flat build fee + monthly retainer, or alternative?

---

## 10. Immediate Next Steps

1. Set up design system (colours, fonts, Tailwind config)
2. Build the homepage — hero, search bar, all sections
3. Create sample practitioner data
4. Build search results page
5. Build practitioner profile page
6. Deploy to Vercel for review

---

*Source: somatic-healing-australia-build-brief.pdf by Kate Engledow, April 2026*
