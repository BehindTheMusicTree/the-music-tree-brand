import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { EmailSocialLink, GithubSocialLink } from "./SocialIconLinks";

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

  it("renders the mailto path with forwarded props and no target/rel", () => {
    const onClick = vi.fn();
    const element = EmailSocialLink({
      href: "contact@example.com",
      onClick,
      id: "mail",
      "data-umami-event": "email_click",
    } as Parameters<typeof EmailSocialLink>[0]);
    const props = (element as { props: Record<string, unknown> }).props;
    expect(props.onClick).toBe(onClick);
    expect(props.id).toBe("mail");
    expect(props["data-umami-event"]).toBe("email_click");

    const html = renderToStaticMarkup(<EmailSocialLink href="contact@example.com" id="mail" />);
    expect(html).toContain('href="mailto:contact@example.com"');
    expect(html).toContain('id="mail"');
    expect(html).not.toContain("target=");
    expect(html).not.toContain("rel=");
  });

  it("keeps aria-label and title owned by the component when text and title are passed", () => {
    const html = renderToStaticMarkup(<GithubSocialLink href={HREF} text="Our code" title="Open repo" />);
    expect(html).toContain('aria-label="Our code"');
    expect(html).toContain('title="Open repo"');

    const defaulted = renderToStaticMarkup(<GithubSocialLink href={HREF} text="Our code" />);
    expect(defaulted).toContain('aria-label="Our code"');
    expect(defaulted).toContain('title="Our code"');
  });

  it("does not let runtime aria-label or title props override the component's", () => {
    const html = renderToStaticMarkup(
      GithubSocialLink({ href: HREF, text: "Our code", "aria-label": "evil" } as Parameters<
        typeof GithubSocialLink
      >[0]),
    );
    expect(html).toContain('aria-label="Our code"');
    expect(html).not.toContain("evil");
  });
});
