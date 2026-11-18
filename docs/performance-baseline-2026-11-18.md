# Performance Baseline — 2026-11-18

Production build Lighthouse audit with 5 runs per route under simulated mobile 4G (Moto G4 emulation, 1.6 Mbps download, 150ms RTT, 4x CPU slowdown).

## Summary (Median [Min - Max] of 5 runs)

| Route | Perf (>=90) | LCP (<=2.5s) | TBT (<=200ms) | CLS (<=0.05) | Transfer (<=500KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** (`/`) | 66 [64-67] | 5.06s [5.05-5.06] | 614ms [566-699] | 0.000 | 795KB [795-795] | 56KB [56-56] | 17 | 74 | 44 | 739 | **FAIL** |
| **Explore** (`/explore`) | 69 [64-74] | 4.30s [4.14-5.26] | 632ms [493-710] | 0.000 | 868KB [868-868] | 93KB [93-93] | 21 | 60 | 39 | 567 | **FAIL** |
| **Categories** (`/categories`) | 83 [76-87] | 3.78s [3.78-3.82] | 276ms [161-503] | 0.000 | 868KB [868-868] | 102KB [102-102] | 18 | 66 | 31 | 340 | **FAIL** |
| **Profile** (`/professionals/lamin-ceesay`) | 86 [86-90] | 3.18s [3.17-3.40] | 265ms [201-335] | 0.000 | 652KB [652-652] | 102KB [102-102] | 18 | 49 | 36 | 397 | **FAIL** |

## Raw Measurement Data (All 5 Runs)

| Route | Run | Perf | LCP (s) | TBT (ms) | CLS | Transfer (KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Home | Run 1 | 64 | 5.06 | 699 | 0.000 | 795 | 56 | 17 | 86 | 46 | 808 |
| Home | Run 2 | 65 | 5.06 | 679 | 0.000 | 795 | 56 | 17 | 66 | 39 | 748 |
| Home | Run 3 | 66 | 5.06 | 614 | 0.000 | 795 | 56 | 27 | 74 | 53 | 714 |
| Home | Run 4 | 67 | 5.06 | 566 | 0.000 | 795 | 56 | 19 | 38 | 44 | 739 |
| Home | Run 5 | 66 | 5.05 | 606 | 0.000 | 795 | 56 | 15 | 97 | 34 | 729 |
| Explore | Run 1 | 74 | 4.15 | 493 | 0.000 | 868 | 93 | 22 | 95 | 29 | 567 |
| Explore | Run 2 | 72 | 4.30 | 526 | 0.000 | 868 | 93 | 21 | 34 | 59 | 367 |
| Explore | Run 3 | 64 | 5.26 | 671 | 0.000 | 868 | 93 | 15 | 35 | 48 | 572 |
| Explore | Run 4 | 65 | 5.24 | 632 | 0.000 | 868 | 93 | 22 | 60 | 38 | 586 |
| Explore | Run 5 | 69 | 4.14 | 710 | 0.000 | 868 | 93 | 20 | 104 | 39 | 402 |
| Categories | Run 1 | 83 | 3.82 | 276 | 0.000 | 868 | 102 | 36 | 105 | 31 | 334 |
| Categories | Run 2 | 85 | 3.78 | 221 | 0.000 | 868 | 102 | 16 | 66 | 28 | 334 |
| Categories | Run 3 | 87 | 3.78 | 161 | 0.000 | 868 | 102 | 19 | 36 | 30 | 340 |
| Categories | Run 4 | 80 | 3.80 | 380 | 0.000 | 868 | 102 | 18 | 85 | 31 | 359 |
| Categories | Run 5 | 76 | 3.78 | 503 | 0.000 | 868 | 102 | 17 | 37 | 52 | 394 |
| Profile | Run 1 | 86 | 3.17 | 335 | 0.000 | 652 | 102 | 18 | 105 | 33 | 397 |
| Profile | Run 2 | 89 | 3.18 | 244 | 0.000 | 652 | 102 | 15 | 29 | 33 | 441 |
| Profile | Run 3 | 90 | 3.17 | 201 | 0.000 | 652 | 102 | 21 | 70 | 38 | 376 |
| Profile | Run 4 | 86 | 3.40 | 265 | 0.000 | 652 | 102 | 17 | 40 | 36 | 327 |
| Profile | Run 5 | 86 | 3.20 | 312 | 0.000 | 652 | 102 | 18 | 49 | 38 | 421 |
