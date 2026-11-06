import axios from "axios";
import Post from "./Post";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
    setData(response.data);
  });

  return (
    <>
      <div>
        {data.map((d) => (
          <Post title={d.title} />
        ))}
      </div>
    </>
  );
}

export default App;