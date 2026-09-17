import { BrowserRouter, Routes, Route } from 'react-router'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Board } from './screens/Board'
import { Dashboard } from './screens/Dashboard'
import { Auth } from './screens/Auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Auth />} />

        {/* These two pages need a logged-in user. ProtectedRoute checks
            and redirects to /signup if not. */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/board/:boardId'
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
