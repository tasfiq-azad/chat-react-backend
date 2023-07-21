const express = require('express')
const app = express()
const cors=require("cors")
const userRoutes=require("./server/Routes/userRoutes")
const messageRoutes=require("./server/Routes/messagesRoute")
const port = process.env.PORT || 4000
const mongoose=require("mongoose");
const  socket  = require('socket.io')
require('dotenv').config()


app.use(cors());
 app.use(express.json())
app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

 mongoose.connect(process.env.MONGO_URL,{
     useNewUrlParser:true,
     useUnifiedTopology:true,
 }).then(console.log("database connected"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server=app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io=socket(server,{
  cors:{
    origin:"https://chat-app-server-ashen.vercel.app",
    credentials:true,
  }
})

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);
  })

  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.message)
    }
  })

})