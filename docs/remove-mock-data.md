# Removal Guide: Sample & Mock Data

This document describes how to remove mock data from Jokkoo prior to production deployment.

## What is Mock Data?
Mock data exists solely for layout review and design verification. It consists of:
1. `data/mock/professionals.mock.ts` (8 fictional sample professionals)
2. `public/images/mock/` (mock profile image storage)
3. `NEXT_PUBLIC_SHOW_MOCK_DATA="true"` in local environment files

Permanent product assets (such as category photos in `public/images/categories/` and brand logo assets in `public/brand/`) are **NOT** mock data and must never be deleted.

---

## Removal Procedure

### 1. Disable Environment Flag
Set `NEXT_PUBLIC_SHOW_MOCK_DATA=false` in `.env.local` (or delete the file entirely).
Ensure production environment variables (e.g. in Vercel or cloud provider) do not have `NEXT_PUBLIC_SHOW_MOCK_DATA="true"`.

### 2. Remove Mock Directories
Delete the mock data and mock image directories:
```bash
rm -rf data/mock
rm -rf public/images/mock
```

### 3. Update `data/professionals.ts`
Remove the mock import and merge logic so that only real published profiles are returned:
```ts
import type { Professional } from "@/types/professional";

const REAL_PROFESSIONALS: Professional[] = [];

export function getProfessionals(): Professional[] {
  return REAL_PROFESSIONALS.filter((p) => p.status === "published");
}
```

### 4. Verify with Predeploy Check
Run the automated predeploy check:
```bash
npm run predeploy
```
Expected output:
```
✔ Predeploy check passed. No mock artifacts or sample data detected.
```

### 5. Verify Build & Empty States
Run the production build:
```bash
npm run build
```
Verify that:
- `/` shows the empty state in "Meet the people behind the work" ("Be one of the first professionals on Jokkoo" + Join CTA)
- `/explore` shows the empty state with the "Be the first — join as a professional" button
- No broken images appear anywhere
