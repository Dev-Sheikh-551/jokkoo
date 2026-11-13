#!/usr/bin/env node
// scripts/predeploy-check.mjs
// Verifies that no sample/mock data or mock flags remain prior to deployment.
// Exits with code 1 if any mock artifact is detected.

import { readFileSync, existsSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const ROOT = resolve(__dirname, "..");

let hasErrors = false;

function error(msg) {
  console.error(`\x1b[31m[PREDEPLOY ERROR]\x1b[0m ${msg}`);
  hasErrors = true;
}

// 1. Check environment variable
if (process.env.NEXT_PUBLIC_SHOW_MOCK_DATA === "true") {
  error("NEXT_PUBLIC_SHOW_MOCK_DATA environment variable is set to 'true'. Must be 'false' or unset.");
}

// 2. Check .env.local
const envLocalPath = join(ROOT, ".env.local");
let envLocalContent = "";
if (existsSync(envLocalPath)) {
  envLocalContent = readFileSync(envLocalPath, "utf8");
  if (/NEXT_PUBLIC_SHOW_MOCK_DATA\s*=\s*["']?true["']?/i.test(envLocalContent)) {
    error(".env.local has NEXT_PUBLIC_SHOW_MOCK_DATA=true. Set to false or remove before deployment.");
  }
}

// 2b. Check NEXT_PUBLIC_ONBOARDING_LIVE
let onboardingLive = process.env.NEXT_PUBLIC_ONBOARDING_LIVE;
if (!onboardingLive && envLocalContent) {
  const match = envLocalContent.match(/NEXT_PUBLIC_ONBOARDING_LIVE\s*=\s*["']?([^"'\r\n]+)["']?/i);
  if (match) onboardingLive = match[1];
}
if (onboardingLive !== "true") {
  error("NEXT_PUBLIC_ONBOARDING_LIVE is not 'true'. Onboarding must be live before deployment.");
}

// 3. Check data/mock directory
const mockDataDir = join(ROOT, "data", "mock");
if (existsSync(mockDataDir)) {
  error("Directory 'data/mock' exists. Remove it before deployment.");
}

// 4. Check public/images/mock directory
const mockImagesDir = join(ROOT, "public", "images", "mock");
if (existsSync(mockImagesDir)) {
  error("Directory 'public/images/mock' exists. Remove it before deployment.");
}

// 5. Check source code outside data/mock for 'isSample: true'
const DIRS_TO_SCAN = ["app", "components", "lib", "data"];

function scanDirectory(dirPath) {
  if (!existsSync(dirPath)) return;
  const entries = readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    // Ignore data/mock if scanning data
    if (fullPath.includes(join("data", "mock"))) continue;

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) {
      const content = readFileSync(fullPath, "utf8");
      if (content.includes("isSample: true")) {
        const rel = fullPath.replace(ROOT + "\\", "").replace(ROOT + "/", "");
        error(`Found 'isSample: true' in ${rel}. All profiles in product code must be real.`);
      }
    }
  }
}

for (const dir of DIRS_TO_SCAN) {
  scanDirectory(join(ROOT, dir));
}

if (hasErrors) {
  console.error("\n\x1b[31mPredeploy check failed. See docs/remove-mock-data.md for clean removal instructions.\x1b[0m\n");
  process.exit(1);
} else {
  console.log("\x1b[32m✔ Predeploy check passed. No mock artifacts or sample data detected.\x1b[0m\n");
  process.exit(0);
}
