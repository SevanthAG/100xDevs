// ============================================================
// A tiny practice API for the Trello frontend.
//
// Run it:  bun run server   (from the project root)
// It listens on http://localhost:3001
//
// ZERO dependencies — uses Bun's built-in HTTP server.
//
// This is REAL backend logic, just simplified:
//   • Users are stored in memory → they disappear when the
//     server restarts. A real app would use a database.
//   • Tokens are random ids kept in memory too. A real app
//     would sign JWTs or store sessions properly.
//   • Passwords are hashed with SHA-256 (Bun.password) —
//     NEVER store raw passwords.
//
// The shape of each endpoint mirrors what a production auth API
// looks like, so swapping this for a real backend later only
// means changing URLs — not how the frontend works.
// ============================================================

const PORT = 3001

// ---------- "Database" (in-memory) ----------

type StoredUser = {
  id: string
  name: string
  email: string
  passwordHash: string
}

const users: StoredUser[] = []

// token → userId. In a real app this would be signed JWTs or DB sessions.
const tokens = new Map<string, string>()

// ---------- Helpers ----------

// A helper that sends JSON with the right headers and status code.
// Writing it once keeps every endpoint below short.
const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })

// Read + parse the request body. Returns null when invalid.
const readBody = async (request: Request): Promise<Record<string, unknown> | null> => {
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    return null
  }
}

// Validate an email with the same regex the frontend uses.
const isEmail = (value: string): boolean => /^\S+@\S+\.\S+$/.test(value)

// ---------- CORS ----------
// The frontend runs on :5173, this server on :3001 → different origins.
// Browsers block such requests unless the server explicitly allows them.
// For local dev, allow everything. Production would lock this down.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Preflight: the browser "asks permission" before a real request.
const preflight = (): Response => new Response(null, { status: 204, headers: corsHeaders })

// ---------- Endpoints ----------

// POST /api/auth/signup  { name, email, password }
const handleSignup = async (request: Request): Promise<Response> => {
  const body = await readBody(request)
  if (!body) return json({ message: "Invalid JSON body" }, 400)

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim().toLowerCase()
  const password = String(body.password ?? "")

  // Server-side validation — the frontend's checks are UX,
  // the server's checks are the real gatekeeper.
  if (name.length < 2) return json({ message: "Name must be at least 2 characters" }, 400)
  if (!isEmail(email)) return json({ message: "Enter a valid email address" }, 400)
  if (password.length < 8) return json({ message: "Password must be at least 8 characters" }, 400)

  // "Unique constraint" — emails must be unique, like in a real DB.
  if (users.some((user) => user.email === email)) {
    return json({ message: "This email is already registered. Try logging in instead." }, 409)
  }

  // Hash the password — the raw one is never stored anywhere.
  const passwordHash = await Bun.password.hash(password)

  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
  }
  users.push(user)

  // Issue a token the client sends with later requests to prove identity.
  const token = crypto.randomUUID()
  tokens.set(token, user.id)

  // We return the user WITHOUT passwordHash — never leak secrets.
  return json({ token, user: { id: user.id, name: user.name, email: user.email } }, 201)
}

// POST /api/auth/login  { email, password }
const handleLogin = async (request: Request): Promise<Response> => {
  const body = await readBody(request)
  if (!body) return json({ message: "Invalid JSON body" }, 400)

  const email = String(body.email ?? "").trim().toLowerCase()
  const password = String(body.password ?? "")

  const user = users.find((candidate) => candidate.email === email)

  // One message for both wrong email and wrong password — telling an
  // attacker which one exists is a security leak (user enumeration).
  const invalid = json({ message: "Invalid email or password" }, 401)
  if (!user) return invalid

  const ok = await Bun.password.verify(password, user.passwordHash)
  if (!ok) return invalid

  const token = crypto.randomUUID()
  tokens.set(token, user.id)

  return json({ token, user: { id: user.id, name: user.name, email: user.email } })
}

// GET /api/auth/me  (Authorization: Bearer <token>)
const handleMe = (request: Request): Response => {
  const header = request.headers.get("Authorization") ?? ""
  const token = header.replace("Bearer ", "")

  const userId = tokens.get(token)
  const user = users.find((candidate) => candidate.id === userId)

  if (!user) return json({ message: "Unauthorized" }, 401)

  return json({ user: { id: user.id, name: user.name, email: user.email } })
}

// ---------- Router ----------
// One function that inspects method + path and delegates. This is what
// frameworks like Express do for you under the hood.
const router = (request: Request): Promise<Response> | Response => {
  const url = new URL(request.url)
  const path = url.pathname

  if (request.method === "OPTIONS") return preflight()

  if (path === "/api/auth/signup" && request.method === "POST") return handleSignup(request)
  if (path === "/api/auth/login" && request.method === "POST") return handleLogin(request)
  if (path === "/api/auth/me" && request.method === "GET") return handleMe(request)

  return json({ message: `No route for ${request.method} ${path}` }, 404)
}

Bun.serve({ port: PORT, fetch: router })

console.log(`✅ Practice API running at http://localhost:${PORT}`)
console.log(`   POST /api/auth/signup  { name, email, password }`)
console.log(`   POST /api/auth/login   { email, password }`)
console.log(`   GET  /api/auth/me      (Authorization: Bearer <token>)`)
