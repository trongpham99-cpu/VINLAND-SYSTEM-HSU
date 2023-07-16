const { Types } = require("mongoose");
const blogModel = require("../models/blog");

const blogController = {
  addBlog: async (req, res) => {
    const { id: userId } = req.user;
    if (!userId) {
      return res.status(403).json("You're not authentication");
    }
    try {
      const newBlogObj = {
        ...req.body,
        userId: new Types.ObjectId(userId),
      };
      const newBlog = new blogModel(newBlogObj);
      const saveBlog = await newBlog.save();
      return res.status(200).json(saveBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getBlogById: async (req, res) => {
    try {
      const blog = await blogModel
        .findById(req.params.id)
        .populate("userId", "username email");
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBlog: async (req, res) => {
    const { rating, keyword } = req.query;
    console.log(keyword);
    const params = {
      $or: [
        { title: { $regex: keyword ? keyword : "", $options: "i" } },
        { content: { $regex: keyword ? keyword : "", $options: "i" } },
      ],
      rating: {
        $gte: rating,
      },
    };

    if (!rating) {
      params.rating = {
        $gte: 0,
        $lte: 4,
      };
    }

    try {
      const allBlog = await blogModel
        .find(params)
        .populate("userId", "username email")
        .sort({ createdAt: -1 });
      return res.status(200).json(allBlog);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  searchBlog: async (req, res) => {
    try {
      const { keyword } = req.query;
      const allBlog = await blogModel
        .find({
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
          ],
        })
        .populate("userId")
        .sort({ createdAt: -1 });
      return res.status(200).json(allBlog);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = blogController;
