type todoType = {
  title: string;
  id: string;
  setTodo: any;
};

const DeleteButton = ({id, setTodo}: todoType) => {
  return (
    <div>
        <button onClick={()=>{
            setTodo(todo => todo.filter(x => x.id != id))
        }}>Delete Todo</button>
    </div>
  )
}

export default DeleteButton