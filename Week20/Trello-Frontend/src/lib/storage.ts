// ============================================================
// Shared types + localStorage helpers.
//
// WHY a separate file? Both Dashboard and Board need to read the
// same boards. Keeping the logic in ONE place (DRY principle)
// means if we change how storage works, we change it here only.
// ============================================================

// A Board is just data — a title, colors, and a timestamp.
// `color` is the main background, `dark` is a darker shade used
// for gradients (e.g. the board page background).
export type Board = {
  id: string
  title: string
  color: string
  dark: string
  createdAt: number
}

// The keys we use in localStorage. Storing user data under
// `trello:boards:<email>` gives every account its own boards.
const BOARDS_KEY = "trello:boards"
const USER_KEY = "trello:user"
const TOKEN_KEY = "trello:token"

// The token proves WHO you are to the server on every request.
// It must live separately from the user object — one is data,
// the other is a credential (like a session cookie).

// Generate a reasonably unique id without extra libraries.
export const createId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

// ---------- User ----------

export type StoredUser = {
  name: string
  email: string
}

export const getUser = (): StoredUser | null => {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredUser
  } catch {
    // Corrupted JSON → treat as not logged in
    return null
  }
}

export const saveUser = (user: StoredUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const clearUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

// ---------- Auth token ----------

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// ---------- Boards ----------

export const getBoards = (): Board[] => {
  const raw = localStorage.getItem(BOARDS_KEY)
  if (!raw) return []
  try {
    // JSON.parse turns the stored string back into a Board[].
    // `?? []` guards against null being stored.
    return (JSON.parse(raw) as Board[]) ?? []
  } catch {
    return []
  }
}

export const saveBoards = (boards: Board[]): void => {
  localStorage.setItem(BOARDS_KEY, JSON.stringify(boards))
}
