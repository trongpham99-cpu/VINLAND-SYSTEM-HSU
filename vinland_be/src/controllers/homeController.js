const { Home } = require("../models/modelHome");

const homeController = {
  //ADD Vinland
  addHome: async (req, res) => {
    try {
      const newHome = new Home(req.body);
      const saveHome = await newHome.save();
      res.status(200).json(saveHome);
    } catch (err) {
      res.status(500).json(err); //http request code
    }
  },

  //GET ALL Vinland
  getAllHome: async (req, res) => {
    try {
      const allHome = await Home.find();
      res.status(200).json(allHome);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET DETAIL Vinland
  getDetailHome: async (req, res) => {
    try {
      const home = await Home.findById(req.params.id);
      res.status(200).json(home);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE Vinland
  updateHome: async (req, res) => {
    try {
      const home = await Home.findById(req.params.id);
      await home.updateOne({ $set: req.body });
      res.status(200).json("Updated Home Successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE Vinland
  deleteHome: async (req, res) => {
    try {
      await Home.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted Successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = homeController;
