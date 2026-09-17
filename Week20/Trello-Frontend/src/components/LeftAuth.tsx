// The LEFT side of the auth page: pure branding, no logic here.
// Its only job is to look good — the real interactivity lives in AuthForm.

// Rendered as a list with .map() — good React practice:
// data goes in an array, JSX comes out, each item needs a unique "key".
const features = [
  {
    id: "boards",
    text: "Boards, lists and cards that match how you think",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
        <path d="M15 3v10" />
      </svg>
    ),
  },
  {
    id: "team",
    text: "Collaborate with your team in real time",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "drag",
    text: "Move tasks across your board with drag and drop",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

export const LeftAuth = () => {
  return (
    <div className="auth-brand">
      <div className="brand-logo">
        {/* Simple Trello-style logo mark drawn with SVG (no image file needed) */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="white" />
          <rect x="4.5" y="4.5" width="6" height="12" rx="1.5" fill="#4f46e5" />
          <rect x="13.5" y="4.5" width="6" height="8" rx="1.5" fill="#4f46e5" opacity="0.55" />
        </svg>
        Trello
      </div>

      <h1 className="brand-title">Organize your work and life, finally.</h1>
      <p className="brand-subtitle">
        Trello keeps everything on one board — see what's being worked on,
        who's working on what, and where each task stands.
      </p>

      <ul className="brand-features">
        {features.map((feature) => (
          <li key={feature.id}>
            <span className="feature-icon">{feature.icon}</span>
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
