const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/auth");
const homeRoute = require("./src/routes/home");
const userRoute = require("./src/routes/user");
const roomRoute = require("./src/routes/room");
const blogRoute = require("./src/routes/blog");
const upload = require("./src/routes/upload");
const messageRoute = require("./src/routes/message");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
var cloudinary = require('cloudinary').v2;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));
dotenv.config();

//cache 
const { getMessageOnRoom, findRoomAdvance } = require("./src/services/room.service");
const { getRoomById } = require("./src/controllers/roomControllers");

//Init Cloudinary
cloudinary.config({
  cloud_name: 'dblpwxmnh',
  api_key: '132635623228588',
  api_secret: 'zKL9yMEaoZfV2fghdY6X6-pxdvo',
  secure: true
});

//Init Database (Connect Database(MongoDB))
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    const err = "Can't connected to MongoDB";
    console.log(err);
  });

//Init io 
io.on("connection", (socket) => {

  console.log('a user connected');

  socket.on('join_room', async (roomId) => {
    socket.join(roomId);
  });

  socket.on('leave_room', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('on_new_room', async (roomId) => {
    const room = await findRoomAdvance({ id: roomId });
    io.to(roomId).emit('on_new_room', room[0]);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const onListen = (req, res) => {
  res.send({
    message: "Server is running!",
  });
}

//default route
app.get("/", onListen);
app.use("/home", homeRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use('/room', roomRoute);
app.use("/blog", blogRoute);
app.use("/upload", upload);
app.use("/message", messageRoute);

//JSON WEB TOKEN

//PORT SERVER
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running with PORT ${PORT}`);
});