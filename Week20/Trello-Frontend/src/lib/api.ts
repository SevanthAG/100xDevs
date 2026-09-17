// ============================================================
// The FRONTEND side of talking to the backend.
//
// All network calls live in ONE file. Components never call
// fetch directly — if the API changes, you update this file only.
// This layer is often called an "API client".
// ============================================================

const API_URL = "http://localhost:3001"

// The shape the backend returns for auth responses.
export type AuthResponse = {
  token: string
  user: { id: string; name: string; email: string }
}

// The shape of an error response from our API.
type ApiErrorBody = { message?: string }

// A custom error carrying the HTTP status + server message.
// Throwing a real class (not just a string) lets callers
// distinguish API errors from other bugs.
export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

// The shared fetch wrapper every endpoint uses.
//
// `async/await` lets us write asynchronous code (waiting for the
// network) that reads top-to-bottom instead of nested callbacks.
const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options, // method + body come from the caller
    })
  } catch {
    // fetch only throws on NETWORK failures (server off, no WiFi…).
    // HTTP errors like 401 do NOT throw — we handle those below.
    throw new ApiError("Cannot reach the server. Is it running on port 3001?", 0)
  }

  // Try to read the server's error message, if it sent JSON.
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const body = (await response.json()) as ApiErrorBody
      if (body.message) message = body.message
    } catch {
      // Response wasn't JSON — keep the generic message.
    }
    throw new ApiError(message, response.status)
  }

  return (await response.json()) as T
}

// POST /api/auth/signup — creates the account, returns token + user.
export const signup = (name: string, email: string, password: string): Promise<AuthResponse> =>
  request<AuthResponse>("/api/auth/signup", {
    method: "POST",
    // fetch can't send objects — only strings. JSON.stringify converts.
    body: JSON.stringify({ name, email, password }),
  })

// POST /api/auth/login — verifies credentials, returns token + user.
export const login = (email: string, password: string): Promise<AuthResponse> =>
  request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
