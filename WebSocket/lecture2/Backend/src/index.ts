import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allUser: User[] = [];

wss.on("connection", (socket) => {
  console.log("user Connected..!!");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      allUser.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      const currentUserRoom = allUser.find((u) => u.socket == socket)?.room;

      allUser.forEach((user) => {
        if (user.room === currentUserRoom) {
          user.socket.send(parsedMessage.payload.message);
        }
      });
    }
  });
});
