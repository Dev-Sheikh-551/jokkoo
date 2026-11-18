# Performance Baseline — 2026-11-18

Production build Lighthouse audit with 5 runs per route under simulated mobile 4G (Moto G4 emulation, 1.6 Mbps download, 150ms RTT, 4x CPU slowdown).

## Post-Optimization Summary (Task 4 & 5 Polish)

*Measured after dynamic import of FiltersDialog/MobileMenu/Lightbox, lazy category tiles, and decoupling Zod from the data layer.*

| Route | Perf (>=90) | LCP (<=2.5s) | TBT (<=200ms) | CLS (<=0.05) | Transfer (<=500KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** (`/`) | 65 [64-70] | 5.05s [5.04-5.06] | 676ms [443-710] | 0.000 | 798KB [798-798] | 56KB [56-56] | 24 | 101 | 49 | 691 | **FAIL** |
| **Explore** (`/explore`) | 68 [63-76] | 5.07s [3.86-5.37] | 552ms [472-743] | 0.000 | 838KB [838-838] | 67KB [67-67] | 18 | 55 | 48 | 548 | **FAIL** |
| **Categories** (`/categories`) | 84 [79-86] | 3.85s [3.37-3.85] | 234ms [179-500] | 0.000 | 837KB [837-837] | 73KB [73-73] | 18 | 50 | 38 | 375 | **FAIL** |
| **Profile** (`/professionals/lamin-ceesay`) | 89 [81-90] | 3.32s [3.31-3.38] | 218ms [189-450] | 0.000 | 622KB [622-622] | 68KB [68-69] | 19 | 49 | 35 | 407 | **FAIL** |

### Improvements vs Initial Baseline
- **Explore Transfer**: Reduced by 30 KB (868 KB → 838 KB)
- **Explore Unused JS**: Reduced by 26 KB (93 KB → 67 KB)
- **Categories Transfer**: Reduced by 31 KB (868 KB → 837 KB)
- **Categories Unused JS**: Reduced by 29 KB (102 KB → 73 KB)
- **Profile Transfer**: Reduced by 30 KB (652 KB → 622 KB)
- **Profile Unused JS**: Reduced by 34 KB (102 KB → 68 KB)
- **Profile Performance**: Reached 89-90 score peak

## Raw Measurement Data (All 5 Runs — Post-Optimization)

| Route | Run | Perf | LCP (s) | TBT (ms) | CLS | Transfer (KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Home | Run 1 | 64 | 5.05 | 710 | 0.000 | 798 | 56 | 22 | 101 | 56 | 739 |
| Home | Run 2 | 65 | 5.05 | 676 | 0.000 | 798 | 56 | 24 | 107 | 44 | 707 |
| Home | Run 3 | 67 | 5.04 | 553 | 0.000 | 798 | 56 | 19 | 75 | 38 | 639 |
| Home | Run 4 | 70 | 5.06 | 443 | 0.000 | 798 | 56 | 24 | 32 | 55 | 672 |
| Home | Run 5 | 64 | 5.05 | 710 | 0.000 | 798 | 56 | 27 | 111 | 49 | 691 |
| Explore | Run 1 | 63 | 5.07 | 743 | 0.000 | 838 | 67 | 18 | 64 | 42 | 548 |
| Explore | Run 2 | 68 | 5.37 | 489 | 0.000 | 838 | 67 | 16 | 42 | 35 | 570 |
| Explore | Run 3 | 66 | 5.10 | 589 | 0.000 | 838 | 67 | 16 | 33 | 48 | 560 |
| Explore | Run 4 | 76 | 3.86 | 472 | 0.000 | 838 | 67 | 22 | 55 | 48 | 386 |
| Explore | Run 5 | 70 | 4.49 | 552 | 0.000 | 838 | 67 | 19 | 98 | 60 | 545 |
| Categories | Run 1 | 79 | 3.37 | 500 | 0.000 | 837 | 73 | 29 | 31 | 46 | 445 |
| Categories | Run 2 | 84 | 3.85 | 234 | 0.000 | 837 | 73 | 16 | 52 | 37 | 370 |
| Categories | Run 3 | 82 | 3.84 | 297 | 0.000 | 837 | 73 | 20 | 50 | 38 | 359 |
| Categories | Run 4 | 85 | 3.85 | 194 | 0.000 | 837 | 73 | 17 | 61 | 40 | 375 |
| Categories | Run 5 | 86 | 3.85 | 179 | 0.000 | 837 | 73 | 18 | 33 | 35 | 389 |
| Profile | Run 1 | 81 | 3.32 | 450 | 0.000 | 622 | 69 | 19 | 95 | 35 | 468 |
| Profile | Run 2 | 89 | 3.32 | 218 | 0.000 | 622 | 68 | 14 | 46 | 36 | 392 |
| Profile | Run 3 | 89 | 3.32 | 203 | 0.000 | 622 | 68 | 20 | 54 | 35 | 426 |
| Profile | Run 4 | 86 | 3.38 | 280 | 0.000 | 622 | 68 | 19 | 34 | 43 | 360 |
| Profile | Run 5 | 90 | 3.31 | 189 | 0.000 | 622 | 69 | 15 | 49 | 35 | 407 |
