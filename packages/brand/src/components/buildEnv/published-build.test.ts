import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const repoNames = {
  HTMT_API_REPO_NAME: "hear-api",
  TMD_ADMIN_API_REPO_NAME: "deck-admin-api",
  GTMT_API_REPO_NAME: "grow-api",
  GTMT_FRONT_REPO_NAME: "grow-web",
  TMD_ADMIN_REPO_NAME: "deck-admin",
};

function buildAndRead(env: Record<string, string>): Record<string, string | null> {
  const outDir = mkdtempSync(path.join(process.cwd(), "node_modules", ".brand-build-test-"));
  try {
    execFileSync("pnpm", ["exec", "tsup", "--out-dir", outDir, "--silent"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        ORG_GITHUB_URL: "",
        HTMT_API_GITHUB_URL: "",
        ...Object.fromEntries(Object.keys(repoNames).map((name) => [name, ""])),
        ...env,
      },
      stdio: "pipe",
    });
    const script = `
      await import('react');
      await import('react/jsx-runtime');
      globalThis.process = undefined;
      const m = await import(${JSON.stringify(pathToFileURL(path.join(outDir, "components/index.js")).href)});
      const names = ['HTMT_API_GITHUB_URL', 'TMD_ADMIN_API_GITHUB_URL', 'GTMT_API_GITHUB_URL', 'GTMT_FRONT_GITHUB_URL', 'TMD_ADMIN_GITHUB_URL'];
      console.log(JSON.stringify(Object.fromEntries(names.map(name => [name, m[name] ?? null]))));
    `;
    return JSON.parse(
      execFileSync(process.execPath, ["--input-type=module", "-e", script], { encoding: "utf8" }),
    );
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
}

describe("published build environment", () => {
  it("embeds repository names and constructs URLs without a browser process object", () => {
    expect(buildAndRead({ ORG_GITHUB_URL: "https://github.com/example", ...repoNames })).toEqual({
      HTMT_API_GITHUB_URL: "https://github.com/example/hear-api",
      TMD_ADMIN_API_GITHUB_URL: "https://github.com/example/deck-admin-api",
      GTMT_API_GITHUB_URL: "https://github.com/example/grow-api",
      GTMT_FRONT_GITHUB_URL: "https://github.com/example/grow-web",
      TMD_ADMIN_GITHUB_URL: "https://github.com/example/deck-admin",
    });
  }, 60_000);

  it("keeps the explicit Hear API fallback when repository inputs are missing", () => {
    expect(buildAndRead({ HTMT_API_GITHUB_URL: "https://example.com/hear" })).toEqual({
      HTMT_API_GITHUB_URL: "https://example.com/hear",
      TMD_ADMIN_API_GITHUB_URL: null,
      GTMT_API_GITHUB_URL: null,
      GTMT_FRONT_GITHUB_URL: null,
      TMD_ADMIN_GITHUB_URL: null,
    });
  }, 60_000);
});
