const bcrypt = require("bcrypt");
const User = require("../models/modelAuth");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// const { create } = require("lodash");
const authController = {
  //Register
  registerUser: async (req, res) => {
    // console.log(req.body)
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        admin: req.body.admin,
      });
      //Save to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //Login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong username!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password!");
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          //secretKey
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "2h" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
