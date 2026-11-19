import { spawn } from "child_process";
import http from "http";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Categories", path: "/categories" },
  { name: "Profile", path: "/professionals/lamin-ceesay" },
];

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

function runLighthouse(url, throttlingMethod) {
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
        `--throttling-method=${throttlingMethod}`,
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
        reject(
          new Error(`Failed to parse Lighthouse output: ${err.message}`)
        );
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

  return {
    performance: perfScore,
    lcp: parseFloat(lcp.toFixed(2)),
    tbt,
  };
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) return sorted[half];
  return (sorted[half - 1] + sorted[half]) / 2;
}

async function main() {
  const isUp = await checkServer();
  if (!isUp) {
    console.error(`Server is down at ${BASE_URL}. Run 'npm start' first.`);
    process.exit(1);
  }

  console.log("Starting Throttling Comparison (3 runs per route for each method)...");
  const comparison = [];

  for (const route of ROUTES) {
    const fullUrl = `${BASE_URL}${route.path}`;
    console.log(`\n========================================\nRoute: ${route.name} (${route.path})\n========================================`);

    // 1. Simulated throttling
    console.log("  Running 3x SIMULATED throttling...");
    const simRuns = [];
    for (let i = 1; i <= 3; i++) {
      process.stdout.write(`    Sim Run ${i}/3... `);
      const res = await runLighthouse(fullUrl, "simulate");
      const m = parseMetrics(res);
      simRuns.push(m);
      console.log(`Perf: ${m.performance} | LCP: ${m.lcp}s | TBT: ${m.tbt}ms`);
    }

    // 2. DevTools applied throttling
    console.log("  Running 3x DEVTOOLS applied throttling...");
    const devRuns = [];
    for (let i = 1; i <= 3; i++) {
      process.stdout.write(`    DevTools Run ${i}/3... `);
      const res = await runLighthouse(fullUrl, "devtools");
      const m = parseMetrics(res);
      devRuns.push(m);
      console.log(`Perf: ${m.performance} | LCP: ${m.lcp}s | TBT: ${m.tbt}ms`);
    }

    const simLcp = parseFloat(median(simRuns.map(r => r.lcp)).toFixed(2));
    const simTbt = median(simRuns.map(r => r.tbt));
    const devLcp = parseFloat(median(devRuns.map(r => r.lcp)).toFixed(2));
    const devTbt = median(devRuns.map(r => r.tbt));

    comparison.push({
      name: route.name,
      path: route.path,
      simLcp,
      simTbt,
      devLcp,
      devTbt,
      simRuns,
      devRuns,
    });
  }

  console.log("\n\n======================================================");
  console.log("## Throttling Comparison Table (Medians of 3 runs)");
  console.log("======================================================\n");
  console.log("| Route | Simulated LCP | DevTools LCP | Simulated TBT | DevTools TBT |");
  console.log("| :--- | :--- | :--- | :--- | :--- |");
  for (const c of comparison) {
    console.log(`| **${c.name}** (\`${c.path}\`) | ${c.simLcp}s | ${c.devLcp}s | ${c.simTbt}ms | ${c.devTbt}ms |`);
  }

  console.log("\n\n### Raw Throttling Comparison Data (All Runs)\n");
  for (const c of comparison) {
    console.log(`#### ${c.name} (\`${c.path}\`)`);
    console.log("| Run | Simulated LCP (s) | Simulated TBT (ms) | DevTools LCP (s) | DevTools TBT (ms) |");
    console.log("| :--- | :--- | :--- | :--- | :--- |");
    for (let i = 0; i < 3; i++) {
      console.log(`| Run ${i + 1} | ${c.simRuns[i].lcp} | ${c.simRuns[i].tbt} | ${c.devRuns[i].lcp} | ${c.devRuns[i].tbt} |`);
    }
    console.log("");
  }
}

main().catch(err => {
  console.error("Comparison failed:", err.message);
  process.exit(1);
});
