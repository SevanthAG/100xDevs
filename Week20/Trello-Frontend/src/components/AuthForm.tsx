import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router"
import { ApiError, login, signup } from "../lib/api"
import { saveToken, saveUser } from "../lib/storage"

// "signup" or "login" — one form component handles both, which is why
// the old Login.tsx is now called AuthForm.
type AuthMode = "signup" | "login"

// Each field can hold an error message, or be undefined (= no error).
// Partial<Record<...>> means "all three keys are optional".
type FieldErrors = Partial<Record<"name" | "email" | "password", string>>

export const AuthForm = () => {
  const navigate = useNavigate()

  // useState gives you a piece of memory for the component.
  //   [value, setValue] = the value itself + the function to change it.
  // Changing state with the setter re-renders the component with new values.

  // Which version of the form we're showing
  const [mode, setMode] = useState<AuthMode>("signup")

  // These inputs are "controlled": React state is the single source of
  // truth for what's typed in each box (value + onChange below).
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Validation errors per field, filled in when the user submits
  const [errors, setErrors] = useState<FieldErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  // True while the fake API call runs — disables the button + shows a spinner
  const [isLoading, setIsLoading] = useState(false)
  // Errors "from the server" (e.g. email already taken), shown as a banner
  const [serverError, setServerError] = useState("")

  // Returns true if everything is valid; fills `errors` if not.
  const validate = (): boolean => {
    const next: FieldErrors = {}

    if (mode === "signup" && name.trim().length < 2) {
      next.name = "Name must be at least 2 characters"
    }
    // Regex: something@something.something
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Enter a valid email address"
    }
    if (password.length < 8) {
      next.password = "Password must be at least 8 characters"
    }

    setErrors(next)
    // No keys in the object = no errors
    return Object.keys(next).length === 0
  }

  // `async` — this function waits for the network. `await` pauses here
  // until the server answers, without freezing the page.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Forms normally reload the whole page — preventDefault stops that.
    event.preventDefault()

    if (!validate()) return // invalid → stay here, errors are shown below

    setIsLoading(true)
    setServerError("")

    try {
      // THE REAL API CALL — signup or login depending on the mode.
      // Both return { token, user } from the server.
      const response =
        mode === "signup"
          ? await signup(name.trim(), email.trim(), password)
          : await login(email.trim(), password)

      // Success: remember the session, then go to the dashboard.
      saveToken(response.token) // the credential for future requests
      saveUser(response.user) // the profile the navbar displays
      navigate("/dashboard")
    } catch (error) {
      // Any failure lands here: 409 email taken, 401 wrong password,
      // or the server being unreachable. Show the server's message.
      if (error instanceof ApiError) {
        setServerError(error.message)
      } else {
        setServerError("Something went wrong. Please try again.")
      }
    } finally {
      // `finally` runs on success AND failure — perfect for cleanup.
      // Never leave the button stuck in "loading".
      setIsLoading(false)
    }
  }

  // Switching modes resets errors so old messages don't linger
  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setErrors({})
    setServerError("")
  }

  return (
    <form className="auth-form-card" onSubmit={handleSubmit} noValidate>
      <h2 className="auth-form-title">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h2>
      <p className="auth-form-subtitle">
        {mode === "signup"
          ? "Start organizing your projects in minutes."
          : "Log in to pick up where you left off."}
      </p>

      {/* && means "only render this if the left side is truthy" */}
      {serverError && <div className="form-banner">{serverError}</div>}

      {/* The name field only exists in signup mode */}
      {mode === "signup" && (
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            className={`form-input ${errors.name ? "input-invalid" : ""}`}
            type="text"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>
      )}

      <div className="form-field">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={`form-input ${errors.email ? "input-invalid" : ""}`}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <p className="input-error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <div className="password-wrap">
          <input
            id="password"
            className={`form-input ${errors.password ? "input-invalid" : ""}`}
            // Toggle between hidden and visible text
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* type="button" so clicking it does NOT submit the form */}
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="input-error">{errors.password}</p>}
      </div>

      <button className="btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner" />
            Please wait…
          </>
        ) : mode === "signup" ? (
          "Sign up"
        ) : (
          "Log in"
        )}
      </button>

      <p className="form-footer">
        {mode === "signup" ? "Already have an account?" : "New to Trello?"}{" "}
        <button
          type="button"
          onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
        >
          {mode === "signup" ? "Log in" : "Sign up"}
        </button>
      </p>
    </form>
  )
}
