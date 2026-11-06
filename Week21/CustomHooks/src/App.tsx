import { useTodos } from "./hooks/useTodos";

const App = () => {
  let todo = useTodos();

  return (
    <div>
      {todo.map((t) => (
        <div> {t.title}</div>
      ))}
    </div>
  );
};

export default App;
