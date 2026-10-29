import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { GithubSocialLink } from "./SocialIconLinks";

const HREF = "https://github.com/BehindTheMusicTree";

describe("SocialIconLink", () => {
  it("forwards anchor props such as onClick and data attributes", () => {
    const onClick = vi.fn();
    const element = GithubSocialLink({ href: HREF, onClick, "data-umami-event": "github_click" } as Parameters<
      typeof GithubSocialLink
    >[0]);
    expect(isValidElement(element)).toBe(true);
    const props = (element as { props: Record<string, unknown> }).props;
    expect(props.onClick).toBe(onClick);
    expect(props["data-umami-event"]).toBe("github_click");
  });

  it("keeps href, target and rel owned by the component", () => {
    const html = renderToStaticMarkup(<GithubSocialLink href={HREF} id="gh" />);
    expect(html).toContain('id="gh"');
    expect(html).toContain(`href="${HREF}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
