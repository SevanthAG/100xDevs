import { WebSocketServer } from "ws";


interface Issue {
    id: number,
    title: string,
    section: string
}
const ISSUES: Issue[] = [{
    id: 1,
    title: "Fix G",
    section: "done"
},{
    id: 4,
    title: "Fix A",
    section: "todo"
}]

const wss = new WebSocketServer({port: 3005});
const connections = [];

wss.on("connection", (socket) => {
    connections.push(socket);

    socket.send(JSON.stringify({
        type: "initial_state",
        issues: ISSUES
    }))

    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString())
        if(parsedData.type == "issue_added"){
            const newIssue = {
                title:parsedData.title,
                section: parsedData.section,
                id: Math.random()
            }
            ISSUES.push(newIssue)
            connections.forEach(s => s.send(JSON.stringify({
                type: "issue_added",
                issue : newIssue
            })))
        }
    })
})