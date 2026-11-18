import { spawn } from "child_process";
import http from "http";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const RUNS_PER_ROUTE = 5;
const REPORT_ONLY = process.argv.includes("--report-only");

const BUDGET = {
  performance: 90,
  lcp: 2.5, // seconds
  tbt: 200, // milliseconds
  cls: 0.05, // target 0
  transfer: 500, // KB
  unusedJs: 50, // KB
};

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

    proc.stdout.on("data", (d) => (stdout += d.toString()));
    proc.stderr.on("data", (d) => (stderr += d.toString()));

    proc.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Lighthouse exited with code ${code}: ${stderr}`));
      }
      try {
        const json = JSON.parse(stdout);
        resolve(json);
      } catch (e) {
        reject(new Error(`Failed to parse Lighthouse JSON: ${e.message}`));
      }
    });
  });
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function min(values) {
  return values.length === 0 ? 0 : Math.min(...values);
}

function max(values) {
  return values.length === 0 ? 0 : Math.max(...values);
}

function extractLcpBreakdown(report) {
  const insight = report.audits["lcp-breakdown-insight"];
  const subparts = insight?.details?.items?.[0]?.items;

  let ttfb = 0;
  let loadDelay = 0;
  let loadDuration = 0;
  let renderDelay = 0;

  if (Array.isArray(subparts)) {
    for (const item of subparts) {
      if (item.subpart === "timeToFirstByte") ttfb = item.duration;
      if (item.subpart === "resourceLoadDelay") loadDelay = item.duration;
      if (item.subpart === "resourceLoadDuration") loadDuration = item.duration;
      if (item.subpart === "elementRenderDelay") renderDelay = item.duration;
    }
  } else {
    const metrics = report.audits["metrics"]?.details?.items?.[0];
    if (metrics) {
      ttfb = metrics.timeToFirstByte || 0;
      loadDelay = metrics.lcpLoadDelay || 0;
      loadDuration = metrics.lcpLoadDuration || 0;
      const totalLcp = metrics.largestContentfulPaint || 0;
      renderDelay = Math.max(0, totalLcp - (ttfb + loadDelay + loadDuration));
    }
  }

  return { ttfb, loadDelay, loadDuration, renderDelay };
}

async function main() {
  console.log(`Checking production server at ${BASE_URL}...`);
  const isUp = await checkServer();
  if (!isUp) {
    console.error(`Error: Server at ${BASE_URL} is not responding.`);
    console.error(`Please run "npm run build && npm run start" before executing perf audit.`);
    process.exit(1);
  }

  console.log(`Starting Lighthouse audit (${RUNS_PER_ROUTE} runs per route, mobile simulated 4G)...`);
  if (REPORT_ONLY) {
    console.log(`Mode: --report-only enabled (will not fail on budget breaches)`);
  }

  const allRouteData = [];
  let budgetFailed = false;

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`\n========================================`);
    console.log(`Auditing ${route.name} (${route.path})`);
    console.log(`========================================`);

    const runs = [];

    for (let r = 1; r <= RUNS_PER_ROUTE; r++) {
      process.stdout.write(`  Run ${r}/${RUNS_PER_ROUTE}... `);
      try {
        const report = await runLighthouse(url);
        const perf = Math.round((report.categories.performance?.score ?? 0) * 100);
        const lcp = (report.audits["largest-contentful-paint"]?.numericValue ?? 0) / 1000;
        const tbt = report.audits["total-blocking-time"]?.numericValue ?? 0;
        const cls = report.audits["cumulative-layout-shift"]?.numericValue ?? 0;
        const transferBytes = report.audits["total-byte-weight"]?.numericValue ?? 0;
        const transferKB = transferBytes / 1024;
        const unusedBytes =
          report.audits["unused-javascript"]?.details?.overallSavingsBytes ??
          report.audits["unused-javascript"]?.numericValue ??
          0;
        const unusedKB = unusedBytes / 1024;

        const { ttfb, loadDelay, loadDuration, renderDelay } = extractLcpBreakdown(report);

        const runRecord = {
          run: r,
          perf,
          lcp,
          tbt,
          cls,
          transfer: transferKB,
          unusedJs: unusedKB,
          ttfb,
          loadDelay,
          loadDuration,
          renderDelay,
        };

        runs.push(runRecord);

        console.log(
          `Perf: ${perf} | LCP: ${lcp.toFixed(2)}s | TBT: ${Math.round(tbt)}ms | CLS: ${cls.toFixed(
            3
          )} | Transfer: ${Math.round(transferKB)}KB | UnusedJS: ${Math.round(unusedKB)}KB | TTFB: ${Math.round(
            ttfb
          )}ms | LoadDelay: ${Math.round(loadDelay)}ms | LoadDur: ${Math.round(
            loadDuration
          )}ms | RenderDelay: ${Math.round(renderDelay)}ms`
        );
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
      }
    }

    const perfs = runs.map((r) => r.perf);
    const lcps = runs.map((r) => r.lcp);
    const tbts = runs.map((r) => r.tbt);
    const clss = runs.map((r) => r.cls);
    const transfers = runs.map((r) => r.transfer);
    const unusedJss = runs.map((r) => r.unusedJs);
    const utfbs = runs.map((r) => r.ttfb);
    const uloadDelays = runs.map((r) => r.loadDelay);
    const uloadDurations = runs.map((r) => r.loadDuration);
    const urenderDelays = runs.map((r) => r.renderDelay);

    const summary = {
      route: route.name,
      path: route.path,
      runs,
      perf: { median: median(perfs), min: min(perfs), max: max(perfs) },
      lcp: { median: median(lcps), min: min(lcps), max: max(lcps) },
      tbt: { median: median(tbts), min: min(tbts), max: max(tbts) },
      cls: { median: median(clss), min: min(clss), max: max(clss) },
      transfer: { median: median(transfers), min: min(transfers), max: max(transfers) },
      unusedJs: { median: median(unusedJss), min: min(unusedJss), max: max(unusedJss) },
      ttfb: { median: median(utfbs), min: min(utfbs), max: max(utfbs) },
      loadDelay: { median: median(uloadDelays), min: min(uloadDelays), max: max(uloadDelays) },
      loadDuration: { median: median(uloadDurations), min: min(uloadDurations), max: max(uloadDurations) },
      renderDelay: { median: median(urenderDelays), min: min(urenderDelays), max: max(urenderDelays) },
    };

    const perfPass = summary.perf.median >= BUDGET.performance;
    const lcpPass = summary.lcp.median <= BUDGET.lcp;
    const tbtPass = summary.tbt.median <= BUDGET.tbt;
    const clsPass = summary.cls.median <= BUDGET.cls;
    const transferPass = summary.transfer.median <= BUDGET.transfer;

    summary.passed = perfPass && lcpPass && tbtPass && clsPass && transferPass;
    if (!summary.passed) budgetFailed = true;

    allRouteData.push(summary);
  }

  // Print Summary Table
  console.log(`\n\n======================================================`);
  console.log(`## Performance Audit Summary (Median [Min - Max] of ${RUNS_PER_ROUTE} runs)`);
  console.log(`======================================================\n`);

  console.log(
    `| Route | Perf (>=${BUDGET.performance}) | LCP (<=${BUDGET.lcp}s) | TBT (<=${BUDGET.tbt}ms) | CLS (<=${BUDGET.cls}) | Transfer (<=${BUDGET.transfer}KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) | Status |`
  );
  console.log(
    `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |`
  );

  for (const s of allRouteData) {
    const pStr = `${s.perf.median} [${s.perf.min}-${s.perf.max}]`;
    const lStr = `${s.lcp.median.toFixed(2)}s [${s.lcp.min.toFixed(2)}-${s.lcp.max.toFixed(2)}]`;
    const tStr = `${Math.round(s.tbt.median)}ms [${Math.round(s.tbt.min)}-${Math.round(s.tbt.max)}]`;
    const cStr = `${s.cls.median.toFixed(3)}`;
    const trStr = `${Math.round(s.transfer.median)}KB [${Math.round(s.transfer.min)}-${Math.round(s.transfer.max)}]`;
    const uStr = `${Math.round(s.unusedJs.median)}KB [${Math.round(s.unusedJs.min)}-${Math.round(s.unusedJs.max)}]`;
    const ttfbStr = `${Math.round(s.ttfb.median)}`;
    const ldStr = `${Math.round(s.loadDelay.median)}`;
    const ldurStr = `${Math.round(s.loadDuration.median)}`;
    const rdStr = `${Math.round(s.renderDelay.median)}`;
    const statusStr = s.passed ? "PASS" : "FAIL";

    console.log(
      `| **${s.route}** (\`${s.path}\`) | ${pStr} | ${lStr} | ${tStr} | ${cStr} | ${trStr} | ${uStr} | ${ttfbStr} | ${ldStr} | ${ldurStr} | ${rdStr} | **${statusStr}** |`
    );
  }

  // Print Full Raw Data Table (every run)
  console.log(`\n\n### Raw Measurement Data (All 5 Runs)\n`);
  console.log(
    `| Route | Run | Perf | LCP (s) | TBT (ms) | CLS | Transfer (KB) | Unused JS (KB) | TTFB (ms) | Load Delay (ms) | Load Dur (ms) | Render Delay (ms) |`
  );
  console.log(
    `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |`
  );

  for (const s of allRouteData) {
    for (const r of s.runs) {
      console.log(
        `| ${s.route} | Run ${r.run} | ${r.perf} | ${r.lcp.toFixed(2)} | ${Math.round(r.tbt)} | ${r.cls.toFixed(
          3
        )} | ${Math.round(r.transfer)} | ${Math.round(r.unusedJs)} | ${Math.round(r.ttfb)} | ${Math.round(
          r.loadDelay
        )} | ${Math.round(r.loadDuration)} | ${Math.round(r.renderDelay)} |`
      );
    }
  }

  console.log("\n");

  if (budgetFailed && !REPORT_ONLY) {
    console.error("❌ Performance budget breached on one or more routes. Exiting with code 1.");
    process.exit(1);
  } else if (budgetFailed && REPORT_ONLY) {
    console.log("⚠️ Some metrics exceeded budget targets (--report-only flag passed, exiting with code 0).");
    process.exit(0);
  } else {
    console.log("✅ All routes met performance budget targets!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Unexpected error during performance audit:", err);
  process.exit(1);
});
