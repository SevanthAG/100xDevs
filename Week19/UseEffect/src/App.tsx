import { useState } from "react"
import Todo from "./Todo";

function App() {

  const [currentTodo, setCurrentTodo] = useState(1);

  return (
    <>
    <button onClick={() => {
      setCurrentTodo(1);
    }}>1</button>
    <button  onClick={() => {
      setCurrentTodo(2);
    }}>2</button>
    <button onClick={() => {
      setCurrentTodo(3);
    }}>3</button>
    <button onClick={() => {
      setCurrentTodo(4);
    }}>4</button>
    <button onClick={() => {
      setCurrentTodo(5);
    }}>5</button>
    <button onClick={() => {
      setCurrentTodo(6);
    }}>6</button>

    <Todo id = {currentTodo}/>

    </>
  )
}

export default App
