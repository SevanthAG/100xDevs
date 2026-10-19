import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();


  function handleSubmit() {
    if(!socket){
      return;
    }
    const message = inputRef.current.value;
    // @ts-ignore
    socket.send(message);
  }

  useEffect(()=> {
    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data)
    }
  }, [])
  return (
    <div>
      <input ref={inputRef} type='text' placeholder='Enter Something....'/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
