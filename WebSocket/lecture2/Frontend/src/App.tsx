import { useEffect } from 'react'
import './App.css'

function App() {

  function handleSubmit() {

  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    
  })
  return (
    <div>
      <input type='text' placeholder='Enter Message..!!' /> 
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}

export default App
