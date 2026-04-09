import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

// Mock next/image
vi.mock("next/image", () => ({
  default: function MockImage({ alt, ...props }: { alt: string; [key: string]: unknown }) {
    return <img alt={alt} {...props} />;
  },
}));

// Mock LanguageSelector
vi.mock("@/components/shared/LanguageSelector", () => ({
  LanguageSelector: () => <div data-testid="language-selector" />,
}));

describe("Header", () => {
  it("renders logo image", () => {
    render(<Header currentLanguage="vi" />);
    const logo = screen.getByAltText("Sun Annual Awards 2025");
    expect(logo).toBeDefined();
  });

  it("renders with correct dimensions", () => {
    render(<Header currentLanguage="vi" />);
    const logo = screen.getByAltText("Sun Annual Awards 2025");
    expect(logo.getAttribute("width")).toBe("52");
    expect(logo.getAttribute("height")).toBe("48");
  });

  it("renders language selector", () => {
    render(<Header currentLanguage="vi" />);
    expect(screen.getByTestId("language-selector")).toBeDefined();
  });
});
