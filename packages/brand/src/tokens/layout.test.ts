import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { layout, typography } from "./index";

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

  it("declares the panel body padding and gap", () => {
    expect(declaration("--layout-panel-pad-x")).toBe("1.5rem");
    expect(declaration("--layout-panel-gap")).toBe("1.25rem");
  });

  it("defaults the panel edge to the gutter", () => {
    expect(declaration("--layout-panel-edge")).toBe("var(--layout-gutter)");
  });

  it("derives the center offsets from the panel edge", () => {
    expect(declaration("--layout-center-left")).toBe(
      "calc(var(--layout-panel-edge) + var(--layout-left-w) + var(--layout-edge-tab-w) + var(--layout-gutter))",
    );
    expect(declaration("--layout-center-right")).toBe(
      "calc(var(--layout-panel-edge) + var(--layout-right-w) + var(--layout-edge-tab-w) + var(--layout-gutter))",
    );
  });

  it.each(["left", "right"])("collapses the %s column and its center offset when the panel is hidden", (side) => {
    const block = css.match(new RegExp(`\\[data-${side}-panel="hidden"\\] \\{([\\s\\S]*?)\\}`))?.[1];
    expect(block).toContain(`--layout-${side}-w: 0px;`);
    expect(block).toContain(`--layout-center-${side}: var(--layout-gutter);`);
  });

  it("declares the font size and line height of every typography role", () => {
    for (const [size, { lineHeight }] of Object.values(typography)) {
      for (const value of [size, lineHeight]) {
        const name = value.match(/^var\((--[\w-]+)\)$/)?.[1];
        expect(name, value).toBeDefined();
        expect(() => declaration(name as string)).not.toThrow();
      }
    }
  });

  it("raises input and search text to 16px on coarse pointers so iOS does not zoom on focus", () => {
    const coarse = css.match(/@media \(pointer: coarse\) \{\s*:root \{([\s\S]*?)\}/)?.[1];
    expect(coarse).toBeDefined();
    expect(coarse).toMatch(/--text-input:\s*1rem;/);
    expect(coarse).toMatch(/--text-search:\s*1rem;/);
  });
});
