import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSelector } from "./LanguageSelector";

// Mock next/image
vi.mock("next/image", () => ({
  default: function MockImage({
    alt,
    src,
    ...props
  }: {
    alt: string;
    src: string;
    [key: string]: unknown;
  }) {
    return <img alt={alt} src={src} {...props} />;
  },
}));

// Mock ChevronDownIcon
vi.mock("@/components/shared/icons/ChevronDownIcon", () => ({
  ChevronDownIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...props} />
  ),
}));

// Mock window.location.reload
const reloadMock = vi.fn();
beforeEach(() => {
  Object.defineProperty(window, "location", {
    value: { reload: reloadMock },
    writable: true,
  });
  document.cookie = "NEXT_LOCALE=; max-age=0; path=/";
});
afterEach(() => {
  reloadMock.mockClear();
});

// T005: Renders trigger with current language flag and code for each locale
describe("LanguageSelector — trigger rendering", () => {
  it("renders VN flag and label when currentLanguage is vi", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    const flag = screen.getByAltText("VN");
    expect(flag).toBeDefined();
    expect(flag.getAttribute("src")).toBe("/assets/auth/login/vn-flag.svg");
    expect(screen.getByText("VN")).toBeDefined();
  });

  it("renders EN flag and label when currentLanguage is en", () => {
    render(<LanguageSelector currentLanguage="en" />);
    const flag = screen.getByAltText("EN");
    expect(flag).toBeDefined();
    expect(flag.getAttribute("src")).toBe("/assets/auth/login/en-flag.svg");
    expect(screen.getByText("EN")).toBeDefined();
  });

  it("renders JA flag and label when currentLanguage is ja", () => {
    render(<LanguageSelector currentLanguage="ja" />);
    const flag = screen.getByAltText("JA");
    expect(flag).toBeDefined();
    expect(flag.getAttribute("src")).toBe("/assets/auth/login/ja-flag.svg");
    expect(screen.getByText("JA")).toBeDefined();
  });
});

// T006: Opens dropdown showing all 3 languages with flags
describe("LanguageSelector — dropdown open", () => {
  it("opens dropdown with all 3 languages and flags on trigger click", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    const trigger = screen.getByRole("button", { name: "Select language" });
    fireEvent.click(trigger);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeDefined();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    // Each option has a flag image
    const flagImages = listbox.querySelectorAll("img");
    expect(flagImages).toHaveLength(3);
  });
});

// T007: Highlights selected language with gold background
describe("LanguageSelector — selected highlight", () => {
  it("applies gold highlight to selected language and transparent to others", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    const options = screen.getAllByRole("option");
    const viOption = options[0];
    const enOption = options[1];

    expect(viOption.className).toContain("bg-[rgba(255,234,158,0.2)]");
    expect(enOption.className).not.toContain("bg-[rgba(255,234,158,0.2)]");
  });
});

// T008: Sets cookie and reloads on language selection
describe("LanguageSelector — language selection", () => {
  it("sets NEXT_LOCALE cookie and reloads when selecting a different language", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    const options = screen.getAllByRole("option");
    fireEvent.click(options[1]); // click EN

    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(reloadMock).toHaveBeenCalledOnce();
  });
});

// T009: Skips reload when selecting already-active language
describe("LanguageSelector — skip reload optimization", () => {
  it("closes dropdown without reload when selecting the current language", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    const options = screen.getAllByRole("option");
    fireEvent.click(options[0]); // click VN (already selected)

    expect(reloadMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});

// T015: Closes dropdown on outside click
describe("LanguageSelector — dismiss behavior", () => {
  it("closes dropdown on outside click without changing language", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));
    expect(screen.getByRole("listbox")).toBeDefined();

    // Click outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(reloadMock).not.toHaveBeenCalled();
  });

  // T016: Closes on Escape and returns focus
  it("closes dropdown on Escape and returns focus to trigger", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    const trigger = screen.getByRole("button", { name: "Select language" });
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeDefined();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});

// T017: ARIA attributes
describe("LanguageSelector — ARIA compliance", () => {
  it("has correct ARIA attributes on trigger", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    const trigger = screen.getByRole("button", { name: "Select language" });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-haspopup")).toBe("listbox");

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("has correct ARIA attributes on listbox and options", () => {
    render(<LanguageSelector currentLanguage="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    const listbox = screen.getByRole("listbox");
    expect(listbox.getAttribute("aria-label")).toBe("Language options");

    const options = screen.getAllByRole("option");
    expect(options[0].getAttribute("aria-selected")).toBe("false"); // vi
    expect(options[1].getAttribute("aria-selected")).toBe("true"); // en (current)
    expect(options[2].getAttribute("aria-selected")).toBe("false"); // ja
  });
});

// T018: Keyboard navigation
describe("LanguageSelector — keyboard navigation", () => {
  it("selects language via Enter key on option", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    const options = screen.getAllByRole("option");
    fireEvent.keyDown(options[2], { key: "Enter" }); // select JA

    expect(document.cookie).toContain("NEXT_LOCALE=ja");
    expect(reloadMock).toHaveBeenCalledOnce();
  });

  it("selects language via Space key on option", () => {
    render(<LanguageSelector currentLanguage="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    const options = screen.getAllByRole("option");
    fireEvent.keyDown(options[1], { key: " " }); // select EN

    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(reloadMock).toHaveBeenCalledOnce();
  });
});

// T019: Calls onOpen callback
describe("LanguageSelector — onOpen callback", () => {
  it("calls onOpen when dropdown opens", () => {
    const onOpenMock = vi.fn();
    render(<LanguageSelector currentLanguage="vi" onOpen={onOpenMock} />);
    fireEvent.click(screen.getByRole("button", { name: "Select language" }));

    expect(onOpenMock).toHaveBeenCalledOnce();
  });

  it("does not call onOpen when dropdown closes", () => {
    const onOpenMock = vi.fn();
    render(<LanguageSelector currentLanguage="vi" onOpen={onOpenMock} />);
    const trigger = screen.getByRole("button", { name: "Select language" });

    fireEvent.click(trigger); // open
    onOpenMock.mockClear();
    fireEvent.click(trigger); // close

    expect(onOpenMock).not.toHaveBeenCalled();
  });
});
