import { spawn } from "child_process";
import http from "http";

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const RUNS_PER_ROUTE = 3;
const REPORT_ONLY = process.argv.includes("--report-only");

const BUDGET = {
  performance: 90,
  lcp: 2.5, // seconds
  tbt: 200, // milliseconds
  cls: 0.05, // target 0 (allow 0.05 tolerance)
  transfer: 500, // KB
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

async function main() {
  console.log(`Checking production server at ${BASE_URL}...`);
  const isUp = await checkServer();
  if (!isUp) {
    console.error(`Error: Server at ${BASE_URL} is not responding.`);
    console.error(`Please run "npm run build && npm run start" before executing perf audit.`);
    process.exit(1);
  }

  console.log(`Starting Lighthouse audit (${RUNS_PER_ROUTE} runs per route, mobile 4G)...`);
  if (REPORT_ONLY) {
    console.log(`Mode: --report-only enabled (will not fail on budget breaches)`);
  }

  const results = [];
  let budgetFailed = false;

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`\nAuditing ${route.name} (${route.path})...`);
    const perfs = [];
    const lcps = [];
    const tbts = [];
    const clss = [];
    const transfers = [];

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

        perfs.push(perf);
        lcps.push(lcp);
        tbts.push(tbt);
        clss.push(cls);
        transfers.push(transferKB);

        console.log(`Perf: ${perf} | LCP: ${lcp.toFixed(2)}s | TBT: ${Math.round(tbt)}ms | CLS: ${cls.toFixed(3)} | Transfer: ${Math.round(transferKB)}KB`);
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
      }
    }

    const medPerf = median(perfs);
    const medLcp = median(lcps);
    const medTbt = median(tbts);
    const medCls = median(clss);
    const medTransfer = median(transfers);

    const perfPass = medPerf >= BUDGET.performance;
    const lcpPass = medLcp <= BUDGET.lcp;
    const tbtPass = medTbt <= BUDGET.tbt;
    const clsPass = medCls <= BUDGET.cls;
    const transferPass = medTransfer <= BUDGET.transfer;

    const routePass = perfPass && lcpPass && tbtPass && clsPass && transferPass;
    if (!routePass) budgetFailed = true;

    results.push({
      route: route.name,
      path: route.path,
      perf: medPerf,
      lcp: medLcp,
      tbt: medTbt,
      cls: medCls,
      transfer: medTransfer,
      passed: routePass,
      status: routePass ? "PASS" : "FAIL",
    });
  }

  // Print Markdown Table
  console.log(`\n\n## Performance Audit Results (Median of ${RUNS_PER_ROUTE} runs)\n`);
  console.log(`| Route | Performance (>= ${BUDGET.performance}) | LCP (<= ${BUDGET.lcp}s) | TBT (<= ${BUDGET.tbt}ms) | CLS (<= ${BUDGET.cls}) | Transfer (<= ${BUDGET.transfer} KB) | Status |`);
  console.log(`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |`);

  for (const r of results) {
    const pStr = `${r.perf}`;
    const lStr = `${r.lcp.toFixed(2)}s`;
    const tStr = `${Math.round(r.tbt)}ms`;
    const cStr = `${r.cls.toFixed(3)}`;
    const trStr = `${Math.round(r.transfer)} KB`;
    console.log(`| **${r.route}** (\`${r.path}\`) | ${pStr} | ${lStr} | ${tStr} | ${cStr} | ${trStr} | **${r.status}** |`);
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
