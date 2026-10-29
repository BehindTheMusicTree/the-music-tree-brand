import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { layout } from "./index";

const css = readFileSync(join(__dirname, "theme.css"), "utf8");

function declaration(name: string): string {
  const match = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`${name} is not declared in theme.css`);
  return match[1].trim();
}

function resolve(name: string): string {
  const value = declaration(name);
  const ref = value.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1]) : value;
}

describe("layout tokens", () => {
  it("makes the right column as wide as the left one", () => {
    expect(resolve("--layout-right-w")).toBe(resolve("--layout-left-w"));
  });

  it("keeps the right column full width when a consumer collapses the left one", () => {
    expect(declaration("--layout-right-w")).not.toContain("--layout-left-w");
  });

  it("fits the detail panel inside the viewport below 48rem", () => {
    const mobile = css.match(/@media \(max-width: 47\.999rem\) \{([\s\S]*?)\n\}/)?.[1];
    expect(mobile).toBeDefined();
    expect(mobile).toMatch(/--layout-detail-panel-w:\s*calc\(100vw - 2 \* var\(--layout-gutter\)\);/);
  });

  it("declares every exported layout variable in theme.css", () => {
    for (const value of Object.values(layout)) {
      const name = value.match(/^var\((--[\w-]+)\)$/)?.[1];
      expect(name, value).toBeDefined();
      expect(() => declaration(name as string)).not.toThrow();
    }
  });
});
