import "./index.css";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";

// const Backend_Endpoint = "http://localhost:3001"

export function App() {
  const [issues, setIssues] = useState([])
  const [ws, setWs] = useState()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3005")
    setWs(ws);
    ws.onmessage = (ev) => {
      const data = ev.data;
      const parsedData = JSON.parse(data)

      if (parsedData.type == "initial_state") {
        setIssues(parsedData.issues)
      }
      if (parsedData.type == "issue_added") {
        setIssues(i => [...i, parsedData.issue]);
      }

      if (parsedData.type == "Issue_deleted") {
        setIssues(issues => issues.filter(x => x.id != parsedData.issueId))
      }
      
    }

  }, [])
  return (

    <div className="flex">
      <div className="flex-1">
        Todo
        <Input id="todo" type="text" placeholder="issue Title" />
        <button className="border"
          onClick={() => {
            ws.send(JSON.stringify({
              type: "issue_added",
              title: document.getElementById("todo").value,
              section: "todo"
            }))
          }}>Add issue</button>
        {issues.filter(i => i.section == "todo").map(issue => <Card ws={ws} id={issue.id} title={issue.title} />)}
      </div>

      <div className="flex-1">
        On Progress
        <Input id="onProgress" type="text" placeholder="issue Title" />
        <button className="border"
          onClick={() => {
            ws.send(JSON.stringify({
              type: "issue_added",
              title: document.getElementById("onProgress").value,
              section: "onProgress"
            }))
          }}>Add Issue</button>
        {issues.filter(i => i.section == "onProgress").map(issue => <Card ws={ws} id={issue.id} title={issue.title} />)}
      </div>

      <div className="flex-1">
        Done
        <Input id="done" type="text" placeholder="issue Title" />
        <button className="border" onClick={() => {
          ws.send(JSON.stringify({
            type: "issue_added",
            title: document.getElementById("done").value,
            section: "done"
          }))
        }}>Add Issue</button>
        {issues.filter(i => i.section == "done").map(issue => <Card ws={ws} id={issue.id} title={issue.title} />)}
      </div>
    </div>
  );
}

function Card({ ws ,title, id }) {
  return <div className="border m-4 p-4">
    {title}
    <button className="border m-6" 
    onClick={()=> {
      ws.send(JSON.stringify({
        type: "Issue_deleted",
        issueId: id
      }))
}}>Delete</button>
  </div>
}

export default App;
