import { useEffect, useRef, useState } from "react";
import "./index.css";

function App() {
  const [message, setMessage] = useState(["Hi there", "hello"]);
  const wsef = useRef();
  const inputRef = useRef(null);

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = (event) => {
      setMessage(prev => [...prev, event.data])
    }

    wsef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId : "red"
        }
      }))
    }

  },[])
  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <div className="h-[90%] overflow-y-auto text-white p-2">
        {message.map((message)=>(
         <div key={message}>{message}</div> 
        ))}

      </div>
      <div className="h-[10%] flex bg-blue-300">
        <input ref={inputRef}
          className="flex-1 min-w-0 px-2"
          type="text"
          placeholder="Enter Messages..!!"
        />
        <button className="shrink-0 bg-green-300 px-3" onClick={()=>{
          const value = inputRef.current.value;
          setMessage(prev => [...prev, value])
          wsef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: value
            }
          }))
        }}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
