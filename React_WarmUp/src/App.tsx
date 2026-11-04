import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((currentValue) => currentValue + 1);
  }

  useEffect(() => {
    setInterval(increaseCount, 1000);
  }, []);

  return <>{count}</>;
}

export default App;
