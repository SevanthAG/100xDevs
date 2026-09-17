import { useState } from "react"
import { Link, useParams } from "react-router"
import { Navbar } from "../components/Navbar"
// Alias the type so it doesn't collide with the `Board` component below.
import type { Board as BoardData } from "../lib/storage"
import { getBoards } from "../lib/storage"

// useParams gives you the URL placeholders defined in the route:
//   <Route path="/board/:boardId" ...>  →  params.boardId
export const Board = () => {
  const { boardId } = useParams()

  // Read once on mount. Boards come from storage; a real app would
  // fetch the board from an API instead.
  const [board] = useState<BoardData | undefined>(() =>
    getBoards().find((board) => board.id === boardId),
  )

  // Unknown id (e.g. bookmarked a deleted board) → show a friendly fallback
  if (!board) {
    return (
      <div className="board-page">
        <Navbar />
        <main className="board-missing">
          <h1>Board not found</h1>
          <p>This board may have been deleted.</p>
          <Link className="btn-primary board-missing-btn" to="/dashboard">
            Back to dashboard
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="board-page" style={{ background: `linear-gradient(135deg, ${board.color} 0%, ${board.dark} 100%)` }}>
      <Navbar />

      <main className="board-main">
        <h1 className="board-title">{board.title}</h1>

        {/* Placeholder lists — building real drag & drop lists/cards
            is the natural next step for this screen. */}
        <div className="list-row">
          <div className="list-column">
            <h3>To Do</h3>
            <div className="list-card">Brainstorm launch ideas</div>
            <div className="list-card">Write project spec</div>
          </div>
          <div className="list-column">
            <h3>In Progress</h3>
            <div className="list-card">Design the dashboard UI</div>
          </div>
          <div className="list-column">
            <h3>Done</h3>
            <div className="list-card">Set up the project</div>
          </div>
        </div>
      </main>
    </div>
  )
}
