import axios from "axios";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);

  async function handleSubmit() {
    try {
      const response = await axios.post("http://localhost:3000/todo", {
        title,
        description,
      });

      setTodo((prev) => [...prev, response.data.todo]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
