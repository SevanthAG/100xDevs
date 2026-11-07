import DeleteButton from "./components/DeleteButton";

type todoType = {
  title: string;
  id: string;
  setTodo: any;
};
const Todo = ({ title, id, setTodo }: todoType) => {
  return (
    <div>
      <div>{title}</div>
      <DeleteButton id={id} setTodo={setTodo} />
    </div>
  );
};

export default Todo;
