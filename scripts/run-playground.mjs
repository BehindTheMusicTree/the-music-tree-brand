#!/usr/bin/env node
/**
 * Runs `pnpm run build` at the repo root with env from the shell merged with `playground/.env`,
 * then starts the playground dev server. **`scripts/assert-org-url.mjs`** (invoked by the root
 * build) requires every key in **`playground/.env.example`**.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPlaygroundDotenv } from "./load-playground-dotenv.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const envFile = path.join(repoRoot, "playground", ".env");

const dot = loadPlaygroundDotenv(envFile);
/** Shell overrides keys from `playground/.env`. */
const env = { ...dot, ...process.env };

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: repoRoot,
    env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (r.status !== 0 && r.status !== null) process.exit(r.status);
  if (r.error) throw r.error;
}

run("pnpm", ["run", "build"]);
run("pnpm", ["-C", "playground", "dev"]);
