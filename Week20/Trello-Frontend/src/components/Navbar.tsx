import { useNavigate } from "react-router"
import { clearToken, clearUser, getUser } from "../lib/storage"

// Top bar used by Dashboard (and later the Board page).
// Shows the logo, the logged-in user's name, an avatar and logout.
export const Navbar = () => {
  const navigate = useNavigate()

  const user = getUser()

  const handleLogout = () => {
    // Wipe the session (both the profile AND the auth token) and go
    // back to the auth page. replace: true → the dashboard page is
    // removed from browser history, so "Back" won't return the user
    // to a logged-in page.
    clearToken()
    clearUser()
    navigate("/signup", { replace: true })
  }

  // First letter of the name → the avatar circle. Fallback "?" if no user.
  const initial = user?.name?.trim()?.charAt(0).toUpperCase() || "?"

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="#4f46e5" />
          <rect x="4.5" y="4.5" width="6" height="12" rx="1.5" fill="white" />
          <rect x="13.5" y="4.5" width="6" height="8" rx="1.5" fill="white" opacity="0.55" />
        </svg>
        Trello
      </div>

      <div className="navbar-right">
        <span className="navbar-user">{user?.name ?? "Guest"}</span>
        <div className="navbar-avatar" title={user?.email ?? ""}>
          {initial}
        </div>
        <button className="btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
