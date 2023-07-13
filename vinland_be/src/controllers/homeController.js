const { Home } = require("../models/home");

const homeController = {
  addHome: async (req, res) => {
    const { id: userId } = req.user;
    try {
      const body = req.body;
      const params = { ...body, owner: userId }
      const newHome = new Home(params);
      const saveHome = await newHome.save();
      return res.status(200).json(saveHome);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  searchHome: async (req, res) => {
    try {
      const { keyword } = req.query;
      const allHome = await Home.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
      return res.status(200).json(allHome);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllHome: async (req, res) => {
    const { type, keyword } = req.query;
    console.log(type, keyword)
    const params = {
      type: type,
      status: "approved",
      $or: [
        { title: { $regex: keyword ? keyword : "", $options: "i" } },
        { description: { $regex: keyword ? keyword : "", $options: "i" } },
      ],
    }

    if (!type || type == 0) {
      delete params.type;
    }

    try {
      const allHome = await Home.find(params).sort({ createdAt: -1 })
      return res.status(200).json(allHome);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getDetailHome: async (req, res) => {
    try {
      const home = await Home.findById(req.params.id).populate("owner", "_id username email");
      return res.status(200).json(home);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateHome: async (req, res) => {
    try {
      const home = await Home.findById(req.params.id);
      await home.updateOne({ $set: req.body });
      return res.status(200).json("Updated Home Successful!");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateReply: async (req, res) => {
    try {
      const { postId } = req.params;
      const { id: userId } = req.user;
      const updateHome = await Home.findByIdAndUpdate(postId, {
        $push: {
          replies: {
            owner: userId,
          },
        },
      })
      return res.status(200).json(updateHome);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteHome: async (req, res) => {
    try {
      await Home.findByIdAndDelete(req.params.id);
      return sres.status(200).json("Deleted Successful!");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getMyHomes: async (req, res) => {
    const { id: userId } = req.user;
    if (!userId) return res.status(403).json("You're not authentication");
    try {
      const allHome = await Home.find({ owner: userId }).sort({ createdAt: -1 });
      const response = {
        documentsCount: {
          total: allHome.length,
          approved: allHome.filter((item) => item.status === "approved").length,
          pending: allHome.filter((item) => item.status === "pending").length,
          rejected: allHome.filter((item) => item.status === "rejected").length,
        },
        documents: allHome
      }
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getPendingHome: async (req, res) => {
    try {
      const allHome = await Home
        .find({ status: "pending" })
        .populate("owner", "_id username email")
        .sort({ createdAt: -1 });
      return res.status(200).json(allHome);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  approveHome: async (req, res) => {
    try {
      const updateHome = await Home.findByIdAndUpdate(req.params.id, { status: "approved" });
      return res.status(200).json("Home has been approved!");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  approveAllHome: async (req, res) => {
    try {
      const updateAllHome = await Home.updateMany({ status: "pending" }, { status: "approved" });
      return res.status(200).json("All Home has been approved!");
    } catch (error) {
      return res.status(500).json(err);
    }
  },
  rejectHome: async (req, res) => {
    try {
      const updateHome = await Home.findByIdAndUpdate(req.params.id, { status: "rejected" });
      return res.status(200).json("Home has been rejected!");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  adminGetAllHome: async (req, res) => {
    const homes = await Home.find().sort({ createdAt: -1 });
    let countStats = {
      total: homes.length,
      approved: homes.filter((item) => item.status === "approved").length ? homes.filter((item) => item.status === "approved").length : 0,
      pending: homes.filter((item) => item.status === "pending").length ? homes.filter((item) => item.status === "pending").length : 0,
      rejected: homes.filter((item) => item.status === "rejected").length ? homes.filter((item) => item.status === "rejected").length : 0,
    }

    params = {
      rows: homes,
      options: countStats
    }

    return res.status(200).json(params);
  },
};

module.exports = homeController;
