import { spawn } from "child_process";
import http from "http";

const BASE_URL = "http://localhost:3000";

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      "npx",
      [
        "--yes",
        "lighthouse",
        url,
        "--output=json",
        "--output-path=stdout",
        '--chrome-flags="--headless=new --no-sandbox"',
        "--only-categories=performance",
        "--quiet",
      ],
      { shell: true }
    );

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Lighthouse failed with code ${code}: ${stderr}`)
        );
      }
      try {
        const json = JSON.parse(stdout);
        resolve(json);
      } catch (err) {
        reject(new Error(`Failed to parse Lighthouse output: ${err.message}`));
      }
    });
  });
}

function parseMetrics(result) {
  const audits = result.audits || {};
  const categories = result.categories || {};

  const perfScore = Math.round((categories.performance?.score || 0) * 100);
  const lcp = (audits["largest-contentful-paint"]?.numericValue || 0) / 1000;
  const tbt = Math.round(audits["total-blocking-time"]?.numericValue || 0);
  const cls = parseFloat((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(3));

  return {
    performance: perfScore,
    lcp: parseFloat(lcp.toFixed(2)),
    tbt,
    cls,
  };
}

async function main() {
  const isUp = await checkServer();
  if (!isUp) {
    console.error("Server down");
    process.exit(1);
  }

  const label = process.argv[2] || "Run";
  console.log(`Running 5 Lighthouse runs for ${label}...`);

  const runs = [];
  for (let i = 1; i <= 5; i++) {
    process.stdout.write(`  Run ${i}/5... `);
    const res = await runLighthouse(BASE_URL + "/");
    const m = parseMetrics(res);
    runs.push(m);
    console.log(`Perf: ${m.performance} | LCP: ${m.lcp}s | TBT: ${m.tbt}ms | CLS: ${m.cls}`);
  }

  const lcps = runs.map(r => r.lcp).sort((a, b) => a - b);
  const medianLcp = lcps[2];
  console.log(`\n${label} Median LCP: ${medianLcp}s [${lcps[0]}s - ${lcps[4]}s]`);
}

main().catch(console.error);
