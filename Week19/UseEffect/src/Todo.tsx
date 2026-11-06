import axios from "axios";
import { useEffect, useState } from "react";

const Todo = (props) => {
    const id = props.id;
    const [Todo, setTodo] = useState("");

    useEffect(()=> {
        axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(response => {
          setTodo(response.data.title);
        })

        let clock = setInterval(()=>{
          console.log("Hai Mey toh Call horaha hu"+ id)
        }, id*1000)

        return function() {
          clearInterval(clock);
        }
    }, [id])
  return (
    <div>
      {Todo}
    </div>
  )
}

export default Todo