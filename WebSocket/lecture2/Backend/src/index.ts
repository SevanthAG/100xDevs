import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allUser: WebSocket[] = [];

wss.on("connection", (socket) => {
    allUser.push(socket);
  userCount += 1;
  console.log("user Connected #" + userCount);
  socket.on("message", (message) => {
    console.log("msg Recived " + message.toString());
    for(let i = 0; i <allUser.length; i++){
        const s = allUser[i];
        if(!s){
            return;
        }
        s.send(message.toString() + "Sendby server..!!");

    }
  });
});
