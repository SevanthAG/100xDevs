import { useTodos } from "./hooks/useTodos";
import Todo from "./Todo";

const App = () => {
  let { todo, setTodo } = useTodos();

  return (
    <div>
      {todo.map((t) => (
        <Todo title={t.title} id={t.id} setTodo={setTodo} />
      ))}
    </div>
  );
};

export default App;
