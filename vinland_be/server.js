//Khai bao cac package
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/auth");
const homeRoute = require("./src/routes/home");
const userRoute = require("./src/routes/user");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcom to Vinland" });
});

//PORT SERVER
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running with PORT ${PORT}`);
});
// app.use(async (req, res, next) => {
//   next(createError.NotFound());
// });
// app.use((req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     error: {
//       status: err.status || 500,
//       message: err.message,
//     },
//   });
// });

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
app.use("/home", homeRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

//JSON WEB TOKEN
