
const Post = (props) => {
  return (
    <div>
        <h1>{props.name}</h1>

        <p>{props.content}</p>
    </div>
  )
}

export default Post