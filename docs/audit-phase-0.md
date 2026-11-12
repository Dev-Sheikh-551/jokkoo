# Jokkoo Codebase Audit Report (Phase 0)
**Date:** 2026-11-12  
**Target Platform:** Jokkoo — Skilled Services Marketplace for The Gambia  
**Audit Type:** Read-Only Static & Runtime Inspection  
**Auditor Status:** Read-Only Mode (No code refactored, no packages modified, no commits made)

---

## A. Executive Summary (10 Lines Max)
1. Jokkoo is in Phase 01: functional frontend with 7 static/prerendered routes, 0 API endpoints, and 0 backend connections.
2. The homepage has been restored to the Contemporary African Minimalism direction; all 6 Living Monograph components remain as orphaned dead code (1,082 lines).
3. The codebase passes `npm run build` (18 routes, 0 errors) and `npx tsc --noEmit` (0 errors); ESLint reports 0 errors and 19 unused-variable warnings.
4. `framer-motion` is removed from `package.json` and source; `motion` (`14.12.0`) is installed but completely unused (0 source imports).
5. No React Bits components exist in the repository; they were proposed but not copied or installed.
6. The data layer hard-codes 8 sample professionals with fabricated 5-star ratings, exact job completion counts, and unverified credentials.
7. The 9-category taxonomy is defined in `data/categories.ts`, but the homepage deliberately displays only 8 via `.slice(0, 8)`.
8. Tailwind v4 `@theme` tokens match the approved brand palette exactly; however, 180+ arbitrary Tailwind bracket values exist in components.
9. Mobile responsive views render without horizontal overflow, but `/explore` mobile filters lack focus trapping and form inputs lack accessible label `id` bindings.
10. `next/image` is used throughout with `unoptimized: true` fetching remote Unsplash images; no `.env` files or secrets are committed.

---

## B. Findings Grouped by Status & Severity

### 1. Working (Verified)
- **Static Page Generation:** All 18 static/prerendered routes compile with zero build errors (`npm run build`). [High Value]
- **TypeScript Type Safety:** `npx tsc --noEmit` reports 0 errors across all routes and components. [High Value]
- **Route Navigation:** Header and footer links between `/`, `/explore`, `/categories`, `/join`, `/login`, and `/register` function correctly. [Medium Value]
- **Filter and Search Synchronization:** `components/explore/ExploreClient.tsx` accurately filters sample professionals by text query, category, and coverage area, updating URL search params via `router.replace`. [High Value]
- **Dynamic Profile Pages:** `app/professionals/[slug]/page.tsx` properly renders each of the 8 sample professionals with customized metadata and static parameters. [Medium Value]
- **Direct WhatsApp Deep Linking:** `components/professionals/ContactActionCard.tsx` (lines 12–15) generates proper `wa.me` links with encoded Gambian inquiry text. [High Value]
- **Design Token Palette:** `app/globals.css` (lines 4–10) strictly implements Warm Bone (`#FBF9F5`), Sand Dune (`#EFE9DF`), Deep Slate (`#14171C`), River Silt (`#66615B`), and Laterite (`#B84724`). [High Value]
- **Visible Focus Indicator:** `app/globals.css` (lines 46–49) enforces `:focus-visible { outline: 2px solid #B84724; outline-offset: 2px; }`. [Medium Value]

### 2. Incomplete (Verified)
- **Forms Submission (join, login, register):**
  - `app/join/page.tsx` (line 53): Simulates submission via `setTimeout(800)` with no persistence or API call. [Medium Severity]
  - `app/login/page.tsx` (line 16): Simple `e.preventDefault()` toggling a preview message. No authentication backend. [Medium Severity]
  - `app/register/page.tsx` (line 19): Simple `e.preventDefault()` toggling a preview message. No SMS/OTP or user creation. [Medium Severity]
- **Omitted 9th Category on Homepage:** `components/home/PopularCategories.tsx` (line 7) calls `CATEGORIES.slice(0, 8)`, omitting "Cleaning & Commercial Janitorial" from the homepage without explanation to the user. [Low Severity]
- **Unspecified Font Optical Sizing:** `app/layout.tsx` (lines 12–18) loads `Newsreader` without specifying the `axes: ["opsz"]` parameter for editorial typography scaling. [Low Severity]
- **Unused Animation Library:** `package.json` (line 15) contains `"motion": "^14.12.0"`, but 0 components import it. [Low Severity]

### 3. Broken / Non-Compliant (Verified)
- **Form Label Accessibility:**
  - `app/join/page.tsx` (lines 98, 128, 150, 169, 188, 207, 226): Labels lack `htmlFor` attributes, and `<input>`, `<select>`, `<textarea>` elements lack `id` attributes. Screen readers cannot associate labels with controls. [High Severity - Accessibility]
  - `app/login/page.tsx` (lines 85, 103): Labels lack `htmlFor` and inputs lack `id`. [Medium Severity - Accessibility]
  - `app/register/page.tsx` (lines 62, 79, 95, 111, 143): Labels lack `htmlFor` and inputs lack `id`. [Medium Severity - Accessibility]
- **Mobile Filter Modal Behavior:** `components/explore/ExploreClient.tsx` (lines 160–165): The mobile filter interface is not a modal or drawer; it is an inline `<aside>` toggle. It does not trap focus, does not handle the Escape key, and does not restore focus to the trigger button when closed. [Medium Severity - Accessibility]
- **ContactActionCard Client Directive:** `components/professionals/ContactActionCard.tsx` (line 1) contains `"use client"` despite using 0 React hooks, state, or effects. [Low Severity]

### 4. Duplicated (Verified)
- **Orphaned Living Monograph Components:** 6 components from the rejected Living Monograph redesign remain in `components/home/`, totaling 1,082 lines of dead code not referenced by `app/page.tsx`:
  - `components/home/MonographHero.tsx` (198 lines) [High Severity]
  - `components/home/TactileSwatchReveal.tsx` (341 lines) [High Severity]
  - `components/home/EditorialChapters.tsx` (197 lines) [High Severity]
  - `components/home/ArtisanDossiers.tsx` (158 lines) [High Severity]
  - `components/home/ArchitecturalBlueprintHowItWorks.tsx` (97 lines) [High Severity]
  - `components/home/ArtisanManifestoJoin.tsx` (91 lines) [High Severity]
- **Search Logic Duplication:** Query parameter parsing and input redirection logic is duplicated between `components/home/SearchExperience.tsx` and `components/explore/ExploreClient.tsx`. [Low Severity]

### 5. Risky / Compliance Violations (Verified)
- **Fabricated Reviews & Ratings:**
  - `data/professionals.ts` (lines 90–115, 204–229, 310–325, 397–412, 469–484, 542–557, 614–629, 687–702): Hardcoded fabricated client review quotes (e.g., "Pa Ousman is a genuine master of his trade..."). [High Severity - Compliance]
  - `data/professionals.ts` (lines 11, 126, 240, 336, 423, 495, 568, 640): Fabricated decimal ratings (`4.95`, `4.98`, `4.92`, `4.88`, `4.90`, etc.). [High Severity - Compliance]
- **Fabricated Job Completion Counts:**
  - `data/professionals.ts` (lines 10, 125, 239, 335, 422, 494, 567, 639): Hardcoded `completedJobsCount` values (`142`, `88`, `64`, `115`, `92`, `74`, `128`, `53`). [High Severity - Compliance]
  - `components/professionals/ProfessionalCard.tsx` (line 85): Displays "{professional.completedJobsCount} Jobs completed". [High Severity - Compliance]
- **Fabricated Verification Credentials:**
  - `data/professionals.ts` (line 137): `verificationType: "Master Trade Guild Certification"`. No such guild certification exists or is performed. [High Severity - Compliance]
  - `types/professional.ts` (line 13): `verificationType` union includes `"Master Trade Guild Certification"`. [Medium Severity]
- **Missing Reduced-Motion Handling:** No `MotionConfig` or `useReducedMotion()` hooks exist in the codebase. When Motion animations are introduced, users with vestibular disorders will experience forced motion unless protected. [Medium Severity - Accessibility]

---

## C. Answers to Numbered Sections

### 1. Repo and Git
- **Current Branch:** `master` (Verified)
- **Uncommitted Changes:**
  - Modified: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `next.config.ts`, `package-lock.json`, `package.json` (Verified)
  - Untracked: `.agents/`, `.gemini/`, `app/categories/`, `app/explore/`, `app/join/`, `app/login/`, `app/professionals/`, `app/register/`, `components/`, `data/`, `docs/`, `lib/`, `types/` (Verified)
- **Last 10 Commits:** Only 1 commit in history: `180ac30 Initial commit from Create Next App` (Verified)
- **Node Version:** `v24.21.0` (Verified)
- **Package Manager:** `npm 11.11.0` (Verified)
- **Scripts in package.json:** `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, `"lint": "eslint"` (Verified)

### 2. Dependencies
- **Dependencies List & Versions:**
  - `@hookform/resolvers`: `^7.0.5`
  - `clsx`: `^2.1.1`
  - `lucide-react`: `^1.70.0`
  - `motion`: `^14.12.0`
  - `next`: `16.4.5`
  - `react`: `19.3.0`
  - `react-dom`: `19.3.0`
  - `react-hook-form`: `^7.91.0`
  - `tailwind-merge`: `^3.7.0`
  - `zod`: `^4.6.7`
  - devDependencies: `@tailwindcss/turbopack` (`^4`), `@types/node` (`^20`), `@types/react` (`^19`), `@types/react-dom` (`^19`), `eslint` (`^9`), `eslint-config-next` (`16.4.5`), `motion-ai` (`^14.2.0`), `tailwindcss` (`^4`), `typescript` (`^5`).
- **framer-motion Removal Status:**
  - In `package.json`: Fully removed (Verified).
  - In source imports: 0 imports across `app/`, `components/`, `lib/`, `data/`, `types/` (Verified).
  - In `package-lock.json`: Present strictly as a transitive dependency required internally by `motion 14.12.0` itself (`node_modules/motion` lists `"framer-motion": "14.12.0"` in its dependencies) (Verified).
- **motion Installation Status:** Installed in `package.json` (`^14.12.0`). Verified: 0 imports currently exist in source code. `motion/react` is not yet imported by any component (Verified).
- **React Bits Components:** Neither installed as an npm package nor copied into source files. 0 React Bits components exist in the repository (Verified).
- **Unused Dependencies:**
  - `motion`: installed in dependencies, but 0 imports in source.
  - `motion-ai`: installed in devDependencies, not utilized during build or runtime.
- **Motion AI Kit / MCP / Skill Files:**
  - Skill file exists at `.gemini/skills/motion/SKILL.md` (5,253 bytes) and `.agents/skills/motion/SKILL.md` (Verified).
  - Motion MCP server configured in `~/.gemini/config/mcp_config.json` targeting `https://mcp.motion.dev` via `mcp-remote` (Verified).

### 3. Routes
- **App Route Tree:**
  ```
  app/
  ├── layout.tsx
  ├── page.tsx (/)
  ├── favicon.ico
  ├── globals.css
  ├── categories/
  │   └── page.tsx (/categories)
  ├── explore/
  │   └── page.tsx (/explore)
  ├── join/
  │   └── page.tsx (/join)
  ├── login/
  │   └── page.tsx (/login)
  ├── professionals/
  │   └── [slug]/
  │       └── page.tsx (/professionals/[slug])
  └── register/
      └── page.tsx (/register)
  ```
- **Route Status & Interaction Behavior:**
  - `/` (Home): **Partial / Functional**. Submitting search pushes to `/explore?q=...&location=...`. Clicking category cards navigates to `/explore?category=...`. Clicking professional cards navigates to `/professionals/[slug]`. Clicking "List Your Business" navigates to `/join`.
  - `/explore`: **Complete Mock / Functional**. Filter controls update URL query parameters and filter 8 sample professionals in memory. Search input filters names, bios, and service titles. Clear filters button resets state. Professional cards navigate to individual profile.
  - `/categories`: **Complete / Functional Catalog**. Renders 9 category overview cards with service tag pills. Clicking a category navigates to `/explore?category=[slug]`.
  - `/professionals/[slug]`: **Complete Mock / Functional**. Pre-renders 8 sample profiles. "Chat on WhatsApp" button opens `https://wa.me/...` with pre-filled message. "Call" button triggers `tel:...`. Portfolio modal is not implemented (images are static grid). Reviews and location coverage render statically.
  - `/join`: **Partial / Mocked Form**. Full multi-step form with React Hook Form and Zod validation. On submit: simulates 800ms delay, transitions to static confirmation card. No network call, no data storage.
  - `/login`: **Placeholder Form**. State-controlled input form with client/pro tab switcher. On submit: `e.preventDefault()`, displays static "Authentication Milestone Preview" card. No network call, no authentication session.
  - `/register`: **Placeholder Form**. State-controlled input form for customer registration. On submit: `e.preventDefault()`, displays static "Registration Milestone Preview" card. No network call.
- **API Routes, Server Actions, Middleware:**
  - API Routes: **0** (`app/**/route.ts` does not exist).
  - Server Actions: **0** (`'use server'` does not exist in any file).
  - Middleware: **0** (`middleware.ts` does not exist).

### 4. Components
- **Component Inventory Table:**

| Component File Path | Line Count | Client Component (`"use client"`) | Status in Homepage |
|---|---|---|---|
| `components/common/Badge.tsx` | 45 | No (Server) | Used across app |
| `components/common/Button.tsx` | 85 | No (Server) | Used across app |
| `components/common/CategoryIcon.tsx` | 51 | No (Server) | Used across app |
| `components/common/Logo.tsx` | 52 | No (Server) | Used in Header/Footer |
| `components/explore/ExploreClient.tsx` | 353 | **Yes (Client)** | Active on `/explore` |
| `components/home/ArchitecturalBlueprintHowItWorks.tsx` | 97 | No (Server) | **Orphaned (Monograph)** |
| `components/home/ArtisanDossiers.tsx` | 158 | No (Server) | **Orphaned (Monograph)** |
| `components/home/ArtisanManifestoJoin.tsx` | 91 | No (Server) | **Orphaned (Monograph)** |
| `components/home/EditorialChapters.tsx` | 197 | No (Server) | **Orphaned (Monograph)** |
| `components/home/FeaturedProfessionals.tsx` | 44 | No (Server) | **Active on `/`** |
| `components/home/HeroSection.tsx` | 55 | No (Server) | **Active on `/`** |
| `components/home/HowItWorks.tsx` | 76 | No (Server) | **Active on `/`** |
| `components/home/JoinCtaSection.tsx` | 79 | No (Server) | **Active on `/`** |
| `components/home/MonographHero.tsx` | 198 | **Yes (Client)** | **Orphaned (Monograph)** |
| `components/home/PopularCategories.tsx` | 68 | No (Server) | **Active on `/`** |
| `components/home/SearchExperience.tsx` | 85 | **Yes (Client)** | **Active on `/` (inside Hero)** |
| `components/home/TactileSwatchReveal.tsx` | 341 | **Yes (Client)** | **Orphaned (Monograph)** |
| `components/layout/Footer.tsx` | 145 | No (Server) | Used across app |
| `components/layout/Header.tsx` | 143 | **Yes (Client)** | Used across app |
| `components/professionals/ContactActionCard.tsx` | 89 | **Yes (Client)** | Active on Profile |
| `components/professionals/LocationCoverageCard.tsx` | 57 | No (Server) | Active on Profile |
| `components/professionals/PortfolioGallery.tsx` | 66 | No (Server) | Active on Profile |
| `components/professionals/ProfessionalCard.tsx` | 125 | No (Server) | Used on `/` & `/explore` |
| `components/professionals/ProfileHeader.tsx` | 96 | No (Server) | Active on Profile |
| `components/professionals/ReviewSection.tsx` | 81 | No (Server) | Active on Profile |
| `components/professionals/ServicesList.tsx` | 53 | No (Server) | Active on Profile |

- **Specific Component Assessments:**
  - `HeroSection.tsx`: Restored functional hero. Renders the Wolof kicker, editorial Newsreader headline, `SearchExperience` client bar, and 3 reassurance proof points. Clean, non-distracting layout.
  - `PopularCategories.tsx`: Displays 8 category cards with icons, short descriptions, and pro count badges. Links to `/explore?category=...`.
  - `FeaturedProfessionals.tsx`: Slices the first 3 featured professionals from sample data and maps them into `ProfessionalCard` components.
  - `HowItWorks.tsx`: 3-column card grid explaining discovery, credential verification, and direct WhatsApp contact.
  - `JoinCtaSection.tsx`: Deep Slate banner targeting tradespeople. Includes verification standards list (National ID, declared operational base, free preview listing).
  - `Header.tsx`: Responsive navbar. Desktop view displays logo, two navigation links, sign-in, and Laterite CTA. Mobile view collapses into a hamburger menu with an animated accordion drawer.
  - `Footer.tsx`: Four-column sitemap with Gambia trade taxonomy, location directory, verification policy disclosure, and static `2026` copyright.
  - `ProfessionalCard.tsx`: Reusable card showing profile image, verification badge, sample badge, Dalasi hourly/base rates, and direct WhatsApp CTA.
- **Duplicated Components & Logic:**
  - 6 orphaned Living Monograph components remain in `components/home/` (1,082 lines of unused code).
  - Filter and redirect logic is duplicated between `SearchExperience.tsx` and `ExploreClient.tsx`.
- **Client vs. Server Component Count:**
  - In `components/`: 6 Client Components, 16 Server Components.
  - In `app/`: 3 Client Pages (`join`, `login`, `register`), 4 Server Pages (`/`, `/categories`, `/explore`, `/professionals/[slug]`).
  - **Candidates for Server Rendering:**
    - `ContactActionCard.tsx`: Marked `"use client"` unnecessarily. It contains no state, hooks, or event listeners. Removing the directive makes it a pure Server Component.
    - `app/login/page.tsx` and `app/register/page.tsx`: Currently marked `"use client"` solely for mock `useState` toggles. Once wired to Next.js Server Actions, they can be server components.

### 5. Data Layer
- **File Locations:**
  - Categories: `data/categories.ts` (9 categories) & `types/category.ts`.
  - Professionals: `data/professionals.ts` (8 sample professionals) & `types/professional.ts`.
  - Locations: `data/locations.ts` (13 Gambian districts/areas + "all").
  - Services: Embedded inside `data/professionals.ts` (`services` array per professional) and `data/categories.ts` (`exampleServices` array per category).
- **Single Source of Truth for Categories & Why Homepage Shows 8:**
  - `data/categories.ts` is the single source of truth and contains all 9 categories.
  - `components/home/PopularCategories.tsx` line 7 executes `CATEGORIES.slice(0, 8)`. This was hardcoded to fit an even 4-column × 2-row desktop grid, omitting the 9th category ("Cleaning & Commercial Janitorial").
- **Slug Generation and Usage:**
  - Slugs are hard-coded static strings on each data object (e.g., `modou-camara-solar-electrical`, `carpentry-woodwork`).
  - `app/professionals/[slug]/page.tsx` uses `generateStaticParams()` to extract all slugs from `SAMPLE_PROFESSIONALS` at build time. Dynamic lookup uses `SAMPLE_PROFESSIONALS.find(p => p.slug === slug)` or invokes `notFound()`.
- **Search for Fabricated Strings Across Entire Codebase:**
  - `"Certified"`:
    - `components/home/HeroSection.tsx:28`: "certified electricians"
    - `data/categories.ts:25`: "Certified residential wiring..."
    - `data/categories.ts:146`: "Bench-certified technicians..."
    - `data/professionals.ts:9`: profession: "Certified Master Electrician & Solar Engineer"
    - `data/professionals.ts:18`: bio: "...certified in high-capacity solar inverter systems."
  - `"Master"`:
    - `components/home/HeroSection.tsx:28`: "Find vetted master carpenters..."
    - `data/categories.ts:44`: "Master joiners and carpenters..."
    - `data/categories.ts:78`: "Celebrated Senegambian master tailors..."
    - `data/professionals.ts:9`: profession: "Certified Master Electrician & Solar Engineer"
    - `data/professionals.ts:124`: profession: "Master Joiner & Architectural Woodworker"
    - `data/professionals.ts:137`: verificationType: "Master Trade Guild Certification"
    - `data/professionals.ts:213`: comment: "Pa Ousman is a genuine master of his trade..."
    - `data/professionals.ts:238`: profession: "Haute Couture Master Tailor..."
    - `types/professional.ts:13`: union type includes `"Master Trade Guild Certification"`
    - (Also present in orphaned monograph files: `MonographHero.tsx:67,164,173`, `TactileSwatchReveal.tsx:121,185,302`, `EditorialChapters.tsx:26,106`, `ArtisanDossiers.tsx:17,20,31`, `ArtisanManifestoJoin.tsx:18,22`).
  - `"NAWEC"`:
    - `data/categories.ts:27`: "...specializing in NAWEC grid compliance..."
    - `data/categories.ts:35`: "NAWEC metre fault inspection"
    - `data/professionals.ts:17`: "...NAWEC compliance across Greater Banjul."
    - `data/professionals.ts:43`: "...automatically swaps between NAWEC grid power and private generator..."
    - (Also in orphaned files: `EditorialChapters.tsx:34`, `TactileSwatchReveal.tsx:100`).
  - `"jobs completed"` / `"Jobs completed"`:
    - `components/professionals/ProfessionalCard.tsx:85`: `{professional.completedJobsCount} Jobs completed`
  - `"reviews"`:
    - `app/layout.tsx:23`: "...authentic reviews, and verified credentials."
    - `components/home/HowItWorks.tsx:17`: "...authentic client reviews..."
    - `components/professionals/ProfessionalCard.tsx:67`: `{professional.reviewCount} reviews`
    - `components/professionals/ProfileHeader.tsx:73`: `({professional.reviewCount} verified reviews)`
    - `components/professionals/ReviewSection.tsx:21,36,41`: "Client Reviews & Ratings", "Based on {reviewCount} reviews"
    - `data/professionals.ts:90,204,310,397,469,542,614,687`: 8 arrays of fabricated reviews.
    - `app/join/page.tsx:252`: "...maintains transparent standards for customer reviews."
  - `"rating"`:
    - `app/professionals/[slug]/page.tsx:104`: `rating={professional.rating}`
    - `components/professionals/ProfessionalCard.tsx:59,64`: `{professional.rating.toFixed(2)}`
    - `components/professionals/ProfileHeader.tsx:72`: `{professional.rating.toFixed(2)}`
    - `components/professionals/ReviewSection.tsx:6,12,21,28,32,62`: Rating pills and star calculation.
    - `data/professionals.ts:11,97,107,126,211,221,240,317,336,404,423,476,495,549,568,621,640,694`: Hardcoded ratings.
    - `types/professional.ts:30,51`: `rating: number`.
  - `"verified professionals"`:
    - `app/categories/page.tsx:56`: `{category.professionalCount} verified professionals`
    - `app/join/page.tsx:252`: "...Jokkoo lists only verified professionals..."
    - `components/explore/ExploreClient.tsx:301`: `Showing {filteredProfessionals.length} verified professionals`
  - `"Milestone"`:
    - `app/join/page.tsx:54`: "// Milestone 1 development simulation"
    - `app/login/page.tsx:68`: "Authentication Milestone Preview"
    - `app/register/page.tsx:45`: "Registration Milestone Preview"
    - `components/common/Badge.tsx:40`: "This is demonstration data for development milestone review"
    - `components/explore/ExploreClient.tsx:138`: "Milestone 1 Development Sample Data"
    - `components/home/JoinCtaSection.tsx:71`: "Free during Milestone 1 Preview"
    - `components/layout/Footer.tsx:19`: "Milestone 1 Preview • Development Sample Data"
  - `"Sample"`:
    - `components/common/Badge.tsx:29,33,42`: `<SampleDataBadge />` ("Sample Data")
    - `components/explore/ExploreClient.tsx:6,59,138,250,254`: Sample data import and counter.
    - `components/professionals/ProfessionalCard.tsx:5,16,19`: `<SampleDataBadge />`
    - `components/professionals/ProfileHeader.tsx:4,47`: `<SampleDataBadge />`
    - `data/professionals.ts:3,117,231,327,414,486,559,631,704`: `isSampleData: true`
    - `types/professional.ts:69`: `isSampleData: true`
  - `"Zero Booking"`:
    - `components/layout/Footer.tsx:139`: "Zero Booking Commissions"
  - `"vetted"`:
    - `app/layout.tsx:23`: "Connect with vetted, independent artisans..."
    - `components/explore/ExploreClient.tsx:138`: "...represent vetted trade archetypes..."
    - `components/home/HeroSection.tsx:28`: "Find vetted master carpenters..."
    - `data/categories.ts:27`: "Vetted Gambian electricians..."
- **Photo Source Domains:**
  - All avatars, cover photos, and portfolio images come from remote HTTPS URLs on `images.unsplash.com`. 0 local images are stored in `public/`.

### 6. Styling and Design System
- **Tailwind v4 Setup:** Configured via `@import "tailwindcss";` and `@theme` in `app/globals.css`. Turbopack loader configured in `next.config.ts`.
- **Brand Palette Token Verification:**
  - Warm Bone: `#FBF9F5` (Exact Match)
  - Sand Dune: `#EFE9DF` (Exact Match)
  - Deep Slate: `#14171C` (Exact Match)
  - River Silt: `#66615B` (Exact Match)
  - Laterite: `#B84724` (Exact Match)
  - Complementary tokens: Laterite Dark (`#9C3A1C`), Laterite Light (`#F7EDE8`), Border Subtle (`#E5DFD5`), Card Raised (`#F3EFE7`).
- **Hard-Coded Hex vs. Token Usage:**
  - 12 hardcoded hex values in active TSX files:
    - `#1E7E34` and `#155724` (WhatsApp brand green) in `ContactActionCard.tsx`
    - `#C29B38` (Star rating gold fill and text) in `ProfessionalCard.tsx`, `ProfileHeader.tsx`, `ReviewSection.tsx`
    - `#EFE9DF` in background grid gradients in `HeroSection.tsx` and `ProfileHeader.tsx`
    - `#FBF9F5` in viewport metadata in `app/layout.tsx`
  - 180+ arbitrary Tailwind bracket values in components, overwhelmingly `rounded-[2px]`, `rounded-[3px]`, `text-[10px]`, and `text-[11px]`.
- **Font Loading Configuration:**
  - `Plus_Jakarta_Sans` loaded in `app/layout.tsx`: `subsets: ["latin"]`, `variable: "--font-sans"`, `weight: ["400", "500", "600", "700"]`, `display: "swap"`. Only normal style loaded (no italics).
  - `Newsreader` loaded in `app/layout.tsx`: `subsets: ["latin"]`, `variable: "--font-serif"`, `weight: ["400", "500", "600"]`, `style: ["normal", "italic"]`, `display: "swap"`. The variable font optical sizing axis (`axes: ["opsz"]`) is not configured.

### 7. Motion and Interaction
- **Usage of `motion/react`:** Verified: **0 places**. Neither `motion` nor `motion/react` is imported anywhere in the codebase.
- **Reduced Motion Respect:** Verified: **Not implemented**. Neither `<MotionConfig reducedMotion="...">` nor `useReducedMotion()` is present in the codebase.
- **On-Page-Load Animations Without User Action:** Verified: **0 CSS keyframe animations**. All CSS transitions/fade-ins (`animate-in fade-in-50`) are gated behind user interactions (mobile menu toggle or form submit).

### 8. Forms
- **`app/join/page.tsx`:**
  - **Zod Schema:**
    ```ts
    const proApplicationSchema = z.object({
      fullName: z.string().min(2, "Full name must be at least 2 characters"),
      businessName: z.string().optional(),
      categorySlug: z.string().min(1, "Please select your primary trade category"),
      baseLocation: z.string().min(1, "Please select your primary operational base"),
      phone: z.string().min(7, "Please enter a valid phone number"),
      whatsappNumber: z.string().min(7, "Please enter a valid WhatsApp contact"),
      yearsExperience: z.string().min(1, "Please enter years of experience"),
      bio: z.string().min(20, "Please provide a brief description of your trade practice (min 20 characters)"),
      acceptsVerification: z.boolean().refine((val) => val === true, {
        message: "You must agree to the identity verification protocol",
      }),
    });
    ```
  - **On Submit:** Executes `await new Promise((resolve) => setTimeout(resolve, 800)); setIsSubmitted(true);`. No network request, no console.log, renders confirmation message.
- **`app/login/page.tsx`:**
  - **Zod Schema:** None. Uses uncontrolled/state inputs (`phone`, `password`, `accountType`).
  - **On Submit:** Executes `e.preventDefault(); setIsSubmitted(true);`. No network request, no console.log, renders preview banner.
- **`app/register/page.tsx`:**
  - **Zod Schema:** None. Uses state inputs (`fullName`, `phone`, `email`, `location`, `password`).
  - **On Submit:** Executes `e.preventDefault(); setIsSubmitted(true);`. No network request, no console.log, renders preview banner.

### 9. Accessibility and Responsiveness
- **Semantic Structure:**
  - Heading order is logically sequential (`h1` -> `h2` -> `h3`) across all pages.
  - Landmarks (`header`, `main`, `footer`, `nav`, `aside`) are used correctly.
  - Visible focus styles: Globally enforced with 2px Laterite outline.
  - Image alt text: Descriptive alt attributes present on all `next/image` tags.
- **Form Label Associations:** Non-compliant. Inputs on `/join`, `/login`, and `/register` do not have `id` attributes and labels lack `htmlFor` attributes.
- **Mobile Navigation:** Working hamburger drawer implemented in `components/layout/Header.tsx` (lines 64–140).
- **Mobile Filter on `/explore`:**
  - Implemented as an inline accordion (`isMobileFiltersOpen ? "block" : "hidden"`).
  - Does NOT trap focus, does NOT restore focus, and does NOT close on Escape key press.
- **Visual Responsiveness (390px vs 1360px):**
  - All 7 routes captured at 390px and 1360px.
  - Horizontal overflow: Verified 0 horizontal scrolling across all routes.
  - Truncated text: Controlled via `line-clamp-2` in category and artisan descriptions.
  - Stacking: Grids cleanly collapse from 4-col/3-col down to 1-col on mobile. Profile contact card unpins from sticky and stacks below content.

### 10. Build and Quality
- **Command Results:**
  - `npm run build`: Exit code 0 (18 static/prerendered routes generated in 2.4s).
  - `npx tsc --noEmit`: Exit code 0 (0 TypeScript errors).
  - `npm run lint`: Exit code 0, 19 warnings (0 errors). All 19 are `@typescript-eslint/no-unused-vars` (e.g. `Sparkles`, `Calendar`, `ShieldCheck`, `Clock`).
- **First Load JS:**
  - Root shared bundles: ~433 KB uncompressed (`41c3808a7as1l.js` 223 KB, `30hqzoxxfk0az.js` 176 KB, `0y3v_gwlex4io.js` 24 KB).
  - Individual route page chunks: 12 KB to 61 KB per route.
- **Image Optimization & Sizing:**
  - `next/image` is used exclusively. Plain `<img>` is not used.
  - `next.config.ts` sets `images.unoptimized: true`. Images load unoptimized directly from `images.unsplash.com`.
  - Largest images: Hero and profile cover images request `w=1200&auto=format&fit=crop&q=80` (~150–250 KB per image over network).
- **Secrets & Environment:**
  - 0 `.env` files exist in the repository.
  - `.gitignore` includes `.env*`. No API keys or secrets are committed.

### 11. Design Proposal Doc Analysis
- **10-Line Summary of `design-motion-proposal.md`:**
  1. Re-anchors visual direction on Contemporary African Minimalism and the restored homepage foundation.
  2. Identifies current design weaknesses: static visuals, lack of card tactility, and abrupt scroll pacing.
  3. Adapts marketplace UX patterns from Thumbtack, TaskRabbit, Airbnb, and Fiverr (dual search, direct WhatsApp action).
  4. Adapts editorial craft motion from Awwwards (L'Épée 1839, Koto, Basement) emphasizing fine 1px lines and spring physics.
  5. Proposes 5 homepage enhancements: staggered headline reveal, refined search focus states, card spotlights, icon springs, and step connectors.
  6. Recommends copying 4 React Bits components into source: BlurText/SplitText, SpotlightCard, Magnet, and ShinyText.
  7. Outlines Motion (`motion/react`) implementation for hero entrance, scroll reveals, card hover/tap, and district dropdown.
  8. Enforces responsive adaptations (spotlights and magnetic hover disabled on touch devices/tablets).
  9. Details strict performance rules: `prefers-reduced-motion` bypass, GPU-only transforms, zero CLS, and 44px touch targets.
  10. Confirms `framer-motion` is removed and `motion` is installed.
- **Conflicts with Project Rules Identified in the Proposal:**
  - **Kinetic Auto-Entrance Typography:** Planning an automated word-by-word opacity entrance on initial load creates render latency and flashes of invisible text on slower 3G/4G connections on mid-range Android devices.
  - **ShinyText Shimmer:** Proposing a shimmering light sweep across kicker text introduces purely decorative animation that risks resembling neon effects.
  - **Magnet Component:** Magnetic cursor pulling on desktop introduces continuous `mousemove` event listeners without genuine utility.
  - **SpotlightCard Component:** Requires cursor tracking listeners on every card in the grid. Even when disabled on mobile, it adds unnecessary client JavaScript overhead over standard CSS `:hover` states.

---

## D. What Could Not Be Verified & Why
1. **Mobbin In-App Live References:** The Mobbin MCP server returned an authentication error ("Mobbin MCP requires a paid plan"). Deep-linked references were verified through web index searches and public Mobbin application listings rather than the paid MCP tool.
2. **Real-Device Android Performance Benchmarks:** Tested inside headless Chromium at 390px viewport width; real-world frame rates and memory footprint on low-end hardware (e.g. Tecno, Infinix, or Samsung A-series) in The Gambia cannot be directly benchmarked in this environment.
3. **SMS/WhatsApp Gateway Connectivity:** Phone numbers in sample data (`+220 700 1234`, etc.) are mock strings; delivery to real Gambian GSM networks (Africell, QCell, Comium) cannot be verified until Phase 04.

---

## E. Suggested Order for Fixing Things (No Code)

1. **Delete Dead / Orphaned Code:** Remove the 6 orphaned Living Monograph component files in `components/home/` (`MonographHero`, `TactileSwatchReveal`, `EditorialChapters`, `ArtisanDossiers`, `ArchitecturalBlueprintHowItWorks`, `ArtisanManifestoJoin`) to eliminate 1,082 lines of dead code and clean up build clutter.
2. **Purge Fabricated Claims & Statistics from Sample Data:**
   - Remove decimal ratings (`4.95`, `4.98`) and replace with "Ratings available after verified bookings".
   - Remove hardcoded review strings in `data/professionals.ts` and label the review section "Sample Review Archetype for Development Review".
   - Replace "{completedJobsCount} Jobs completed" with trade experience years.
   - Remove `"Master Trade Guild Certification"` from `types/professional.ts` and `data/professionals.ts`.
3. **Resolve Accessibility Violations:**
   - Add explicit `id` attributes to all form inputs on `/join`, `/login`, and `/register` and link them to labels via `htmlFor`.
   - Upgrade the `/explore` mobile filter toggle into an accessible dialog with `aria-modal="true"`, focus trapping, escape key handling, and focus return.
4. **Clean ESLint Unused Variable Warnings:** Remove the 19 unused Lucide icon imports and unused parameters across `app/` and `components/` to achieve 0 warnings and 0 errors on `npm run lint`.
5. **Establish Motion Foundation with Reduced Motion:**
   - Wrap the application or animated sections in `<MotionConfig reducedMotion="user">`.
   - Implement animations only where they directly support user orientation or interaction feedback. Avoid decorative automatic page-load animations.
6. **Harmonize Category Count:** Update `PopularCategories.tsx` to either render all 9 categories (e.g. 3×3 grid or 9-card flex/grid) or provide a clear "+1 more trade" indicator so the 9th category is not silently dropped from the homepage.
7. **Normalize Hardcoded Values into Design Tokens:** Move WhatsApp green (`#1E7E34`), star rating gold (`#C29B38`), and recurrent arbitrary radius classes (`rounded-[2px]`, `rounded-[3px]`) into `globals.css` `@theme` definitions.
