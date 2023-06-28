const User = require("../models/auth");

const userController = {
  //GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE USER
  deleteUsers: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("Delete Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMyInfo: async (req, res) => {
    const { id: userId } = req.user;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getInfo: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
