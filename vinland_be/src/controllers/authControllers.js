const bcrypt = require("bcrypt");
const User = require("../models/auth");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// const { create } = require("lodash");
let refreshTokens = [];
const authController = {
  //Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const foundUser = await User.findOne({
        username: req.body.username,
      })

      if (foundUser) return res.status(400).json(
        {
          message: "Username already exists",
          status: 400
        }
      )

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      const user = await newUser.save();
      return res.status(200).json({
        message: "Register successfully",
        status: 200,
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  },

  //Generate Access Token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      //secretKey
      process.env.ACCESS_TOKEN_KEY,
      // { expiresIn: "2h" }
    );
  },

  //Generate Refresh Token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      //secretKey
      process.env.REFRESH_TOKEN_KEY,
      // { expiresIn: "365d" }
    );
  },

  //Login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({
          status: 400,
          message: "User not found!",
        });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json({
          status: 400,
          message: "Wrong password!",
        });
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({
          status: 200,
          data: { ...others, accessToken },
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = req.user;
      const { id } = user;
      const findUser = await User.findById(id).select("-password");
      return res.status(200).json(findUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    //Lat refresh token tu user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You are not Authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("RefreshToken is not valid");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //Create new accessToken, refreshToken
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Log out SuccessFully");
  },
};

//STORE TOKEN

module.exports = authController;
