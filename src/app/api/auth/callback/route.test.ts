import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";

const mockExchangeCodeForSession = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
  createClient: vi.fn(() =>
    Promise.resolve({
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession,
        signOut: mockSignOut,
      },
    })
  ),
}));

function makeRequest(url: string) {
  return new Request(url);
}

describe("GET /api/auth/callback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /login?error=auth_failed when code is missing", async () => {
    const request = makeRequest("http://localhost:3000/api/auth/callback");
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login?error=auth_failed"
    );
  });

  it("exchanges code for session and redirects to / on success", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { user: { email: "user@sun-asterisk.com" } },
      error: null,
    });

    const request = makeRequest(
      "http://localhost:3000/api/auth/callback?code=valid_code"
    );
    const response = await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid_code");
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("redirects to /login?error=auth_failed when exchange fails", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: {},
      error: new Error("Invalid code"),
    });

    const request = makeRequest(
      "http://localhost:3000/api/auth/callback?code=bad_code"
    );
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login?error=auth_failed"
    );
  });

  it("rejects non-sun-asterisk.com email and signs out", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { user: { email: "user@gmail.com" } },
      error: null,
    });

    const request = makeRequest(
      "http://localhost:3000/api/auth/callback?code=valid_code"
    );
    const response = await GET(request);

    expect(mockSignOut).toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login?error=auth_failed"
    );
  });

  it("rejects when user has no email", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { user: { email: null } },
      error: null,
    });

    const request = makeRequest(
      "http://localhost:3000/api/auth/callback?code=valid_code"
    );
    const response = await GET(request);

    expect(mockSignOut).toHaveBeenCalled();
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/login?error=auth_failed"
    );
  });
});
