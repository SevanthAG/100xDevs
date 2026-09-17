import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { getUser } from "../lib/storage"

// GUARD COMPONENT — wraps pages that require a login.
//
// How it works:
//   <ProtectedRoute><Dashboard /></ProtectedRoute>
//   → children render ONLY if a user is stored.
//   → otherwise <Navigate> performs a redirect (renders nothing itself).
//
// `children` is typed as ReactNode: "anything renderable" — a component,
// several elements, text, etc. This is how wrapper components accept
// content from their parent.
type Props = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = getUser()

  if (!user) {
    // replace: true swaps the current history entry instead of pushing a
    // new one — so the Back button won't bounce the user into a page
    // they were just kicked out of.
    return <Navigate to="/signup" replace />
  }

  // Logged in → render the page that was requested.
  return children
}
