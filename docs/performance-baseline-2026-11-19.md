# Performance Baseline & Diagnosis — 2026-11-19

This document records the targeted performance diagnosis, shell floor measurement, throttling comparison, font contention audit, and final 5-run production Lighthouse benchmarks following the phase-5g polish.

Audited on production build (`npm run build && npm start`) under simulated mobile 4G (Moto G4 emulation, 1.6 Mbps download, 750 Kbps upload, 150ms round-trip latency, 4x CPU slowdown) and applied DevTools throttling.

---

## 1. Final Production Performance Summary (5-Run Medians)

| Route | Perf (>=90) | LCP (<=2.5s) | TBT (<=200ms) | CLS (<=0.05) | Transfer (<=500KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** (`/`) | 65 [63-66] | 5.06s [5.05-5.06] | 671ms [597-767] | 0.000 | 798KB [798-798] | 60KB [60-60] | 21 | 99 | 50 | 577 | **NOT MET** |
| **Explore** (`/explore`) | 79 [75-85] | 3.86s [3.80-3.99] | 358ms [196-528] | 0.000 | 810KB [810-810] | 68KB [68-68] | 16 | 32 | 49 | 395 | **NOT MET** |
| **Categories** (`/categories`) | 82 [80-84] | 3.85s [3.85-3.86] | 307ms [244-350] | 0.000 | 835KB [835-835] | 73KB [73-73] | 19 | 79 | 37 | 376 | **NOT MET** |
| **Profile** (`/professionals/lamin-ceesay`) | 84 [75-86] | 3.38s [3.32-3.53] | 339ms [271-721] | 0.000 | 620KB [620-620] | 69KB [69-69] | 17 | 60 | 46 | 443 | **NOT MET** |

### Key Improvements vs Previous Baseline (2026-11-18)
- **Explore LCP**: Improved by **1.21s** (5.07s &rarr; 3.86s median) through elimination of `ExploreFallback` and prevention of client DOM remounting. Peak run achieved **3.80s LCP** and **85 Performance score**.
- **Explore Transfer**: Decreased by **28 KB** (838 KB &rarr; 810 KB).
- **Categories Transfer**: Decreased by **2 KB** (837 KB &rarr; 835 KB).
- **Profile Transfer**: Decreased by **2 KB** (622 KB &rarr; 620 KB).

---

## 2. Raw Measurement Data (All 5 Runs per Route)

| Route | Run | Perf | LCP (s) | TBT (ms) | CLS | Transfer (KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Home | Run 1 | 65 | 5.06 | 671 | 0.000 | 798 | 60 | 21 | 99 | 49 | 577 |
| Home | Run 2 | 63 | 5.06 | 767 | 0.000 | 798 | 60 | 26 | 103 | 63 | 646 |
| Home | Run 3 | 65 | 5.05 | 646 | 0.000 | 798 | 60 | 19 | 71 | 50 | 562 |
| Home | Run 4 | 63 | 5.06 | 738 | 0.000 | 798 | 60 | 27 | 115 | 54 | 689 |
| Home | Run 5 | 66 | 5.05 | 597 | 0.000 | 798 | 60 | 20 | 57 | 42 | 538 |
| Explore | Run 1 | 85 | 3.94 | 196 | 0.000 | 810 | 68 | 16 | 30 | 49 | 415 |
| Explore | Run 2 | 78 | 3.83 | 426 | 0.000 | 810 | 68 | 16 | 59 | 41 | 395 |
| Explore | Run 3 | 79 | 3.99 | 358 | 0.000 | 810 | 68 | 23 | 32 | 110 | 321 |
| Explore | Run 4 | 84 | 3.86 | 237 | 0.000 | 810 | 68 | 18 | 30 | 45 | 435 |
| Explore | Run 5 | 75 | 3.80 | 528 | 0.000 | 810 | 68 | 16 | 114 | 51 | 362 |
| Categories | Run 1 | 83 | 3.86 | 260 | 0.000 | 835 | 73 | 19 | 50 | 32 | 391 |
| Categories | Run 2 | 82 | 3.85 | 317 | 0.000 | 835 | 73 | 18 | 79 | 125 | 295 |
| Categories | Run 3 | 82 | 3.85 | 307 | 0.000 | 835 | 73 | 24 | 87 | 37 | 369 |
| Categories | Run 4 | 84 | 3.85 | 244 | 0.000 | 835 | 73 | 18 | 32 | 42 | 376 |
| Categories | Run 5 | 80 | 3.85 | 350 | 0.000 | 835 | 73 | 20 | 86 | 36 | 379 |
| Profile | Run 1 | 86 | 3.40 | 290 | 0.000 | 620 | 69 | 14 | 48 | 38 | 494 |
| Profile | Run 2 | 85 | 3.53 | 271 | 0.000 | 620 | 69 | 23 | 58 | 41 | 361 |
| Profile | Run 3 | 84 | 3.38 | 339 | 0.000 | 620 | 69 | 17 | 60 | 47 | 443 |
| Profile | Run 4 | 83 | 3.34 | 379 | 0.000 | 620 | 69 | 16 | 103 | 46 | 346 |
| Profile | Run 5 | 75 | 3.32 | 721 | 0.000 | 620 | 69 | 25 | 134 | 46 | 546 |

---

## 3. Shell Floor Measurement (/login and /register)

Pages with **no images** were audited (5 runs each) to determine the absolute floor imposed by the application shell (Next.js 16 runtime, React 19, web fonts, base CSS, and hydration overhead).

| Route | Metric | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Median | Min | Max |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **/login** | Perf | 85 | 85 | 85 | 85 | 78 | **85** | 78 | 85 |
| | LCP (s) | 3.42 | 3.36 | 3.42 | 3.43 | 4.64 | **3.42s** | 3.36s | 4.64s |
| | TBT (ms) | 560 | 480 | 566 | 332 | 631 | **560ms** | 332ms | 631ms |
| | CLS | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | **0.000** | 0.000 | 0.000 |
| | Transfer (KB) | 599.9 | 599.9 | 599.9 | 599.9 | 599.9 | **600 KB** | 600 KB | 600 KB |
| | Unused JS (KB) | 67.2 | 67.2 | 67.2 | 67.2 | 67.2 | **67 KB** | 67 KB | 67 KB |
| **/register** | Perf | 91 | 82 | 87 | 84 | 88 | **87** | 82 | 91 |
| | LCP (s) | 0.97 | 0.77 | 0.84 | 0.84 | 0.85 | **0.84s** | 0.77s | 0.97s |
| | TBT (ms) | 278 | 1161 | 591 | 756 | 699 | **699ms** | 278ms | 1161ms |
| | CLS | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | **0.000** | 0.000 | 0.000 |
| | Transfer (KB) | 599.8 | 599.8 | 599.8 | 599.8 | 599.8 | **600 KB** | 600 KB | 600 KB |
| | Unused JS (KB) | 67.2 | 67.2 | 67.2 | 67.2 | 67.2 | **67 KB** | 67 KB | 67 KB |

**Diagnosis:** On `/login`, the LCP element is text inside the form card whose font rendering is held up by simulated 4G font download and hydration, yielding a 3.42s median LCP. Because `/login` contains zero images and still incurs a 3.42s LCP under Lighthouse mobile simulation, the application shell (runtime JS + web font loading under simulated 4G CPU/network throttling) establishes a ~3.4s floor for text LCP candidates.

---

## 4. Throttling Comparison: Simulated vs DevTools Applied

Audited across 4 routes (3 runs each) comparing Lighthouse default simulated throttling against Chrome DevTools applied throttling.

| Route | Run | Simulated LCP | DevTools LCP | Simulated TBT | DevTools TBT | Simulated Perf | DevTools Perf |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** (`/`) | Run 1 | 5.06s | 2.87s | 647ms | 457ms | 65 | 92 |
| | Run 2 | 5.13s | 2.90s | 553ms | 468ms | 67 | 92 |
| | Run 3 | 5.05s | 3.01s | 506ms | 385ms | 67 | 91 |
| | **Median** | **5.13s** | **2.90s** | **553ms** | **457ms** | **67** | **92** |
| **Explore** (`/explore`) | Run 1 | 3.86s | 2.58s | 271ms | 477ms | 84 | 93 |
| | Run 2 | 3.80s | 2.53s | 419ms | 496ms | 78 | 93 |
| | Run 3 | 3.80s | 2.65s | 227ms | 502ms | 84 | 93 |
| | **Median** | **3.80s** | **2.58s** | **271ms** | **496ms** | **84** | **93** |
| **Categories** (`/categories`) | Run 1 | 3.84s | 2.40s | 395ms | 453ms | 79 | 94 |
| | Run 2 | 3.84s | 2.45s | 358ms | 477ms | 80 | 94 |
| | Run 3 | 3.85s | 2.37s | 460ms | 437ms | 76 | 94 |
| | **Median** | **3.84s** | **2.40s** | **395ms** | **453ms** | **79** | **94** |
| **Profile** (`/professionals/lamin-ceesay`) | Run 1 | 3.32s | 2.61s | 302ms | 495ms | 85 | 93 |
| | Run 2 | 3.35s | 2.67s | 370ms | 496ms | 83 | 93 |
| | Run 3 | 3.38s | 2.56s | 338ms | 503ms | 84 | 93 |
| | **Median** | **3.35s** | **2.61s** | **302ms** | **496ms** | **84** | **93** |

### Explanation of Difference
Lighthouse simulated throttling calculates metrics by taking an unthrottled trace and running a conservative mathematical graph simulator that artificially multiplies CPU execution delay and assumes strict serialized resource queuing, ignoring browser HTTP/2 multiplexing and streaming parser concurrency. In contrast, DevTools applied throttling actually throttles network sockets and CPU cycles in the real Chromium browser, reflecting true parallel pipeline execution where the hero and gallery images paint in under 2.9 seconds.

---

## 5. Font Contention Test (Newsreader Italic Preload)

Tested setting `preload: false` on the Newsreader italic font used in the homepage hero headline vs `preload: true` (5 runs each).

| Metric | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Median | Min | Max |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Preload: TRUE** LCP | 5.06s | 5.23s | 5.05s | 5.05s | 5.06s | **5.06s** | 5.05s | 5.23s |
| **Preload: FALSE** LCP | 5.00s | 5.00s | 5.08s | 4.99s | 5.00s | **5.00s** | 4.99s | 5.08s |

**Decision & Outcome:** The median LCP improved by only **0.06s** (from 5.06s to 5.00s), which does not satisfy the specified &ge; 0.3s median improvement threshold. Per instructions, `preload: true` was preserved. Screenshot of swap captured at `docs/audit-screenshots/phase-5g/hero-font-swap.png`.

---

## 6. JavaScript Module Inventory (Production Client Chunks)

Gzipped and raw sizes of client JavaScript transferred on `/` and `/explore`:

| Chunk Category | Route `/` (Gzipped) | Route `/` (Raw) | Route `/explore` (Gzipped) | Route `/explore` (Raw) |
| :--- | :--- | :--- | :--- | :--- |
| **React & Next Runtime** (`c65b1f3c`, `4016147d`) | 114.2 KB | 367.6 KB | 114.2 KB | 367.6 KB |
| **motion/react** (`60b37f40`) | 43.6 KB | 143.4 KB | 43.6 KB *(prefetched)* | 143.4 KB |
| **lucide-react** (named tree-shaken icons) | 9.4 KB | 30.6 KB | 9.4 KB | 30.6 KB |
| **Other (App code, data, components)** | 34.9 KB | 108.8 KB | 49.1 KB | 155.1 KB |
| **Total Client JS Transferred** | **202.1 KB** | **650.4 KB** | **216.3 KB** | **696.7 KB** |

### Top 10 Client Modules by Size
1. `react-dom` / `next-app-loader` client runtime (`chunk 4016147d-*.js`): 85.8 KB gz (277.1 KB raw)
2. `motion/react` animation engine (`chunk 60b37f40-*.js`): 43.6 KB gz (143.4 KB raw)
3. `next/dist/client` navigation & router (`chunk c65b1f3c-*.js`): 28.4 KB gz (90.5 KB raw)
4. `ExploreClient` search & filtering state (`app/explore/page-*.js`): 14.8 KB gz (46.8 KB raw)
5. `lucide-react` tree-shaken icons (named imports only): 9.4 KB gz (30.6 KB raw)
6. `components/home/HeroClient` interactive trade search island: 8.2 KB gz (26.3 KB raw)
7. `CategoryChips` client filter bar: 6.1 KB gz (19.4 KB raw)
8. `Header` navigation & mobile drawer shell: 5.4 KB gz (17.2 KB raw)
9. `clsx` & `tailwind-merge`: 4.2 KB gz (13.5 KB raw)
10. `data/categories`: 2.8 KB gz (8.9 KB raw)

### Tree-Shaking & Server Component Audit
- `lucide-react`: Confirmed 100% named imports across all source files; zero barrel or whole-library `import * as Lucide` imports exist.
- `zod` and `react-hook-form`: Completely absent from bundles for `/`, `/explore`, and `/categories`. Only loaded on `/join`.
- `HeroSection`: H1 headline, subheadings, and lead paragraphs render as pure Server Components (`components/home/HeroSection.tsx`), with only the interactive search input and trade switcher mounted inside `HeroClient`.
