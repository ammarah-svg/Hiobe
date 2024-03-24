const express = require('express');
const handler = require('./middleware/handler');
const connect = require('./config/connectDB');
const app = express();
require('dotenv').config();
require('colors')
const cors = require('cors')
app.use(cors());




const http = require('http');

const { Server } = require('socket.io');



const server = http.createServer(app);

// create socket server

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ['POST', 'GET']
    }
})


io.on("connection", (socket) => {
    console.log(`user connected on host id:${socket.id.blue}`);
  
    socket.on("join_room", (data) => {
        socket.join(data.roomID);
        console.log(`room joined:${data.roomID?.cyan}`)
        const roomSize = io.sockets.adapter.rooms.get(data.roomID)?.size || 0;
        console.log(`Users in room ${data.roomID}: ${roomSize}`);
    });
 

    socket.on("send_message", (data) => {
        // console.log(data)
        socket.to(data.roomID).emit('received_message', data)

        // Emit "received_message" event to all users in the room
    });

});


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connect()

app.use('/api/user/', require('./routes/userRoutes'))
app.use('/api/chats/', require('./routes/chatRoutes'))
app.use(handler)

server.listen(process.env.PORT, () => console.log(`server is running on port:${process.env.PORT.green}`))