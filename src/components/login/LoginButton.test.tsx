import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginButton } from "./LoginButton";
import type { Dictionary } from "@/libs/i18n";

const mockDictionary: Dictionary = {
  description_line1: "Test line 1",
  description_line2: "Test line 2",
  login_button: "LOGIN With Google",
  footer_copyright: "Copyright",
  error_login_failed: "Login failed. Please try again.",
};

// Mock next/navigation
const mockGet = vi.fn();
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

// Mock Supabase client
const mockSignInWithOAuth = vi.fn();
vi.mock("@/libs/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  }),
}));

describe("LoginButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGet.mockReturnValue(null);
    mockSignInWithOAuth.mockResolvedValue({ error: null });
  });

  it("renders button text and Google icon", () => {
    render(<LoginButton dictionary={mockDictionary} />);
    expect(screen.getByText("LOGIN With Google")).toBeDefined();
    expect(screen.getByLabelText("Login with Google")).toBeDefined();
  });

  it("calls signInWithOAuth on click", async () => {
    render(<LoginButton dictionary={mockDictionary} />);
    const button = screen.getByLabelText("Login with Google");
    fireEvent.click(button);

    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: expect.stringContaining("/api/auth/callback"),
      },
    });
  });

  it("disables button when loading", () => {
    render(<LoginButton dictionary={mockDictionary} />);
    const button = screen.getByLabelText("Login with Google");
    fireEvent.click(button);

    expect(button).toHaveProperty("disabled", true);
  });

  it("displays error message from URL param", () => {
    mockGet.mockReturnValue("auth_failed");
    render(<LoginButton dictionary={mockDictionary} />);

    expect(screen.getByText("Login failed. Please try again.")).toBeDefined();
  });

  it("hides error message when no error param", () => {
    mockGet.mockReturnValue(null);
    render(<LoginButton dictionary={mockDictionary} />);

    expect(screen.queryByText("Login failed. Please try again.")).toBeNull();
  });
});
