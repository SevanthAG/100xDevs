function App() {
  return (
    <>
      <h1>Linked....</h1>

      <Post
        name="Sevanth"
        details="Hello, this is my first post!"
      />

      <Post
        name="Rahul"
        details="Learning React is actually fun 🚀"
      />
    </>
  );
}

type PostProps = {
  name: string;
  details: string;
};


function Post(props: PostProps) {
  return (
    <div
      style={{
        margin: "20px",
        padding: "15px",
        width: "400px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        {props.name}
      </div>

      <div>
        {props.details}
      </div>
    </div>
  );
}

export default App;
