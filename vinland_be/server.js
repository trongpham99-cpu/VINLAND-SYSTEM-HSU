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
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));
dotenv.config();

//cache 
const ROOMS = require('./src/cache/room');
const { getMessageOnRoom, createRoom } = require("./src/services/room.service");

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

  console.log("a user connected", socket.id);

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('get_my_rooms', async (data) => {
    io.emit('get_my_rooms', ROOMS);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//ROUTES
//default route
app.get("/", (req, res) => {
  res.send({
    message: "Server is running!",
  });
});
app.use("/home", homeRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use('/room', roomRoute);

//JSON WEB TOKEN

//PORT SERVER
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running with PORT ${PORT}`);
});