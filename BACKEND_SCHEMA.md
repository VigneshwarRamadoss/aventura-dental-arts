# Backend Schema Document
## Aventura Dental Arts — Premium Dental Website
**Version**: 1.0  
**Author**: Senior Developer  
**Status**: Production-Ready  
**Last Updated**: 2026-05-19

---

## 1. Overview

The backend architecture is **predominantly headless CMS + serverless** in Phase 1. There is no traditional relational database for the marketing website. Content is managed in Sanity.io (document-based), and transactional data (form submissions) is handled via email (Resend) with no PHI persistence.

**Data stores in use:**
| Store | Type | Purpose |
|-------|------|---------|
| Sanity.io | Document DB (hosted) | All CMS content |
| Vercel KV | Redis (edge cache) | Review API cache, rate limiting |
| No SQL DB (Phase 1) | N/A | No patient data persisted |

---

## 2. Sanity CMS Content Schema

### 2.1 `post` — Blog Article

```typescript
// sanity/schemas/post.ts
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(80),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Oral Health',     value: 'oral-health' },
          { title: 'Cosmetic',        value: 'cosmetic' },
          { title: 'Patient Stories', value: 'patient-stories' },
          { title: 'News',            value: 'news' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },                                    // Rich text
        { type: 'image', options: { hotspot: true } },        // Inline images
        { name: 'callout', type: 'object',                    // Custom callout block
          fields: [
            { name: 'text', type: 'text' },
            { name: 'type', type: 'string',
              options: { list: ['tip', 'warning', 'info'] } },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle',       type: 'string', validation: Rule => Rule.max(60) },
        { name: 'metaDescription', type: 'text',   validation: Rule => Rule.max(155) },
        { name: 'ogImage',         type: 'image' },
        { name: 'noIndex',         type: 'boolean', initialValue: false },
      ],
    },
    {
      name: 'readingTimeMinutes',
      title: 'Reading Time (minutes)',
      type: 'number',
      readOnly: true,  // Computed from body word count
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' },
  },
  orderings: [
    { title: 'Published Date (newest)', name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
```

---

### 2.2 `service` — Dental Service Page

```typescript
// sanity/schemas/service.ts
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General Dentistry',      value: 'general' },
          { title: 'Cosmetic Dentistry',     value: 'cosmetic' },
          { title: 'Restorative Dentistry',  value: 'restorative' },
          { title: 'Emergency Dentistry',    value: 'emergency' },
          { title: 'Orthodontics',           value: 'orthodontics' },
          { title: 'Pediatric Dentistry',    value: 'pediatric' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description (card)',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required().max(120),
    },
    {
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',          // e.g. "tooth", "smile", "shield"
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', validation: Rule => Rule.required() }],
    },
    {
      name: 'body',
      title: 'Page Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'benefits',
      title: 'Benefits (badge cards)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', validation: Rule => Rule.required().max(30) },
          { name: 'icon',  type: 'string' },
        ],
      }],
      validation: Rule => Rule.max(6),
    },
    {
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'stepNumber', type: 'number' },
          { name: 'title',      type: 'string', validation: Rule => Rule.required() },
          { name: 'description', type: 'text' },
        ],
      }],
    },
    {
      name: 'faq',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', validation: Rule => Rule.required() },
          { name: 'answer',   type: 'text',   validation: Rule => Rule.required() },
        ],
      }],
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: Rule => Rule.max(3),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle',       type: 'string' },
        { name: 'metaDescription', type: 'text' },
        { name: 'ogImage',         type: 'image' },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
```

---

### 2.3 `teamMember` — Doctor / Staff Profile

```typescript
// sanity/schemas/teamMember.ts
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: Rule => Rule.required(),
      // e.g. "Lead Dentist & Founder", "Dental Hygienist"
    },
    {
      name: 'type',
      title: 'Member Type',
      type: 'string',
      options: {
        list: [
          { title: 'Doctor / Dentist', value: 'doctor' },
          { title: 'Hygienist',        value: 'hygienist' },
          { title: 'Administrative',   value: 'admin' },
        ],
      },
    },
    {
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    },
    {
      name: 'bio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'shortBio',
      title: 'Short Bio (card)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200),
    },
    {
      name: 'credentials',
      title: 'Credentials / Degrees',
      type: 'array',
      of: [{ type: 'string' }],
      // e.g. ["DDS, University of Miami", "ADA Member"]
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'featured',
      title: 'Featured (homepage teaser)',
      type: 'boolean',
      initialValue: false,
    },
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }] },
  ],
}
```

---

### 2.4 `testimonial` — Patient Review

```typescript
// sanity/schemas/testimonial.ts
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'patientFirstName',
      title: 'Patient First Name',
      type: 'string',
      validation: Rule => Rule.required(),
      // Only first name + last initial for privacy
    },
    {
      name: 'patientLastInitial',
      title: 'Last Initial',
      type: 'string',
      validation: Rule => Rule.max(1),
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      validation: Rule => Rule.required().min(1).max(5),
    },
    {
      name: 'review',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required().max(500),
    },
    {
      name: 'serviceType',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'General',      value: 'general' },
          { title: 'Cosmetic',     value: 'cosmetic' },
          { title: 'Restorative',  value: 'restorative' },
          { title: 'Emergency',    value: 'emergency' },
          { title: 'Orthodontics', value: 'orthodontics' },
        ],
      },
    },
    {
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google',    value: 'google' },
          { title: 'Yelp',      value: 'yelp' },
          { title: 'In-Person', value: 'in-person' },
        ],
      },
      initialValue: 'google',
    },
    {
      name: 'featured',
      title: 'Featured (homepage)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'approvedAt',
      title: 'Approved Date',
      type: 'datetime',
    },
    {
      name: 'hipaaConsentConfirmed',
      title: 'HIPAA / Privacy Consent Confirmed',
      type: 'boolean',
      validation: Rule => Rule.required(),
      // Internal use only: confirms consent for display
    },
  ],
}
```

---

### 2.5 `galleryItem` — Before & After Image

```typescript
// sanity/schemas/galleryItem.ts
export default {
  name: 'galleryItem',
  title: 'Gallery Item (Before & After)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'treatmentType',
      title: 'Treatment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Veneers',     value: 'veneers' },
          { title: 'Whitening',   value: 'whitening' },
          { title: 'Invisalign',  value: 'invisalign' },
          { title: 'Implants',    value: 'implants' },
          { title: 'General',     value: 'general' },
          { title: 'Restorative', value: 'restorative' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', initialValue: 'Before treatment photo' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', initialValue: 'After treatment photo' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Treatment Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(200),
    },
    {
      name: 'consentDocumentId',
      title: 'Patient Consent Document ID',
      type: 'string',
      description: 'Internal reference to signed HIPAA release form (not stored here)',
      validation: Rule => Rule.required(),
      // Only an ID reference — actual consent stored offline / secure doc system
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Only publish when consent confirmed',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
    {
      name: 'featured',
      title: 'Featured (homepage teaser)',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
```

---

### 2.6 `siteSettings` — Global Settings (Singleton)

```typescript
// sanity/schemas/siteSettings.ts
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // Singleton: no create/delete
  fields: [
    { name: 'practiceName',  type: 'string' },
    { name: 'phone',         type: 'string' },
    { name: 'email',         type: 'string' },
    { name: 'address',       type: 'object', fields: [
        { name: 'street',  type: 'string' },
        { name: 'city',    type: 'string' },
        { name: 'state',   type: 'string' },
        { name: 'zip',     type: 'string' },
        { name: 'country', type: 'string', initialValue: 'US' },
    ]},
    { name: 'hours',         type: 'array', of: [{
      type: 'object', fields: [
        { name: 'day',   type: 'string' },
        { name: 'open',  type: 'string' },
        { name: 'close', type: 'string' },
        { name: 'closed',type: 'boolean', initialValue: false },
      ],
    }]},
    { name: 'socialLinks',   type: 'object', fields: [
        { name: 'instagram', type: 'url' },
        { name: 'facebook',  type: 'url' },
        { name: 'google',    type: 'url' },
        { name: 'yelp',      type: 'url' },
    ]},
    { name: 'logo',          type: 'image' },
    { name: 'logoAlt',       type: 'image', description: 'Light background variant' },
    { name: 'defaultOgImage', type: 'image' },
    { name: 'googlePlaceId', type: 'string', description: 'For Reviews API' },
    { name: 'acuitySchedulingUrl', type: 'url' },
    { name: 'announcementBanner', type: 'object', fields: [
        { name: 'active',  type: 'boolean', initialValue: false },
        { name: 'message', type: 'string' },
        { name: 'link',    type: 'url' },
    ]},
  ],
}
```

---

## 3. Sanity GROQ Queries

### Fetch all published service pages
```groq
*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  category,
  shortDescription,
  icon,
  "heroImageUrl": heroImage.asset->url,
  featured,
  order
}
```

### Fetch single service by slug
```groq
*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  heroImage { asset->{url}, alt },
  body,
  benefits,
  process,
  faq,
  relatedServices[]-> { title, slug, shortDescription, icon },
  seo
}
```

### Fetch blog posts (paginated)
```groq
*[_type == "post" && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [$start...$end] {
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  readingTimeMinutes,
  "mainImageUrl": mainImage.asset->url,
  mainImage { alt },
  author->{ name, role, "photoUrl": photo.asset->url }
}
```

### Fetch featured testimonials (homepage)
```groq
*[_type == "testimonial" && featured == true && hipaaConsentConfirmed == true]
  | order(_createdAt desc)[0...6] {
  _id,
  patientFirstName,
  patientLastInitial,
  rating,
  review,
  serviceType,
  source
}
```

### Fetch gallery items by treatment type
```groq
*[_type == "galleryItem" && published == true
  && ($treatmentType == "all" || treatmentType == $treatmentType)]
  | order(order asc) {
  _id,
  treatmentType,
  description,
  "beforeUrl": beforeImage.asset->url,
  "afterUrl": afterImage.asset->url,
  beforeImage { alt },
  afterImage { alt },
  featured
}
```

---

## 4. API Route Data Contracts

### `POST /api/booking` — Request & Response

```typescript
// Request body (validated by Zod)
interface BookingRequest {
  firstName:         string;   // required, 1–50 chars
  lastName:          string;   // required, 1–50 chars
  email:             string;   // required, valid email
  phone:             string;   // required, min 10 digits
  serviceInterest:   ServiceCategory;  // required, enum
  preferredDate:     string;   // required, ISO date string YYYY-MM-DD
  preferredTime:     'morning' | 'afternoon' | 'evening';  // required
  insuranceProvider?: string;  // optional, 0–100 chars
  message?:          string;   // optional, 0–500 chars
  hipaaConsent:      true;     // must be true
  recaptchaToken:    string;   // required, server-verified
}

// Success Response 200
interface BookingSuccess {
  success: true;
  confirmationId: string;  // UUID, e.g. "CONF-A1B2C3"
  message: string;         // "We'll confirm within 2 business hours."
}

// Error Response 400
interface BookingError {
  success: false;
  errors: Array<{
    field: string;
    message: string;
  }>;
}

// Server Response 500
interface ServerError {
  success: false;
  message: "An error occurred. Please call us at (XXX) XXX-XXXX.";
}
```

### `GET /api/reviews` — Response

```typescript
interface Review {
  id:          string;
  authorName:  string;    // First name + last initial only
  rating:      1 | 2 | 3 | 4 | 5;
  text:        string;    // Truncated to 300 chars if needed
  relativeTime: string;   // e.g. "2 months ago"
  source:      'google';
}

interface ReviewsResponse {
  aggregateRating: number;    // e.g. 4.9
  totalReviews:    number;    // e.g. 347
  reviews:         Review[];  // Top 6 reviews
  cachedAt:        string;    // ISO timestamp
  isFallback:      boolean;   // true if using static fallback
}
```

---

## 5. Email Templates Schema (Resend)

### Booking Confirmation (to patient)
```typescript
interface BookingConfirmationEmail {
  to:      string;         // patient email
  from:    "Aventura Dental Arts <appointments@aventuradentalarts.com>";
  subject: `Appointment Request Confirmed — ${string}`;  // string = date
  data: {
    patientFirstName:  string;
    confirmationId:    string;
    serviceInterest:   string;
    preferredDate:     string;   // formatted: "Monday, June 12, 2026"
    preferredTime:     string;   // "Morning (8am–12pm)"
    practicePhone:     string;
    practiceAddress:   string;
    newPatientFormUrl: string;   // Link to download forms
  };
}
```

### Booking Notification (to practice)
```typescript
interface PracticeNotificationEmail {
  to:      string;    // practice email (env var)
  from:    "Website Booking <noreply@aventuradentalarts.com>";
  subject: `New Booking Request — ${string} ${string}`;  // first + last
  data: {
    // Full form data (this email is internal, not patient-facing)
    firstName:          string;
    lastName:           string;
    email:              string;
    phone:              string;
    serviceInterest:    string;
    preferredDate:      string;
    preferredTime:      string;
    insuranceProvider?: string;
    message?:           string;
    confirmationId:     string;
    submittedAt:        string;   // ISO timestamp
    // NOTE: HIPAA — this email must be sent to a HIPAA-compliant email inbox
  };
}
```

---

## 6. Rate Limiting Schema (Vercel KV)

```typescript
// Key pattern: `rate:ip:{hashedIP}:{endpoint}`
// Value: JSON string

interface RateLimitRecord {
  count:     number;    // requests in current window
  resetAt:   number;    // Unix timestamp when window resets
}

// Limits:
//   /api/booking: 5 requests per 60 seconds per IP
//   /api/contact: 5 requests per 60 seconds per IP
//   /api/reviews: 100 requests per 3600 seconds (per app, not per IP)

// TTL: set KV key TTL to match window duration (60s or 3600s)
```

---

## 7. Google Reviews Cache (Vercel KV)

```typescript
// Key: "google:reviews:cache"
// TTL: 86400 seconds (24 hours)

interface ReviewsCacheEntry {
  data:      ReviewsResponse;
  cachedAt:  string;   // ISO timestamp
  expiresAt: string;   // ISO timestamp (cachedAt + 24h)
}

// Fallback file (public/data/reviews-fallback.json):
// Static JSON matching ReviewsResponse interface
// Updated manually or via scheduled CI job
// Used when: KV miss + Google API failure
```

---

## 8. Type Definitions (TypeScript)

```typescript
// types/index.ts

export type ServiceCategory =
  | 'general'
  | 'cosmetic'
  | 'restorative'
  | 'emergency'
  | 'orthodontics'
  | 'pediatric';

export type ReviewSource = 'google' | 'yelp' | 'in-person';

export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  asset: { url: string; _ref: string };
  alt?: string;
  hotspot?: { x: number; y: number };
}

export interface ServiceCard {
  _id:              string;
  title:            string;
  slug:             SanitySlug;
  category:         ServiceCategory;
  shortDescription: string;
  icon?:            string;
  heroImageUrl?:    string;
  featured:         boolean;
  order:            number;
}

export interface BlogPostCard {
  _id:                  string;
  title:                string;
  slug:                 SanitySlug;
  publishedAt:          string;
  category:             string;
  excerpt:              string;
  readingTimeMinutes?:  number;
  mainImageUrl?:        string;
  mainImage?:           { alt?: string };
  author?:              { name: string; role: string; photoUrl?: string };
}

export interface TeamMember {
  _id:          string;
  name:         string;
  slug:         SanitySlug;
  role:         string;
  type:         'doctor' | 'hygienist' | 'admin';
  photo?:       SanityImage;
  shortBio?:    string;
  credentials?: string[];
  specialties?: string[];
  featured:     boolean;
  order:        number;
}

export interface Testimonial {
  _id:               string;
  patientFirstName:  string;
  patientLastInitial?: string;
  rating:            1 | 2 | 3 | 4 | 5;
  review:            string;
  serviceType?:      ServiceCategory;
  source:            ReviewSource;
}

export interface GalleryItem {
  _id:            string;
  treatmentType:  ServiceCategory;
  description?:   string;
  beforeUrl:      string;
  afterUrl:       string;
  beforeImage?:   { alt: string };
  afterImage?:    { alt: string };
  featured:       boolean;
}
```

---

## 9. Environment Configuration Schema

```typescript
// lib/env.ts (validated at startup with Zod)
import { z } from 'zod';

const EnvSchema = z.object({
  // Public (NEXT_PUBLIC_)
  NEXT_PUBLIC_SITE_URL:              z.string().url(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID:     z.string().startsWith('G-'),
  NEXT_PUBLIC_GTM_ID:                z.string().startsWith('GTM-'),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:   z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY:    z.string().min(1),

  // Sanity
  SANITY_PROJECT_ID:                 z.string().min(1),
  SANITY_DATASET:                    z.enum(['production', 'staging']),
  SANITY_API_TOKEN:                  z.string().min(1),

  // Server-only
  GOOGLE_PLACES_API_KEY:             z.string().min(1),
  RESEND_API_KEY:                    z.string().startsWith('re_'),
  PRACTICE_EMAIL:                    z.string().email(),
  RECAPTCHA_SECRET_KEY:              z.string().min(1),
  KV_REST_API_URL:                   z.string().url(),
  KV_REST_API_TOKEN:                 z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
```
