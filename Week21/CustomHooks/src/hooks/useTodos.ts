import axios from "axios";
import { useEffect, useState } from "react";

export function useTodos() {
    const [todo, setTodo] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      setTodo(response.data);
    });

    let interval = setInterval(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          setTodo(response.data);
        });
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return todo;
}