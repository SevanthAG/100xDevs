import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(socket) {
    socket.send("User Connected..!!");
    
    socket.on("message", (e) => {
        console.log(e.toString());
    })
});