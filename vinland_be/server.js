//Khai bao cac package
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/auth");
const homeRoute = require("./src/routes/home");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
//PORT SERVER
app.listen(7000, () => {
  console.log("Server is running with PORT 7000");
});

//Connect Database(MongoDB)
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    const err = "Can't connected to MongoDB";
    console.log(err);
  });

//ROUTES
app.use("/v1/home", homeRoute);
