import { useTodos } from "./hooks/useTodos";
import Todo from "./Todo";
import { setTodosContext } from "./context/context";

const App = () => {
  let { todo, setTodo } = useTodos();

  return (
    <setTodosContext.Provider value={{setTodo}}>
      <div>
        {todo.map((t) => (
          <Todo title={t.title} id={t.id} setTodo={setTodo} />
        ))}
      </div>
    </setTodosContext.Provider>
  );
};

export default App;
