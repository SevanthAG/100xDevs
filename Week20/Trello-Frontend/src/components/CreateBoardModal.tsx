import { useEffect, useState } from "react"
import type { Board } from "../lib/storage"
import { createId } from "../lib/storage"

// Color options for a new board. `color` is used as the card's
// background, `dark` is a darker variant for the title bar.
const COLORS = [
  { color: "#4f46e5", dark: "#3730a3" },
  { color: "#0d9488", dark: "#115e59" },
  { color: "#db2777", dark: "#9d174d" },
  { color: "#ea580c", dark: "#9a3412" },
  { color: "#2563eb", dark: "#1e40af" },
  { color: "#7c3aed", dark: "#5b21b6" },
]

type Props = {
  // `open` decides whether the modal is visible at all
  open: boolean
  // Parent needs to know when the user is done (close without saving)
  onClose: () => void
  // Parent receives the finished board and decides what to do with it
  onCreate: (board: Board) => void
}

export const CreateBoardModal = ({ open, onClose, onCreate }: Props) => {
  // Modal-local state: title being typed and which color is picked.
  const [title, setTitle] = useState("")
  const [selected, setSelected] = useState(COLORS[0])
  const [error, setError] = useState("")

  // Pressing Escape closes the modal — a small UX nicety.
  useEffect(() => {
    if (!open) return // only listen while the modal is open
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    // Cleanup: remove the listener when the modal closes or unmounts,
    // otherwise listeners pile up every time the modal opens.
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null // render nothing when closed

  const handleCreate = () => {
    const trimmed = title.trim()
    if (!trimmed) {
      setError("Please give your board a name")
      return
    }
    // Build the board object and hand it UP to the parent (Dashboard).
    // The modal doesn't save it — the parent owns the boards list.
    onCreate({
      id: createId(),
      title: trimmed,
      color: selected.color,
      dark: selected.dark,
      createdAt: Date.now(),
    })
  }

  return (
    // Clicking the dark backdrop also closes the modal
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation: clicks INSIDE the card must not close it */}
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <h3 className="modal-title">Create board</h3>

        <div className="form-field">
          <label className="form-label" htmlFor="board-title">
            Board title
          </label>
          <input
            id="board-title"
            className={`form-input ${error ? "input-invalid" : ""}`}
            type="text"
            placeholder="e.g. Marketing Launch Plan"
            value={title}
            // Focus the input as soon as the modal opens
            autoFocus
            onChange={(event) => {
              setTitle(event.target.value)
              setError("") // clear the error as soon as the user types
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleCreate()
            }}
          />
          {error && <p className="input-error">{error}</p>}
        </div>

        <div className="form-field">
          <span className="form-label">Background</span>
          <div className="color-row">
            {COLORS.map((option) => (
              <button
                key={option.color}
                type="button"
                className={`color-swatch ${selected.color === option.color ? "color-selected" : ""}`}
                style={{ backgroundColor: option.color }}
                onClick={() => setSelected(option)}
                aria-label={`Color ${option.color}`}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary modal-create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
