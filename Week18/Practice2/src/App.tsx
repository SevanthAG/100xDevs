import Post from "./Post";

function App() {
  const posts = [
    {
      name: "sevanth",
      content: "Hello",
    },
    {
      name: "Bahubali",
      content: "boom",
    },
  ];

  setInterval(() => {
    posts.push({
      name: "Bahubali",
      content: "boom",
    });
  }, 1000);

  return (
    <>
      <div>
        {posts.map((p) => (
          <Post name={p.name} content={p.content} />
        ))}
      </div>
    </>
  );
}

export default App;
