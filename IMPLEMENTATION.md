# Implementation Plan
## Aventura Dental Arts — Premium Dental Website
**Version**: 1.0  
**Author**: Senior Developer / PM  
**Status**: Production-Ready  
**Last Updated**: 2026-05-19  
**Timeline**: 10 Weeks (MVP)

---

## 1. Project Timeline Overview

```
Week 01  ████  Project Setup, Design System, Infrastructure
Week 02  ████  CMS Setup, Sanity Schemas, Data Seeding
Week 03  ████  Core Components (Nav, Footer, Design System UI)
Week 04  ████  Homepage + Hero Section
Week 05  ████  Service Pages (all 6)
Week 06  ████  About, Gallery, Patient Resources
Week 07  ████  Blog System (List + Post)
Week 08  ████  Contact / Booking Form, Email Integration
Week 09  ████  SEO, Analytics, Performance Optimization
Week 10  ████  QA, Accessibility Audit, Launch Prep
```

---

## 2. Phase 0 — Pre-Development (Before Week 1)

### Client Requirements
- [ ] Sign-off on PRD and TRD documents
- [ ] Provide: Logo (SVG), brand photography (20+ images)
- [ ] Provide: Doctor bios, credentials, headshots
- [ ] Provide: Before & After photos (with HIPAA consent forms)
- [ ] Provide: Office hours, address, phone, email
- [ ] Provide: Insurance partners list
- [ ] Grant access: Google Business Profile, domain DNS, existing analytics
- [ ] Execute HIPAA BAA with: Vercel (or hosting), Resend (email), form handling

### Dev Team Setup
- [ ] Create GitHub repo (private): `aventura-dental`
- [ ] Set up Vercel project, connect to GitHub
- [ ] Purchase/configure domain on Cloudflare (or client's registrar)
- [ ] Create Sanity.io project (free tier → upgrade if needed)
- [ ] Set up Google Workspace or confirm HIPAA-compliant email at practice
- [ ] Set up Resend account, verify sending domain
- [ ] Set up Google Analytics 4 property + Tag Manager container
- [ ] Set up Sentry project for error monitoring

---

## 3. Week 1 — Project Setup & Infrastructure

### Day 1–2: Initialize Repository

```bash
# Bootstrap Next.js 14 App
npx create-next-app@14 aventura-dental \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd aventura-dental

# Core dependencies
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers
npm install @sanity/client @sanity/image-url next-sanity
npm install resend
npm install @vercel/kv
npm install sharp  # Image processing

# Dev dependencies
npm install -D @playwright/test vitest @testing-library/react @testing-library/user-event
npm install -D @axe-core/playwright
npm install -D prettier prettier-plugin-tailwindcss
```

### Day 2–3: Tailwind + Design System Tokens

```typescript
// tailwind.config.ts
// Implement full design token mapping per TRD §4
// Colors, typography, spacing, border-radius, box-shadow
```

```css
/* app/globals.css */
/* CSS custom properties for all design tokens */
:root {
  --color-charcoal:     #14151D;
  --color-near-black:   #101013;
  --color-bronze:       #B38C61;
  --color-light-beige:  #EAE8E8;
  --color-off-white:    #DAD5D3;
  --color-dark-gray:    #424346;
  --color-error:        #FF3C3C;
}
```

### Day 3–4: Font Setup (Self-hosted)

```typescript
// app/layout.tsx — next/font setup
import localFont from 'next/font/local';

const instrumentSerif = localFont({
  src: [
    { path: '../public/fonts/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/InstrumentSerif-Italic.woff2',  weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: true,
});

const interTight = localFont({
  src: [
    { path: '../public/fonts/InterTight-Medium.woff2',    weight: '500', style: 'normal' },
    { path: '../public/fonts/InterTight-Bold.woff2',      weight: '700', style: 'normal' },
  ],
  variable: '--font-inter-tight',
  display: 'swap',
});
```
> **Font sourcing**: Download InterTight from Google Fonts (OFL license). Download InstrumentSerif from Google Fonts (OFL license). Subset to Latin characters only using `pyftsubset` to reduce file size.

### Day 4–5: Security Middleware + Environment Setup

```typescript
// middleware.ts — Security headers + redirects
// .env.local — All environment variables per BACKEND_SCHEMA §9
// .env.example — Template (committed to repo)
// lib/env.ts — Zod-validated env schema
```

### Day 5: CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
# lint → typecheck → test → build → lighthouse-ci
# .github/workflows/deploy.yml  
# On merge to main: deploy to Vercel production
```

---

## 4. Week 2 — CMS Setup

### Sanity Studio Setup

```bash
# Initialize Sanity in project
npm install sanity @sanity/vision
# Configure sanity.config.ts with all schemas
```

### Schema Implementation Order
1. `siteSettings` (singleton) — global practice info
2. `teamMember` — needed by `post` as author reference
3. `service` — core content type
4. `post` — blog articles
5. `testimonial` — reviews
6. `galleryItem` — before/after

### Data Seeding Checklist
- [ ] Enter practice information in `siteSettings`
- [ ] Create all 6 service documents with copy + images
- [ ] Create team member profiles (doctor + staff)
- [ ] Import first 6 testimonials (with hipaaConsentConfirmed: true)
- [ ] Upload 6 gallery items (before/after) with consent IDs
- [ ] Write 6 initial blog posts

### Sanity Client Configuration

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity';
import { env } from '@/lib/env';

export const sanityClient = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset:   env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn:    process.env.NODE_ENV === 'production',
  token:     env.SANITY_API_TOKEN,  // Read-only
});
```

---

## 5. Week 3 — Core UI Component Library

Build in this order (bottom-up: primitives → compositions → layouts):

### 5.1 Primitive Components (`components/ui/`)

```typescript
// Button.tsx
// Props: variant ('primary'|'secondary'|'tertiary'), size, loading, disabled, children
// Implements all states per UI/UX brief §3.3

// Input.tsx
// Props: label, placeholder, error, type, required
// Implements bottom-border focus pattern

// Badge.tsx (Circular)
// Props: size (94|72), label, icon, children
// 94px circle, #DAD5D3 bg, 3px #EAE8E8 border

// Typography.tsx
// Components: Heading (h1-h4), Body, Label, Eyebrow
// Maps to design system sizes automatically

// Card.tsx
// Props: variant ('service'|'blog'|'testimonial'), padding, hover
```

### 5.2 Layout Components (`components/layout/`)

```typescript
// Navigation.tsx
// - Desktop: sticky header, transparent → blur on scroll
// - Mobile: hamburger + full-screen overlay
// - Reads siteSettings from Sanity for phone number
// - Active link detection via usePathname()

// MobileMenu.tsx
// - Full-screen overlay
// - Focus trap (use focus-trap-react)
// - Framer Motion slide-in animation
// - Escape key handler

// Footer.tsx
// - Light background (#DAD5D3)
// - 4-column desktop, 2-column tablet, 1-column mobile
// - Social links + legal links
```

### 5.3 Section Components (`components/sections/`)

```typescript
// TrustStrip.tsx
// - Google rating badge, years experience, ADA badge
// - Circular badge cards in a row

// BookingCTA.tsx
// - Reusable CTA section: heading + button + phone
// - Used on every page as a conversion section

// TestimonialsCarousel.tsx
// - Desktop: 3-up grid
// - Mobile: swipeable single card (Framer Motion drag)
// - Auto-rotates every 6 seconds

// SectionHeader.tsx
// - Eyebrow + heading + optional subheading
// - Centered or left-aligned variant
// - Includes optional bronze divider line
```

---

## 6. Week 4 — Homepage

### Section Implementation Order

```typescript
// app/(marketing)/page.tsx

// 1. Hero — Priority 1: largest performance impact
//    - Full-viewport, hero image with overlay
//    - next/image with priority={true} for LCP optimization
//    - Framer Motion staggered text entry
//    - Scroll indicator animation

// 2. TrustStrip — after hero
//    - Static data (pulled from siteSettings)
//    - Aggregate Google rating (from /api/reviews or static)

// 3. ServicesOverview
//    - Fetch: *[_type == "service" && featured == true] | order(order asc)
//    - 3-col card grid with service icons
//    - "View All Services" link

// 4. AboutTeaser
//    - Fetch: *[_type == "teamMember" && featured == true][0]
//    - Split layout: text left, photo right
//    - Doctor quote in InstrumentSerif

// 5. BeforeAfterTeaser
//    - Fetch: *[_type == "galleryItem" && featured == true][0...3]
//    - 3-card preview, hover overlay
//    - Link to /gallery

// 6. TestimonialsSection
//    - Fetch featured testimonials from Sanity
//    - Overlay with live Google aggregate from /api/reviews

// 7. BookingCTASection
//    - Full-width CTA with bronze tint background
//    - Prominent button + phone number

// 8. BlogPreview
//    - Fetch 3 latest posts from Sanity
//    - Card grid with category tags

// Scroll-trigger animations: all sections use IntersectionObserver
// via Framer Motion's whileInView
```

### Homepage Performance Notes
- Hero image: preload in `<head>` via `next/image priority`
- Trust strip: render server-side (no hydration cost)
- Testimonials: ISR (revalidate: 3600)
- Blog preview: ISR (revalidate: 3600)
- Above-fold content: critical CSS only

---

## 7. Week 5 — Service Pages

### Static Generation

```typescript
// app/(marketing)/services/[slug]/page.tsx

// generateStaticParams — build all service pages at build time
export async function generateStaticParams() {
  const services = await sanityClient.fetch(`*[_type == "service"] { "slug": slug.current }`);
  return services.map(s => ({ slug: s.slug }));
}

// generateMetadata — SEO per service
export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug);
  return {
    title: `${service.seo?.metaTitle || service.title} | Aventura Dental Arts`,
    description: service.seo?.metaDescription || service.shortDescription,
    // ... OG, Twitter, canonical
  };
}
```

### Service Page Sections
```
1. ServiceHero      — hero image + title + short description + CTA
2. WhatIsSection    — rich text body
3. BenefitsBadges   — circular badge cards (max 6)
4. ProcessSteps     — numbered steps, timeline-style
5. BeforeAfterBlock — filtered gallery (if cosmetic/restorative)
6. FAQAccordion     — animated expand/collapse per question
7. RelatedServices  — 2–3 service cards
8. BookingCTA       — reusable section
```

### FAQ Accordion Implementation
```typescript
// components/ui/Accordion.tsx
// - aria-expanded, aria-controls, role="button" on trigger
// - Framer Motion height animation (0 → auto)
// - Keyboard: Enter/Space to open, Escape to close
// - Only one open at a time (controlled state) OR all can open
```

---

## 8. Week 6 — About, Gallery, Patient Resources

### About Page
```typescript
// app/(marketing)/about/page.tsx
// Sections:
// 1. PageHero — "About Our Practice" + hero photo
// 2. OurStory — rich text, practice history
// 3. OurPhilosophy — pull quote in large InstrumentSerif
// 4. TeamGrid — fetch all team members, ordered
//    - Doctor cards: large, with full bio link
//    - Staff cards: compact
// 5. Credentials + Certifications badges
// 6. OfficePhotos — photo grid (practice interior)
// 7. BookingCTA
```

### Gallery Page
```typescript
// app/(marketing)/gallery/page.tsx
// 1. FilterBar — treatment type pills
//    - URL query param: /gallery?type=veneers
//    - useSearchParams() for client-side filtering
// 2. GalleryGrid — masonry or 3-col grid
//    - next/image with lazy loading
//    - Hover overlay with treatment label
// 3. Lightbox — portal-rendered modal
//    - Before/After toggle (CSS transition, no re-fetch)
//    - Keyboard navigation (arrow keys, Escape)
//    - Focus trap active
//    - aria-modal="true", role="dialog"
// 4. BookingCTA at bottom
```

### Patient Resources Page
```typescript
// app/(marketing)/patient-resources/page.tsx
// Sections:
// 1. NewPatientForms — PDF download cards (link to /public/forms/)
// 2. InsurancePartners — logo grid of accepted insurances
// 3. FAQ — full 15-question accordion
// 4. WhatToExpect — numbered steps for first visit
// 5. BookingCTA
```

---

## 9. Week 7 — Blog System

### Blog List Page
```typescript
// app/(marketing)/blog/page.tsx
// - Category filter tabs (URL-based: /blog?category=cosmetic)
// - 6-post grid, ISR 1h
// - Pagination: page param (/blog?page=2)
// - Search: (Phase 2 — Algolia)

// generateMetadata: Blog | Aventura Dental Arts
```

### Blog Post Page
```typescript
// app/(marketing)/blog/[slug]/page.tsx
// - generateStaticParams: all published posts
// - ISR: revalidate 3600

// Components:
// - BlogHero: cover image + title + meta
// - TableOfContents: extracted from body h2/h3 (sticky sidebar)
// - BlogBody: PortableText renderer with custom components
//   - Callout blocks → styled callout component
//   - Images → next/image with caption
//   - Links → styled with bronze underline
// - AuthorCard: photo + bio snippet
// - RelatedPosts: 3 cards, same category
// - BookingCTA: inline within post

// Schema: BlogPosting (schema.org) per post
// Reading progress: sticky top progress bar (CSS width animation)
```

### PortableText Component Map
```typescript
// lib/sanity/portableText.tsx
const components = {
  types: {
    image: ({ value }) => <BlogImage image={value} />,
    callout: ({ value }) => <Callout type={value.type} text={value.text} />,
  },
  marks: {
    link: ({ value, children }) => <a href={value.href} className="text-bronze underline">{children}</a>,
    strong: ({ children }) => <strong className="font-bold text-light-beige">{children}</strong>,
  },
  block: {
    h2: ({ children }) => <h2 className="font-serif text-3xl text-light-beige mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl text-light-beige mt-8 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="font-sans text-body-sm text-dark-gray mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-bronze pl-6 italic text-light-beige/80 my-8">{children}</blockquote>
    ),
  },
};
```

---

## 10. Week 8 — Forms & Email Integration

### Appointment Form (Server Action)

```typescript
// app/actions/booking.ts
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { env } from '@/lib/env';
import { checkRateLimit } from '@/lib/rateLimit';

const BookingSchema = z.object({
  firstName:        z.string().min(1).max(50),
  lastName:         z.string().min(1).max(50),
  email:            z.string().email(),
  phone:            z.string().min(10).max(20),
  serviceInterest:  z.enum(['general','cosmetic','restorative','emergency','orthodontics','pediatric']),
  preferredDate:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime:    z.enum(['morning', 'afternoon', 'evening']),
  insuranceProvider: z.string().max(100).optional(),
  message:          z.string().max(500).optional(),
  hipaaConsent:     z.literal(true),
  recaptchaToken:   z.string().min(1),
});

export async function submitBooking(formData: FormData) {
  // 1. Rate limit check
  const ip = headers().get('x-forwarded-for') ?? 'unknown';
  const limited = await checkRateLimit(`booking:${ip}`, 5, 60);
  if (limited) return { success: false, message: 'Too many requests. Please try again later.' };

  // 2. Parse + validate
  const raw = Object.fromEntries(formData);
  const result = BookingSchema.safeParse({ ...raw, hipaaConsent: raw.hipaaConsent === 'true' });
  if (!result.success) return { success: false, errors: result.error.errors };

  // 3. Verify reCAPTCHA
  const captchaValid = await verifyRecaptcha(result.data.recaptchaToken);
  if (!captchaValid) return { success: false, message: 'Captcha verification failed.' };

  // 4. Generate confirmation ID
  const confirmationId = `CONF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  // 5. Send emails (non-blocking — don't await both)
  const resend = new Resend(env.RESEND_API_KEY);
  await Promise.all([
    resend.emails.send(buildPatientEmail(result.data, confirmationId)),
    resend.emails.send(buildPracticeEmail(result.data, confirmationId)),
  ]);

  // 6. Return success (NO PHI logged)
  return { success: true, confirmationId, message: "We'll confirm within 2 business hours." };
}
```

### Form Component
```typescript
// components/forms/AppointmentForm.tsx
// - React Hook Form with Zod resolver
// - Progressive field validation (on blur)
// - Loading state on submit (button spinner)
// - Success state: animated checkmark + message
// - Error state: field-level inline errors
// - Service interest pre-fill: ?service=cosmetic URL param
// - Scroll to first error on submit
// - HIPAA consent checkbox with link to privacy policy
```

---

## 11. Week 9 — SEO & Performance

### SEO Implementation

```typescript
// 1. Root metadata (app/layout.tsx)
//    - Default title template: "%s | Aventura Dental Arts"
//    - Default OG image
//    - Twitter card config
//    - robots: index + follow

// 2. Per-page metadata (generateMetadata in each page.tsx)

// 3. JSON-LD Schema (app/(marketing)/page.tsx)
//    - LocalBusiness + Dentist schema
//    - AggregateRating from Google reviews

// 4. Dynamic sitemap (app/sitemap.ts)
import { sanityClient } from '@/lib/sanity/client';

export default async function sitemap() {
  const services = await sanityClient.fetch(`*[_type == "service"] { "slug": slug.current }`);
  const posts    = await sanityClient.fetch(`*[_type == "post"]    { "slug": slug.current, publishedAt }`);

  const staticPages = ['', '/about', '/services', '/gallery', '/blog', '/patient-resources', '/contact'];
  
  return [
    ...staticPages.map(path => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
      lastModified: new Date(),
      priority: path === '' ? 1 : 0.8,
    })),
    ...services.map(s => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      priority: 0.9,
    })),
    ...posts.map(p => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      priority: 0.7,
    })),
  ];
}

// 5. robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/studio/'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

### Performance Optimization Checklist
- [ ] `next/image` on every `<img>` tag — format + sizing automatic
- [ ] `priority={true}` on hero image (above fold)
- [ ] Font files subsetted to Latin charset only
- [ ] Dynamic imports for: Gallery Lightbox, Map embed, Testimonial carousel
- [ ] Bundle analyzer run: `ANALYZE=true next build`
- [ ] Remove unused Tailwind classes (purge configured)
- [ ] Vercel Analytics enabled for Web Vitals monitoring
- [ ] Lighthouse CI integrated in GitHub Actions (blocks merge if < 85)

### Google Analytics 4 Setup
```typescript
// components/Analytics.tsx
// GTM script injection in layout.tsx (after body open)
// GA4 custom events via dataLayer.push()
// Consent mode: default denied until user accepts (GDPR compliant)
// Event tracking: all events per WEBFLOW.md §7
```

---

## 12. Week 10 — QA, Accessibility & Launch

### QA Test Plan

#### Functional Testing
- [ ] All 8 page types render without errors
- [ ] Service page generation: all 6 slugs resolve
- [ ] Blog post generation: all posts resolve
- [ ] Appointment form: valid submission → email received by practice AND patient
- [ ] Appointment form: invalid data → correct field errors shown
- [ ] Gallery filter: all treatment types filter correctly
- [ ] Lightbox: opens, closes, keyboard navigation works
- [ ] Mobile menu: opens, closes, all links work
- [ ] 404 page: custom page renders for unknown URLs
- [ ] Sitemap.xml: accessible and valid
- [ ] robots.txt: accessible and correct

#### Playwright E2E Tests
```typescript
// tests/e2e/booking.spec.ts
test('complete booking form submission', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[name=firstName]', 'John');
  await page.fill('[name=lastName]', 'Smith');
  await page.fill('[name=email]', 'test@example.com');
  await page.fill('[name=phone]', '5551234567');
  await page.selectOption('[name=serviceInterest]', 'cosmetic');
  await page.fill('[name=preferredDate]', '2026-07-15');
  await page.selectOption('[name=preferredTime]', 'morning');
  await page.check('[name=hipaaConsent]');
  await page.click('button[type=submit]');
  await expect(page.locator('[data-testid=success-message]')).toBeVisible();
});

// tests/e2e/navigation.spec.ts
// tests/e2e/gallery.spec.ts
// tests/e2e/accessibility.spec.ts (axe-core)
```

#### Accessibility Audit (Pre-Launch)
- [ ] Run axe DevTools on every page type — zero critical violations
- [ ] Screen reader test: NVDA (Windows) + VoiceOver (macOS/iOS)
- [ ] Keyboard-only navigation: complete full booking flow
- [ ] Color contrast: verify all text pairs in browser DevTools
- [ ] Touch targets: verify all interactive elements ≥ 48×48px on mobile
- [ ] Focus indicators: visible on all interactive elements

#### Cross-Browser Testing
| Browser | Version | Test Status |
|---------|---------|-------------|
| Chrome | Latest | — |
| Firefox | Latest | — |
| Safari | Latest | — |
| Edge | Latest | — |
| iOS Safari | 15+ | — |
| Android Chrome | 100+ | — |

#### Device Testing
- [ ] iPhone SE (375px) — smallest supported viewport
- [ ] iPhone 14 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] MacBook Air (1280px)
- [ ] iMac / Desktop (1440px+)

#### Performance Validation
```bash
# Run Lighthouse on staging URL
npx lighthouse https://staging.aventuradentalarts.com \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless"

# Check: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95, Best Practices ≥ 90
```

---

## 13. Launch Procedure

### T-7 days: Staging Freeze
- All content entered in Sanity production
- Final design review with client
- Legal review: Privacy Policy, Terms of Service
- HIPAA compliance confirmation
- All Lighthouse scores verified ≥ 90

### T-3 days: DNS & Infrastructure
- Point domain to Vercel via Cloudflare DNS
- Verify SSL certificate active
- Set up www → non-www redirect (or vice versa, chosen canonical)
- Verify all environment variables set in Vercel production

### T-1 day: Final Checks
- Google Analytics real-time: verify data flowing
- Google Search Console: property verified, sitemap submitted
- Form test: submit real booking form → confirm emails received
- Schema validation: Google Rich Results Test on homepage + service page
- All 301 redirects from old URLs configured (if applicable)

### Launch Day
1. Announce to team: deploy to production (merge main → deploy)
2. Verify homepage loads correctly
3. Check Sentry: zero errors in first 30 minutes
4. Check GA4 real-time: visitors logging
5. Submit to Google Indexing API for faster crawl

### Post-Launch Week 1
- Monitor: Sentry, GA4, Vercel Analytics, Better Uptime
- Fix: any bugs reported
- Document: any content change requests
- Schedule: first content updates (blog post #7)

---

## 14. Maintenance & Handoff

### CMS Training (for Practice Staff)
Deliver a 1-hour recorded Loom tutorial covering:
1. How to write and publish a blog post in Sanity Studio
2. How to add a new testimonial
3. How to update office hours and contact information
4. How to publish a new before/after gallery item
5. How to view Sanity activity log / undo a change

### Ongoing Maintenance Tasks
| Task | Frequency | Owner |
|------|-----------|-------|
| Publish blog post | Bi-weekly | Practice / Agency |
| Update testimonials | Monthly | Practice staff |
| Add gallery items | As available | Practice staff |
| Review Google reviews import | Monthly | Dev |
| Dependency updates (`npm audit`) | Monthly | Dev |
| Lighthouse audit | Monthly | Dev |
| Backup Sanity dataset | Monthly | Dev |
| Renew SSL (auto via Vercel) | Annual | Automatic |
| Review HIPAA compliance | Annual | Legal |

### Handoff Deliverables
- [ ] GitHub repo access transferred to client (if requested)
- [ ] Vercel project transferred to client account
- [ ] Sanity Studio access: client admin user created
- [ ] Google Analytics: client granted Admin access
- [ ] Google Search Console: client granted Owner access
- [ ] All API keys rotated and stored in client's password manager
- [ ] Documentation: Loom videos + written CMS guide (PDF)
- [ ] Architecture diagram (from TRD) provided
- [ ] All PRD/TRD/Design Brief documents delivered

---

## 15. Cost Estimate Summary

| Item | Monthly | Annual |
|------|---------|--------|
| Vercel Pro | $20 | $240 |
| Sanity Growth (if needed) | $15 | $180 |
| Resend (Pro) | $20 | $240 |
| Cloudflare (Free tier) | $0 | $0 |
| Sentry (Team) | $26 | $312 |
| Better Uptime | $20 | $240 |
| Google Workspace (HIPAA email) | $12/user | ~$144 |
| Vercel KV (included in Pro) | $0 | $0 |
| **Total Infrastructure** | **~$113/mo** | **~$1,356/yr** |

**Development Cost (one-time, 10 weeks):**
- Solo senior dev: ~$25,000–$35,000
- Agency team: ~$40,000–$60,000
- Includes: design, dev, CMS setup, SEO, QA, launch support

---

## 16. Future Roadmap (Phase 2)

| Feature | Priority | Estimated Effort |
|---------|----------|-----------------|
| Patient portal login | High | 4 weeks |
| Online copay payment (Stripe) | High | 2 weeks |
| Live chat widget (Intercom/Crisp) | Medium | 1 week |
| Automated review request emails | Medium | 2 weeks |
| Multi-location support | Low | 6 weeks |
| Video testimonials | Low | 1 week |
| Blog search (Algolia) | Medium | 1 week |
| Appointment confirmation SMS | Medium | 2 weeks |
| EHR integration (Dentrix/Eaglesoft) | Low | 8+ weeks |
| Service worker / offline mode | Low | 1 week |
