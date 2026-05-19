# Web Flow Document
## Aventura Dental Arts — Premium Dental Website
**Version**: 1.0  
**Author**: Senior Product Manager / UX Lead  
**Status**: Production-Ready  
**Last Updated**: 2026-05-19

---

## 1. Site Architecture (Information Architecture)

```
aventuradentalarts.com/
│
├── /                           Homepage
│
├── /about                      About the Practice
│   └── /about#team             (anchor: Meet the Team)
│
├── /services                   Services Overview
│   ├── /services/general-dentistry
│   ├── /services/cosmetic-dentistry
│   ├── /services/restorative-dentistry
│   ├── /services/emergency-dentistry
│   ├── /services/orthodontics
│   └── /services/pediatric-dentistry
│
├── /gallery                    Before & After Gallery
│
├── /blog                       Education & Articles Hub
│   └── /blog/[slug]            Individual Blog Post
│
├── /patient-resources          Patient Resources Hub
│   ├── (anchor) #new-patient-forms
│   ├── (anchor) #insurance
│   └── (anchor) #faq
│
├── /contact                    Contact & Appointment
│
├── /privacy-policy             Legal
└── /terms-of-service           Legal
```

### Navigation Priority (Header)
1. Services (mega-menu dropdown)
2. About
3. Gallery
4. Blog
5. Patient Resources
6. **Book Appointment** (CTA — always visible)

---

## 2. User Journey Maps

### Journey 1: Cosmetic Patient (Primary Conversion Path)
```
AWARENESS
└─ Google search: "veneers dentist [city]" or "teeth whitening near me"
   └─ Lands on: /services/cosmetic-dentistry  (SEO landing page)
      ↓
CONSIDERATION
└─ Reads service page → scrolls through before/after images
   └─ Clicks internal link: "View All Results" → /gallery
      └─ Reads 2–3 patient testimonials
         ↓
INTENT
└─ Scrolls to CTA section → clicks "Book a Consultation"
   └─ Lands on: /contact (or booking modal opens inline)
      └─ Fills appointment form (service: Cosmetic Consultation)
         ↓
CONVERSION ✓
└─ Receives confirmation email
   └─ Practice receives notification → calls to confirm
```

### Journey 2: Emergency Patient (Speed Path)
```
CRISIS
└─ Google search: "emergency dentist [city]" or direct URL
   └─ Lands on: Homepage or /services/emergency-dentistry
      ↓
IMMEDIATE NEED
└─ Sees prominent phone number in header (sticky)
   └─ Taps phone number → calls directly (< 30 seconds from landing)
      OR
   └─ Sees "Emergency? Call Now" banner → taps CTA
```

### Journey 3: New Family Patient (Discovery Path)
```
AWARENESS
└─ Google search: "family dentist [city]" or word-of-mouth → direct URL
   └─ Lands on: Homepage
      ↓
EXPLORATION
└─ Reads hero → scrolls → sees trust badges + rating
   └─ Navigates to /about → reads doctor bios
      └─ Navigates to /services (general + pediatric)
         └─ Navigates to /patient-resources → downloads new patient forms
            ↓
BOOKING
└─ Returns to homepage or /contact
   └─ Books appointment for family
```

---

## 3. Page-by-Page Flow

### 3.1 Homepage Flow

```
┌─────────────────────────────────────┐
│  NAVIGATION (Sticky)                │
│  Logo | Services | About | Blog...  │
│                    [Book Appointment]│
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  HERO SECTION                       │
│  Large headline (276px serif)       │
│  Sub-headline (14px InterTight)     │
│  [Book Appointment]  [Our Services] │
│  Practice hero photography          │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  TRUST STRIP                        │
│  ★4.9 Google  |  15+ Yrs  |  ADA  │
│  [500+ Reviews]  [Certified]        │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  SERVICES OVERVIEW                  │
│  "Our Expertise" headline           │
│  4–6 service cards (icon + name)   │
│  [View All Services →]             │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  ABOUT TEASER                       │
│  Split layout: Text | Photography   │
│  Dr. name + brief philosophy quote  │
│  [Meet Our Team →]                 │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  BEFORE & AFTER TEASER              │
│  3 selected transformations         │
│  [View Full Gallery →]             │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  TESTIMONIALS                       │
│  3 rotating Google reviews          │
│  Star rating + patient name         │
│  [Read All Reviews ↗]              │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  BOOKING CTA SECTION                │
│  "Ready for Your Best Smile?"       │
│  [Book Appointment]                 │
│  Or call: (XXX) XXX-XXXX           │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  BLOG PREVIEW                       │
│  "From Our Blog" (3 latest posts)   │
│  [View All Articles →]             │
└─────────────────────────────────────┘
↓
┌─────────────────────────────────────┐
│  FOOTER                             │
│  Logo | Nav | Hours | Social        │
│  Address | Phone | Privacy          │
└─────────────────────────────────────┘
```

---

### 3.2 Service Page Flow (Template for all 6 services)

```
Hero Banner
  └─ Service name (Display heading) + 1-line description
     └─ [Book Consultation CTA]
↓
What Is [Service]?
  └─ 2–3 paragraph explanation (SEO body copy)
↓
Benefits
  └─ 4–6 circular badge cards (icon + benefit name)
↓
Our Process (Step-by-step)
  └─ Numbered steps (consultation → treatment → aftercare)
↓
Before & After (if applicable)
  └─ 3–6 filtered gallery images for this service
  └─ [View Full Gallery]
↓
FAQ Accordion
  └─ 5–8 service-specific questions
↓
Related Services
  └─ 2–3 cards linking to related service pages
↓
Booking CTA Section
  └─ [Book a [Service] Consultation]
```

---

### 3.3 Appointment Booking Flow (Form UX)

```
Step 1: Entry Points
├─ Header CTA button → opens /contact or booking modal
├─ Hero CTA → same
├─ Service page CTA → pre-fills "Service Interest" field
└─ Emergency banner → same + phone number prominent

Step 2: Form Interaction
├─ User fills fields (progressive validation on blur)
├─ Required fields marked; inline error messages
├─ Preferred date: calendar picker
├─ Preferred time: dropdown (Morning / Afternoon / Evening)
├─ HIPAA consent checkbox (required)
└─ reCAPTCHA v3 (invisible, fires on submit)

Step 3: Submission
├─ Loading state: button spins, form dims
├─ Server Action validates with Zod
│   ├─ Error: inline field-level messages appear; form stays open
│   └─ Success: 
│       ├─ Patient receives: confirmation email with details
│       ├─ Practice receives: notification with patient info
│       └─ UI shows: success message "We'll confirm within 2 hours"

Step 4: Post-Booking
└─ Success state shows:
    ├─ Green checkmark animation
    ├─ "Thank you [First Name]! We'll be in touch shortly."
    ├─ Next steps guidance
    └─ [Download New Patient Forms]
```

---

### 3.4 Before & After Gallery Flow

```
Gallery Page Entry
└─ Filter bar: All | Veneers | Whitening | Invisalign | Implants | General
   └─ Filtered grid: Masonry or 3-col grid
      └─ User clicks image
         └─ Lightbox opens
            ├─ Before image | After image (toggle or split)
            ├─ Treatment label + brief description
            ├─ Navigation: ← prev | next →
            └─ [Close] or click outside
               └─ [Book a Consultation] CTA below gallery
```

---

### 3.5 Blog Flow

```
/blog  →  Post List
├─ Category filter tabs
├─ 6-per-page grid of post cards
│   └─ Post card: thumbnail + category tag + title + excerpt + date + read time
│       └─ Click → /blog/[slug]
└─ Pagination (or infinite scroll)

/blog/[slug]  →  Post Detail
├─ Breadcrumb: Home > Blog > Post Title
├─ Hero image + title + author + date + read time
├─ Article body (MDX-rendered with design tokens)
├─ Table of Contents (sticky sidebar on desktop)
├─ Related Posts (3 cards, same category)
├─ Author bio card
└─ CTA: "Have Questions? Book a Consultation"
```

---

## 4. Navigation Flows

### Desktop Navigation
```
[Logo]  Services ▾  About  Gallery  Blog  Patient Resources      [Book Appointment]

Services Mega-Menu (hover):
┌─────────────────────────────────────────┐
│ General Dentistry   | Cosmetic Dentistry │
│ Restorative         | Emergency          │
│ Orthodontics        | Pediatric          │
└─────────────────────────────────────────┘
```

### Mobile Navigation
```
[Logo]                               [☰ Menu]

On menu tap:
┌─────────────────────────────────────────┐
│                    [✕]                  │
│                                         │
│           Services                      │
│           About                         │
│           Gallery                       │
│           Blog                          │
│           Patient Resources             │
│           Contact                       │
│                                         │
│         [Book Appointment]              │
│                                         │
│  (555) 555-5555    ★★★★★ 4.9          │
└─────────────────────────────────────────┘
```

---

## 5. Error & Edge Case Flows

### 404 Page
```
[Navigation remains]
↓
Custom 404 Design
├─ Large "404" in bronze accent
├─ "Page Not Found" heading
├─ "The page you're looking for doesn't exist."
├─ [← Back to Home]
└─ Quick links: Services | About | Contact
```

### Form Submission Failure
```
Server error (5xx):
└─ Inline message: "Something went wrong. Please call us at (XXX) XXX-XXXX or try again."
   └─ Form data preserved (no data loss)
   └─ Retry button visible

Validation error (4xx):
└─ Field-level inline errors in red (#FF3C3C)
└─ Form scrolls to first error
└─ Submit button re-enables after correction
```

### Slow Connection / Offline
```
next/image shows low-quality blur placeholder while loading
Skeleton loaders for reviews and dynamic content
Service Worker (optional Phase 2): offline page with practice phone number
```

---

## 6. Conversion Touchpoints Summary

| Page | Primary CTA | Secondary CTA |
|------|-------------|---------------|
| Homepage | Book Appointment | View Services |
| Service Page | Book Consultation | View Gallery |
| About | Book Appointment | Read Reviews |
| Gallery | Book Consultation | View Service |
| Blog Post | Book Appointment | Read More Articles |
| Patient Resources | Book Appointment | Download Forms |
| Contact | Submit Form | Call Now |
| 404 | Back to Home | Book Appointment |

---

## 7. Analytics Event Tracking Map

| Event Name | Trigger | Parameters |
|-----------|---------|------------|
| `cta_click` | Any CTA button click | `{location, page, cta_text}` |
| `form_start` | User focuses first form field | `{form_name, page}` |
| `form_submit` | Form submission attempt | `{form_name, service_interest}` |
| `form_success` | Server confirms success | `{form_name}` |
| `form_error` | Validation or server error | `{form_name, error_type}` |
| `phone_click` | Phone number tap/click | `{page, location}` |
| `gallery_open` | Lightbox opens | `{treatment_type, image_index}` |
| `review_scroll` | User scrolls through reviews | `{page}` |
| `blog_read` | User scrolls > 50% of post | `{post_slug, category}` |
| `service_page_view` | Service page loaded | `{service_name}` |
| `download_form` | Patient form PDF downloaded | `{form_name}` |

---

## 8. SEO Flow (Internal Linking Strategy)

```
Homepage (PageRank hub)
├─ Links to: all Service pages, About, Gallery, Blog
│
Services Overview
├─ Links to: all 6 individual service pages
│
Each Service Page
├─ Links to: 2–3 related services
├─ Links to: Gallery (filtered by that service)
├─ Links to: Contact/Booking
│
Blog Posts
├─ Links to: relevant service pages (contextual links)
├─ Links to: Patient Resources
├─ Links to: Contact
│
Gallery
├─ Links to: Service pages by treatment type
│
Patient Resources
├─ Links to: Contact
└─ Links to: Service pages
```

---

## 9. Accessibility Flow

Every user interaction has a keyboard-navigable equivalent:

| Interaction | Mouse | Keyboard |
|------------|-------|----------|
| Open mobile menu | Click hamburger | Enter/Space on button |
| Close mobile menu | Click X | Escape key |
| Open gallery lightbox | Click image | Enter on focused image |
| Close lightbox | Click overlay | Escape key |
| Navigate gallery | Click arrows | Arrow keys |
| Open FAQ accordion | Click item | Enter/Space on focused item |
| Form submission | Click submit | Enter in last field |
| Dropdown navigation | Hover | Arrow keys + Enter |

Focus trap active in: mobile menu, gallery lightbox, booking modal.
