import type { ButtonHTMLAttributes } from "react";
import { useState } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      style={{
        padding: "var(--space-sm) var(--space-md)",
        borderRadius: "var(--radius-md)",
        border: "none",
        cursor: "pointer",
        backgroundColor:
          variant === "primary" ? "var(--color-primary)" : "var(--color-text-muted)",
        color: "#fff",
        filter: hover ? "brightness(1.08)" : undefined,
        transition: "filter 0.12s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        setHover(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
