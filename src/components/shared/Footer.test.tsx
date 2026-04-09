import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import type { Dictionary } from "@/libs/i18n";

const mockDictionary: Dictionary = {
  description_line1: "Test",
  description_line2: "Test",
  login_button: "LOGIN",
  footer_copyright: "Bản quyền thuộc về Sun* © 2025",
  error_login_failed: "Error",
};

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer dictionary={mockDictionary} />);
    expect(
      screen.getByText("Bản quyền thuộc về Sun* © 2025")
    ).toBeDefined();
  });

  it("renders as a footer element", () => {
    const { container } = render(<Footer dictionary={mockDictionary} />);
    const footer = container.querySelector("footer");
    expect(footer).not.toBeNull();
  });
});
