# Performance Budget

This document defines the production performance budget and thresholds for Jokkoo. Every key page is audited under mobile emulation (simulated 4G network and mid-range mobile CPU throttling, Moto G4 emulation) using Google Lighthouse.

## Core Thresholds

| Metric | Budget Target | Rationale |
| :--- | :--- | :--- |
| **Performance Score** | **&ge; 90** | Ensures top-tier user experience across all key user journeys. |
| **Largest Contentful Paint (LCP)** | **&le; 2.5s** | LCP elements (hero photo, first category card image, first profile gallery photo) must render promptly on simulated 4G mobile networks. |
| **Total Blocking Time (TBT)** | **&le; 200ms** | Ensures UI remains immediately responsive to touch and scroll interactions. |
| **Cumulative Layout Shift (CLS)** | **0** | Zero layout shifts during font loading, image layout, and client hydration. |
| **Total Transfer Size** | **&le; 500 KB** | Prevents data bloat for mobile users on metered Gambian mobile connections. |

## Target Audit Routes

1. **Home (`/`)**: Main landing page with hero search and animated category tiles.
2. **Explore (`/explore`)**: Directory listing with server-rendered cards, search, filters sheet, and category chips.
3. **Categories (`/categories`)**: Category cards grid with service badges and responsive layout.
4. **Profile (`/professionals/lamin-ceesay`)**: Full professional portfolio with responsive gallery, contact details, and location coverage.

## Verification & Guardrails

Run the automated Lighthouse audit suite against a local production build (`npm run start`):

```bash
# Run 3-pass median audit with budget enforcement (fails if any metric exceeds budget)
npm run perf

# Generate report table without non-zero exit code
npm run perf -- --report-only
```

The script measures 3 passes per route, extracts the median values for each metric, prints a Markdown comparison table, and exits with code 1 if any route breaches the budget (unless `--report-only` is provided).
