/** @type {import("lhci").LighthouseRc} */
module.exports = {
  ci: {
    collect: {
      startServerCommand:
        "sh -c 'pnpm exec astro preview stop >/dev/null 2>&1 || true; exec pnpm exec -- astro preview --host 127.0.0.1 --port 4323'",
      startServerReadyPattern: "4323",
      startServerReadyTimeout: 30000,
      url: ["http://127.0.0.1:4323/"],
      numberOfRuns: 1,
      settings: {
        chromeFlags:
          "--headless=new --disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
