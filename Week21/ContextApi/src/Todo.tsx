import DeleteButton from "./components/DeleteButton";

type todoType = {
  title: string;
  id: string;
};

const Todo = ({ title, id }: todoType) => {
  return (
    <div>
      <div>{title}</div>
      <DeleteButton id={id} />
    </div>
  );
};

export default Todo;
