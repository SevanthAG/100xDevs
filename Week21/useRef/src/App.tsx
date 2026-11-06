import { useRef, useState } from "react";

function App() {
  const [second, setSecond] = useState(0);
  let interval = useRef(0);

  function startClock() {
    interval.current = setInterval(()=>{
      setSecond(prev => prev + 1);
    }, 1000)
  }

  function stopClock() {
    clearInterval(interval.current);
    interval.current = 0;
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="text-6xl">
        <div className="text-sm flex justify-center">
          <button onClick={startClock} className="m-2 border rounded-2xl p-2">
            Start Clock
          </button>
          <button onClick={stopClock} className="m-2 border rounded-2xl p-2">
            Stop Clock
          </button>
        </div>
        <div>{second}s</div>
      </div>
    </div>
  );
}

export default App;
