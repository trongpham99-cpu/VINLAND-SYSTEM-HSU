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
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('my-list-room', (data) => {
    io.emit('my-list-room', ROOMS);
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

//JSON WEB TOKEN

//PORT SERVER
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running with PORT ${PORT}`);
});