import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [ws, setWs] = useState();
  const inputRef = useRef(null)

  function handleSubmit() {
    if(!ws){
      return
    }
    ws.send("Hello");
    console.log(inputRef.current.value)
  }

  useEffect(()=>{
    // const ws = new WebSocket("ws://localhost:8080");
    setWs(ws);

    


  })
  return (
    <div>
      <input ref={inputRef} type='text' placeholder='Enter Message..!!' /> 
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}

export default App
