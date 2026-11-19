import { spawn } from "child_process";
import http from "http";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const RUNS_PER_ROUTE = 5;

const ROUTES = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
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
        reject(
          new Error(`Failed to parse Lighthouse output: ${err.message}\nOutput: ${stdout.slice(0, 500)}`)
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
  const cls = parseFloat((audits["cumulative-layout-shift"]?.numericValue || 0).toFixed(3));
  const transfer = Math.round((audits["total-byte-weight"]?.numericValue || 0) / 1024);

  // Unused JS from unused-javascript audit
  const unusedJsBytes = audits["unused-javascript"]?.numericValue || 0;
  const unusedJs = Math.round(unusedJsBytes / 1024);

  // LCP breakdown phases from lcp-breakdown-insight or audits
  const lcpPhases = audits["lcp-breakdown-insight"]?.details?.items?.[0] || {};
  const ttfb = Math.round(lcpPhases.ttfb || audits["server-response-time"]?.numericValue || 0);
  const loadDelay = Math.round(lcpPhases.loadDelay || 0);
  const loadDuration = Math.round(lcpPhases.loadDuration || 0);
  const renderDelay = Math.round(lcpPhases.renderDelay || 0);

  return {
    performance: perfScore,
    lcp: parseFloat(lcp.toFixed(2)),
    tbt,
    cls,
    transfer,
    unusedJs,
    ttfb,
    loadDelay,
    loadDuration,
    renderDelay,
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
  console.log(`Checking production server at ${BASE_URL}...`);
  const isUp = await checkServer();
  if (!isUp) {
    console.error(`Production server is not responding at ${BASE_URL}. Run 'npm start' first.`);
    process.exit(1);
  }

  console.log(`Starting Shell Floor audit (5 runs per route, mobile simulated 4G)...`);

  const summary = [];
  const allRunsData = [];

  for (const route of ROUTES) {
    const fullUrl = `${BASE_URL}${route.path}`;
    console.log(`\n========================================\nAuditing ${route.name} (${route.path})\n========================================`);

    const runs = [];
    for (let i = 1; i <= RUNS_PER_ROUTE; i++) {
      process.stdout.write(`  Run ${i}/${RUNS_PER_ROUTE}... `);
      try {
        const result = await runLighthouse(fullUrl);
        const metrics = parseMetrics(result);
        runs.push(metrics);
        allRunsData.push({ route: route.name, run: i, ...metrics });
        console.log(`Perf: ${metrics.performance} | LCP: ${metrics.lcp}s | TBT: ${metrics.tbt}ms | CLS: ${metrics.cls} | Transfer: ${metrics.transfer}KB | UnusedJS: ${metrics.unusedJs}KB | TTFB: ${metrics.ttfb}ms | LoadDelay: ${metrics.loadDelay}ms | LoadDur: ${metrics.loadDuration}ms | RenderDelay: ${metrics.renderDelay}ms`);
      } catch (err) {
        console.error(`FAILED: ${err.message}`);
        process.exit(1);
      }
    }

    const medPerf = median(runs.map((r) => r.performance));
    const medLcp = parseFloat(median(runs.map((r) => r.lcp)).toFixed(2));
    const medTbt = median(runs.map((r) => r.tbt));
    const medCls = parseFloat(median(runs.map((r) => r.cls)).toFixed(3));
    const medTransfer = median(runs.map((r) => r.transfer));
    const medUnusedJs = median(runs.map((r) => r.unusedJs));
    const medTtfb = median(runs.map((r) => r.ttfb));
    const medLoadDelay = median(runs.map((r) => r.loadDelay));
    const medLoadDur = median(runs.map((r) => r.loadDuration));
    const medRenderDelay = median(runs.map((r) => r.renderDelay));

    const minPerf = Math.min(...runs.map((r) => r.performance));
    const maxPerf = Math.max(...runs.map((r) => r.performance));
    const minLcp = Math.min(...runs.map((r) => r.lcp));
    const maxLcp = Math.max(...runs.map((r) => r.lcp));
    const minTbt = Math.min(...runs.map((r) => r.tbt));
    const maxTbt = Math.max(...runs.map((r) => r.tbt));

    summary.push({
      name: route.name,
      path: route.path,
      perf: `${medPerf} [${minPerf}-${maxPerf}]`,
      lcp: `${medLcp}s [${minLcp}-${maxLcp}]`,
      tbt: `${medTbt}ms [${minTbt}-${maxTbt}]`,
      cls: medCls.toFixed(3),
      transfer: `${medTransfer}KB`,
      unusedJs: `${medUnusedJs}KB`,
      ttfb: medTtfb,
      loadDelay: medLoadDelay,
      loadDur: medLoadDur,
      renderDelay: medRenderDelay,
      rawMedLcp: medLcp,
    });
  }

  console.log("\n\n======================================================");
  console.log("## Shell Floor Performance Summary (Median [Min - Max] of 5 runs)");
  console.log("======================================================\n");

  console.log("| Route | Perf | LCP (s) | TBT (ms) | CLS | Transfer | Unused JS | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) | Shell >= 3s? |");
  console.log("| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |");
  for (const s of summary) {
    const isShellFloorProblem = s.rawMedLcp >= 3.0 ? "YES (Shell is the problem)" : "NO";
    console.log(`| **${s.name}** (\`${s.path}\`) | ${s.perf} | ${s.lcp} | ${s.tbt} | ${s.cls} | ${s.transfer} | ${s.unusedJs} | ${s.ttfb} | ${s.loadDelay} | ${s.loadDur} | ${s.renderDelay} | **${isShellFloorProblem}** |`);
  }

  console.log("\n\n### Raw Measurement Data (All 5 Runs)\n");
  console.log("| Route | Run | Perf | LCP (s) | TBT (ms) | CLS | Transfer (KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) |");
  console.log("| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |");
  for (const r of allRunsData) {
    console.log(`| ${r.route} | Run ${r.run} | ${r.performance} | ${r.lcp} | ${r.tbt} | ${r.cls.toFixed(3)} | ${r.transfer} | ${r.unusedJs} | ${r.ttfb} | ${r.loadDelay} | ${r.loadDuration} | ${r.renderDelay} |`);
  }
}

main().catch(err => {
  console.error("Shell floor audit failed:", err.message);
  process.exit(1);
});
