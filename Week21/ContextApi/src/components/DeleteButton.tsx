import { useContext } from "react";
import { setTodosContext } from "../context";


type todoType = {
  title: string;
  id: string;
};

const { setTodo } = useContext(setTodosContext);

const DeleteButton = ({ id }: todoType) => {
  return (
    <div>
      <button
        onClick={() => {
          setTodo((todo) => todo.filter((x) => x.id != id));
        }}
      >
        Delete Todo
      </button>
    </div>
  );
};

export default DeleteButton;
