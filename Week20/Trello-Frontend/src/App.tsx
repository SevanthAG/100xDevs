import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import { Board } from './screens/Board'
import { Dashboard } from './screens/Dashboard'
import { Auth } from './screens/Auth'

function App() {

  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
