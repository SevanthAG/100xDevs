import { LeftAuth } from "../components/LeftAuth"
import { RightAuth } from "../components/RightAuth"

export const Auth = () => {
  return (
    <div className="auth-page">
      <LeftAuth />
      <RightAuth />
    </div>
  )
}
