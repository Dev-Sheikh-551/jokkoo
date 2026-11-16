import fs from "fs";
import path from "path";

const DIRS = ["app", "components", "lib", "data"];
const MOJIBAKE_SEQUENCES = ["Â", "Ã", "â€", "ï¿½"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md"]);

let hasError = false;

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        scan(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.has(ext)) {
        const content = fs.readFileSync(fullPath, "utf8");
        for (const seq of MOJIBAKE_SEQUENCES) {
          if (content.includes(seq)) {
            const lines = content.split("\n");
            lines.forEach((line, index) => {
              if (line.includes(seq)) {
                console.error(
                  `[check-encoding] Mojibake sequence "${seq}" found in ${fullPath}:${index + 1}`
                );
                console.error(`  > ${line.trim()}`);
              }
            });
            hasError = true;
          }
        }
      }
    }
  }
}

for (const dir of DIRS) {
  scan(dir);
}

if (hasError) {
  console.error("[check-encoding] FAILED: Mojibake detected. Please save files as clean UTF-8.");
  process.exit(1);
} else {
  console.log("[check-encoding] PASSED: All source files clean UTF-8 without mojibake.");
  process.exit(0);
}
