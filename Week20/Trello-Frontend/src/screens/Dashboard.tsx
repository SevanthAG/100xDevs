import { useState } from "react"
import { useNavigate } from "react-router"
import { Navbar } from "../components/Navbar"
import { CreateBoardModal } from "../components/CreateBoardModal"
import type { Board } from "../lib/storage"
import { getBoards, getUser, saveBoards } from "../lib/storage"

export const Dashboard = () => {
  const navigate = useNavigate()

  // useState can take a FUNCTION: it runs once when the component first
  // renders. Perfect for "read localStorage once at startup" — doing
  // `useState(getBoards())` directly would read on EVERY render.
  const [boards, setBoards] = useState<Board[]>(() => getBoards())

  // Is the create-board modal open?
  const [modalOpen, setModalOpen] = useState(false)

  // Track which board is pending deletion → shows the confirm state on the card
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  const user = getUser()

  const handleCreate = (board: Board) => {
    // NEVER mutate state directly (boards.push(...) ✗).
    // Create a NEW array instead: old boards + the new one at the front.
    const next = [board, ...boards]
    setBoards(next)
    saveBoards(next) // persist so a refresh keeps the data
    setModalOpen(false) // close the modal
  }

  const handleDelete = (id: string) => {
    // .filter() keeps every board whose id is NOT the one being deleted.
    const next = boards.filter((board) => board.id !== id)
    setBoards(next)
    saveBoards(next)
    setConfirmingId(null) // leave confirm state
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              {user?.name ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Your boards"}
            </h1>
            <p className="dashboard-subtitle">
              {boards.length === 0
                ? "Create your first board to get started."
                : `You have ${boards.length} ${boards.length === 1 ? "board" : "boards"}.`}
            </p>
          </div>
          <button className="btn-primary dashboard-create-btn" onClick={() => setModalOpen(true)}>
            + Create board
          </button>
        </div>

        {/* Empty state: no boards yet → show a friendly hint instead of nothing */}
        {boards.length === 0 ? (
          <div className="empty-state">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M15 3v10" />
            </svg>
            <h2>No boards yet</h2>
            <p>Boards are where you organize tasks into lists and cards.</p>
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              Create your first board
            </button>
          </div>
        ) : (
          <div className="board-grid">
            {/* .map() turns each board object into JSX. key={board.id}
                lets React track which card is which. */}
            {boards.map((board) => (
              <div
                key={board.id}
                className="board-card"
                style={{ backgroundColor: board.color }}
                onClick={() => navigate(`/board/${board.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") navigate(`/board/${board.id}`)
                }}
              >
                {/* Confirm overlay replaces the card content while deleting */}
                {confirmingId === board.id ? (
                  <div className="board-card-confirm" onClick={(event) => event.stopPropagation()}>
                    <p>Delete "{board.title}"?</p>
                    <div className="confirm-actions">
                      <button className="btn-danger" onClick={() => handleDelete(board.id)}>
                        Delete
                      </button>
                      <button className="btn-ghost light" onClick={() => setConfirmingId(null)}>
                        Cancel
        </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="board-card-title">{board.title}</h3>
                    <div className="board-card-footer">
                      <span className="board-card-badge">Personal</span>
                      <button
                        className="board-card-delete"
                        title="Delete board"
                        onClick={(event) => {
                          // stopPropagation: don't open the board when
                          // clicking delete — only the card click opens.
                          event.stopPropagation()
                          setConfirmingId(board.id)
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <CreateBoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}
