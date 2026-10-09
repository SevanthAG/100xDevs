// import axios from "axios";
// import "./index.css";
// import { useEffect, useState } from "react";
// import { Input } from "./components/ui/input";

// const Backend_Endpoint = "http://localhost:3001"

// export function App() {
//   const [issues, setIssues] = useState([])

//   useEffect(() => {
//     setInterval(() => {

//       axios.get(`${Backend_Endpoint}/issues`)
//         .then(respose => {
//           setIssues(respose.data.issues)
//         })
//     }, 5000)

//     axios.get(`${Backend_Endpoint}/issues`)
//         .then(respose => {
//           setIssues(respose.data.issues)
//         })
//   }, [])
//   return (

//     <div className="flex">
//       <div className="flex-1">
//         Todo
//         <Input id="todoInput" type="text" placeholder="issue Title" />
//         <button className="border"
//          onClick={() => {
//           axios.post(`${Backend_Endpoint}/issue`, {
//             title: document.getElementById("todoInput").value,
//             section: "todo"
//           })
//         }}>Add issue</button>
//         {issues.filter(i => i.section == "todo").map(issue => <Card title={issue.title} />)}
//       </div>

//       <div className="flex-1">
//         On Progress
//         <Input id="onProgress" type="text" placeholder="issue Title" />
//         <button className="border" 
//         onClick={() => {
//           axios.post(`${Backend_Endpoint}/issue`, {
//             title: document.getElementById("onProgress").value,
//             section: "on_progress"
//           })
//         }}>Add Issue</button>
//         {issues.filter(i => i.section == "on_progress").map(issue => <Card title={issue.title} />)}
//       </div>

//       <div className="flex-1">
//         Done
//         <Input id="done" type="text" placeholder="issue Title" />
//         <button className="border" onClick={() => {
//           axios.post(`${Backend_Endpoint}/issue`, {
//             title: document.getElementById("done").value,
//             section: "done"
//           })
//         }}>Add Issue</button>
//         {issues.filter(i => i.section == "done").map(issue => <Card title={issue.title} />)}
//       </div>
//     </div>
//   );
// }

// function Card({ title }) {
//   return <div className="border m-4 p-4">
//     {title}
//   </div>
// }

// export default App;
