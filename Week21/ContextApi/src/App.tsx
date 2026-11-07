import { useTodos } from "./hooks/useTodos";
import Todo from "./Todo";
import { setTodosContext } from "./context";
type todoType = {
  title: string;
  id: string;
};

const App = () => {
  let { todo, setTodo } = useTodos();

  return (
    <setTodosContext.Provider value={{setTodo}}>
      <div>
        {todo.map((t) => (
          <Todo title={t.title} id={t.id} />
        ))}
      </div>
    </setTodosContext.Provider>
  );
};

export default App;
