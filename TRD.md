# Technical Requirements Document (TRD)
## Aventura Dental Arts — Premium Dental Website
**Version**: 1.0  
**Author**: Senior Web Developer  
**Status**: Production-Ready  
**Last Updated**: 2026-05-19

---

## 1. Technology Stack

### Frontend
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | **Next.js 14** (App Router) | SSG/SSR hybrid, file-based routing, ISR for blog, excellent SEO out of box |
| Language | **TypeScript 5.x** | Type safety, maintainability, IDE support |
| Styling | **Tailwind CSS 3.x** + CSS Variables | Utility-first; design system tokens map directly to Tailwind config |
| Animations | **Framer Motion 11** | Performant declarative animations for hero, scroll reveals |
| Font Loading | **next/font** (self-hosted) | Zero CLS, GDPR-safe, no external font requests |
| Icons | **Lucide React** | Tree-shakeable, consistent SVG icons |
| Forms | **React Hook Form** + **Zod** | Performant, schema-validated, accessible forms |
| Image Optimization | **next/image** | Automatic WebP/AVIF, lazy loading, size optimization |
| CMS Client | **@sanity/client** | Type-safe Sanity CMS queries |

### Backend / Services
| Service | Technology | Purpose |
|---------|------------|---------|
| CMS | **Sanity.io** (Hosted) | Content management for blog, services, team, testimonials |
| Form Handling | **Server Actions** (Next.js) + **Resend** | HIPAA-aware server-side processing, transactional email |
| Analytics | **Google Analytics 4** via GTM | Pageviews, events, conversion tracking |
| Tag Manager | **Google Tag Manager** | Centralized tag management |
| Reviews | **Google Places API** | Live review aggregation (cached 24h) |
| Maps | **Google Maps Embed API** | Static embed for contact page |
| Scheduling | **Acuity Scheduling** (optional embed) | Real-time appointment availability |
| Search | **Algolia DocSearch** (Phase 2) | Blog/content search |

### Infrastructure & DevOps
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Hosting | **Vercel** | Zero-config Next.js deployment, edge network, preview deploys |
| CDN | Vercel Edge Network | Global asset delivery |
| Domain & DNS | **Cloudflare** | DNS, DDoS protection, SSL termination |
| CI/CD | **GitHub Actions** | Lint → Test → Build → Deploy pipeline |
| Repository | **GitHub** (private) | Version control, PR-based workflow |
| Error Monitoring | **Sentry** | Frontend and serverless error tracking |
| Uptime Monitoring | **Better Uptime** | Alerting on downtime |
| Environment Secrets | **Vercel Environment Variables** | API keys, never in source |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT (Browser)                   │
│         Next.js App (React Server Components)        │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS
┌───────────────────────▼─────────────────────────────┐
│               VERCEL EDGE NETWORK                    │
│    Static Assets (CDN) │ Server Functions (Serverless)│
└────────┬──────────────────────────────┬─────────────┘
         │                              │
┌────────▼──────────┐    ┌─────────────▼──────────────┐
│   Sanity Studio   │    │   Server Actions / API      │
│  (Hosted CMS)     │    │   Routes (Next.js)          │
│  Blog, Services,  │    │   - /api/contact            │
│  Team, Reviews    │    │   - /api/booking            │
└───────────────────┘    │   - /api/reviews            │
                         └──────────────┬──────────────┘
                                        │
                    ┌───────────────────┼────────────────┐
                    │                   │                │
          ┌─────────▼──┐   ┌───────────▼──┐  ┌─────────▼───┐
          │   Resend    │   │ Google Places │  │  Acuity /   │
          │  (Email)    │   │    API        │  │  Calendly   │
          └────────────┘   └──────────────┘  └─────────────┘
```

### Rendering Strategy
| Page | Strategy | Rationale |
|------|----------|-----------|
| Homepage | **SSG** + ISR (24h) | Rarely changes; fast delivery |
| Service Pages | **SSG** at build | Static, SEO-critical |
| Blog List | **SSG** + ISR (1h) | New posts regenerate |
| Blog Post | **SSG** + ISR (1h) | Per-post generation |
| About | **SSG** | Rarely changes |
| Contact | **SSG** (form is client-side) | Mostly static shell |
| Gallery | **SSG** + ISR (12h) | Image-heavy; cached |
| Patient Resources | **SSG** | PDF links; static |

---

## 3. Repository Structure

```
aventura-dental/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group: marketing pages
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx          # Services overview
│   │   │   └── [slug]/page.tsx   # Individual service
│   │   ├── gallery/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── patient-resources/page.tsx
│   │   └── contact/page.tsx
│   ├── api/                      # API routes
│   │   ├── contact/route.ts
│   │   ├── booking/route.ts
│   │   └── reviews/route.ts
│   ├── layout.tsx                # Root layout (fonts, GTM, metadata)
│   ├── globals.css               # CSS variables, base styles
│   └── sitemap.ts                # Dynamic sitemap generation
├── components/
│   ├── ui/                       # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Typography.tsx
│   ├── sections/                 # Page section components
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Testimonials.tsx
│   │   ├── BeforeAfter.tsx
│   │   ├── TrustBadges.tsx
│   │   └── BookingCTA.tsx
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   └── forms/
│       ├── AppointmentForm.tsx
│       └── ContactForm.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── types.ts
│   ├── google/
│   │   └── reviews.ts
│   ├── email/
│   │   └── templates.ts
│   └── utils.ts
├── sanity/                       # Sanity Studio (embedded)
│   ├── schemas/
│   │   ├── post.ts
│   │   ├── service.ts
│   │   ├── teamMember.ts
│   │   ├── testimonial.ts
│   │   └── galleryItem.ts
│   └── sanity.config.ts
├── public/
│   ├── fonts/                    # Self-hosted InstrumentSerif + InterTight
│   ├── images/
│   └── favicon/
├── styles/
│   └── design-tokens.css         # CSS custom properties (full design system)
├── types/
│   └── index.ts
├── middleware.ts                  # Security headers, redirects
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 4. Design System Implementation (Tokens)

### `tailwind.config.ts`
```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Primary Backgrounds
        'charcoal':       '#14151D',
        'near-black':     '#101013',
        // Accents
        'bronze':         '#B38C61',
        // Interactive
        'btn-surface':    '#EAE8E8',
        'error':          '#FF3C3C',
        // Neutrals
        'dark-gray':      '#424346',
        'medium-gray':    '#474B55',
        'light-beige':    '#EAE8E8',
        'lighter-beige':  '#E9E7E7',
        'warm-gray':      '#6F6968',
        'light-gray':     '#D6D1D0',
        'off-white':      '#DAD5D3',
        // Surfaces
        'card-warm':      '#DAD5D3',
        'border-light':   '#EAE8E8',
      },
      fontFamily: {
        serif:  ['InstrumentSerif', 'Georgia', 'serif'],
        sans:   ['InterTight', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        form:   ['Arial', 'sans-serif'],
      },
      fontSize: {
        'display-xl':  ['276px', { lineHeight: '231.84px' }],
        'display-lg':  ['153px', { lineHeight: '122.4px' }],
        'display-md':  ['83px',  { lineHeight: '77.19px' }],
        'heading':     ['16px',  { lineHeight: '16px' }],
        'body-sm':     ['14px',  { lineHeight: '15.82px' }],
        'form-text':   ['13.33px', { lineHeight: 'normal' }],
      },
      borderRadius: {
        'pill':    '64px',
        'circle':  '50%',
        'modal':   '40px 40px 0px 0px',
      },
      spacing: {
        '18': '72px',
        '11': '44px',
      },
      maxWidth: {
        'site': '1200px',
      },
      boxShadow: {
        'card':    '0px 4px 12px rgba(0, 0, 0, 0.4)',
        'overlay': '0px 8px 24px rgba(0, 0, 0, 0.6)',
      },
    },
  },
}
```

---

## 5. Component Specifications

### 5.1 Navigation Component
```typescript
// Behavior
- Fixed position on scroll (top: 0, z-index: 50)
- Background transitions: transparent → rgba(20,21,29,0.95) on scroll > 80px
- Backdrop blur: blur(12px) on scroll
- Logo: SVG, max-height 40px
- Links: InstrumentSerif 16px, #EAE8E8, hover → #FFFFFF + underline
- CTA Button: pill shape (64px radius), #EAE8E8 bg, #FFFFFF text
- Mobile: hamburger (3 lines) at < 1024px breakpoint
- Mobile menu: full-screen overlay, #14151D bg, centered links
```

### 5.2 Hero Section
```typescript
// Layout
- Full viewport height (100svh)
- Background: #14151D or full-bleed practice photography with dark overlay
- Headline: InstrumentSerif, 276px desktop / 153px tablet / 83px mobile
- Subheadline: InterTight 14px, #EAE8E8, max-width 600px
- CTAs: Primary (Book Now) + Secondary (View Services)
- Bronze accent line (#B38C61) as decorative separator
- Subtle scroll indicator (arrow or line animation)
- Entry animation: fade-up via Framer Motion (staggered children)
```

### 5.3 Appointment Form
```typescript
// Fields
interface AppointmentFormData {
  firstName: string;         // required
  lastName: string;          // required
  email: string;             // required, email format
  phone: string;             // required, E.164 format
  serviceInterest: string;   // required, select
  preferredDate: string;     // required, date picker
  preferredTime: string;     // required, select (AM/PM slots)
  insuranceProvider?: string; // optional
  message?: string;          // optional, textarea max 500 chars
  consent: boolean;          // required, HIPAA consent checkbox
}

// Validation: Zod schema
// Submission: Server Action → Resend API → practice email
// Success: In-place success message (no redirect)
// HIPAA: No PHI stored in database; email only
```

---

## 6. API Routes Specification

### POST `/api/contact`
```typescript
Request Body: {
  name: string;
  email: string;
  phone: string;
  message: string;
}
Response 200: { success: true, message: "Email sent" }
Response 400: { success: false, errors: ZodError[] }
Response 500: { success: false, message: "Server error" }
Side effects: Send email via Resend to practice inbox
Rate limit: 5 req/min per IP (via Vercel middleware)
```

### POST `/api/booking`
```typescript
Request Body: AppointmentFormData (see section 5.3)
Response 200: { success: true, confirmationId: string }
Response 400: { success: false, errors: ZodError[] }
Side effects:
  1. Send confirmation email to patient (Resend)
  2. Send notification email to practice (Resend)
  3. (Optional) Create booking in Acuity via API
HIPAA: Log only: timestamp, confirmationId. Never log PHI.
```

### GET `/api/reviews`
```typescript
Response 200: {
  rating: number;       // aggregate (e.g., 4.9)
  total: number;        // total review count
  reviews: Review[];    // top 5-10 reviews
}
Cache: Vercel KV or in-memory, TTL 24 hours
Fallback: Static JSON file if Google API unavailable
```

---

## 7. SEO Technical Requirements

### Meta Tags (per page)
```typescript
// next/metadata API
export const metadata: Metadata = {
  title: 'Page Title | Aventura Dental Arts',
  description: '155-char unique description',
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://aventuradentalarts.com/page',
    siteName: 'Aventura Dental Arts',
    images: [{ url: '/og/page-og.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', ... },
  alternates: { canonical: 'https://aventuradentalarts.com/page' },
  robots: { index: true, follow: true },
}
```

### Schema.org Markup
```json
// LocalBusiness + Dentist (homepage)
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Dentist"],
  "name": "Aventura Dental Arts",
  "url": "https://aventuradentalarts.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", ... },
  "openingHoursSpecification": [...],
  "aggregateRating": { "@type": "AggregateRating", ... },
  "priceRange": "$$$$"
}
```

### Sitemap (`/sitemap.xml`)
- Auto-generated via `app/sitemap.ts`
- Includes: all static pages + dynamic service pages + blog posts
- Priority: Homepage 1.0, Services 0.9, Blog 0.7, Others 0.5

---

## 8. Security Requirements

### HTTP Security Headers (middleware.ts)
```typescript
const headers = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://cdn.sanity.io https://maps.googleapis.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://api.resend.com",
    "frame-src https://www.google.com https://acuityscheduling.com",
  ].join('; ')
}
```

### Form Security
- CSRF protection via Next.js Server Actions (built-in origin check).
- Honeypot field on all forms (bot detection).
- Rate limiting: 5 submissions/min per IP.
- Input sanitization via Zod before any processing.
- reCAPTCHA v3 on booking form.

### HIPAA Compliance Checklist
- [ ] HTTPS enforced (HSTS)
- [ ] PHI never logged to analytics or error monitoring
- [ ] Form submissions encrypted in transit (TLS 1.3)
- [ ] Resend (email provider) has HIPAA BAA available — execute before launch
- [ ] No PHI stored in database in Phase 1
- [ ] Privacy Policy updated to reflect data handling
- [ ] BAA executed with Vercel (Enterprise tier if required)

---

## 9. Performance Budget

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | ≥ 90 | Chrome DevTools / CI |
| LCP | < 2.5s | Web Vitals |
| CLS | < 0.1 | Web Vitals |
| INP | < 200ms | Web Vitals |
| Total Page Weight (Homepage) | < 500KB | Bundleanalyzer |
| JS Bundle (initial) | < 150KB gzip | next build output |
| Hero Image | < 200KB (WebP) | imagemin |
| Time to First Byte | < 200ms | Vercel Analytics |
| Font files total | < 80KB | woff2 subset |

### Performance Strategies
- `next/image` for all images (automatic format + sizing).
- `next/font` for self-hosted fonts (eliminates FOUT).
- Dynamic imports for heavy components (Gallery lightbox, Map).
- Partial prerendering (Next.js 14 PPR) for instant shell.
- Vercel Edge caching for ISR pages.
- CSS: Tailwind purge removes unused classes; critical CSS extracted.

---

## 10. Environment Variables

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=https://aventuradentalarts.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...

SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_TOKEN=...          # Read-only token for frontend

GOOGLE_PLACES_API_KEY=...     # Server-side only
RESEND_API_KEY=...            # Server-side only
PRACTICE_EMAIL=appointments@aventuradentalarts.com
RECAPTCHA_SECRET_KEY=...      # Server-side only

ACUITY_USER_ID=...            # Optional Phase 2
ACUITY_API_KEY=...            # Optional Phase 2
```

---

## 11. Testing Requirements

| Test Type | Tool | Coverage Target |
|-----------|------|----------------|
| Unit Tests | **Vitest** | Core utilities, form validation |
| Component Tests | **React Testing Library** | All UI components |
| E2E Tests | **Playwright** | Booking flow, navigation, mobile |
| Accessibility | **axe-core** (via Playwright) | All pages WCAG AA |
| Performance | **Lighthouse CI** (GitHub Actions) | On every PR |
| Visual Regression | **Chromatic** (optional) | Design system components |

### Critical E2E Test Scenarios
1. User completes full appointment booking form → receives confirmation.
2. Mobile hamburger menu opens/closes → all links accessible.
3. Before/After gallery lightbox opens → keyboard navigable.
4. Blog post page renders → schema markup valid.
5. 404 page displays → navigates back to homepage.

---

## 12. CI/CD Pipeline

```yaml
# GitHub Actions: .github/workflows/deploy.yml
Triggers: push to main, PR to main

Jobs:
  1. lint:         ESLint + TypeScript check
  2. test:         Vitest unit/component tests
  3. build:        next build (validates no type errors)
  4. lighthouse:   Lighthouse CI (blocks if score < 85)
  5. e2e:          Playwright tests (on staging preview URL)
  6. deploy:       Vercel deploy (preview on PR, production on main merge)
  7. notify:       Slack notification on success/failure
```

---

## 13. Launch Checklist

### Pre-Launch
- [ ] All Lighthouse scores ≥ 90 on production build
- [ ] Google Analytics firing correctly (GA4 Debugger verified)
- [ ] Google Search Console property verified
- [ ] XML sitemap submitted to Google Search Console
- [ ] robots.txt reviewed and correct
- [ ] All forms tested end-to-end (email received by practice)
- [ ] HIPAA BAA executed with all data processors
- [ ] Privacy Policy and Terms of Service pages live
- [ ] SSL certificate active (HTTPS on all pages)
- [ ] 301 redirects from old URLs (if applicable)
- [ ] Schema markup validated (Google Rich Results Test)
- [ ] Mobile usability tested on real devices (iOS + Android)
- [ ] Cross-browser testing complete
- [ ] 404 page custom-designed and functional
- [ ] Favicon set (all sizes: 16, 32, 180, 192, 512)

### Post-Launch (Week 1)
- [ ] Monitor Core Web Vitals in Google Search Console
- [ ] Monitor Sentry for JavaScript errors
- [ ] Verify GA4 real-time data flowing
- [ ] Check all form submissions routing correctly
- [ ] Confirm Google review widget rendering
