const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: String,
      required: true,
    },
    Location: {
      type: Object,
      required: true,
    },
    Thumbnail: {
      type: Object,
      required: true,
    },
    Slug: {
      type: String,
    },
    Rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must be at most 5'],
      set: v => Math.round(v * 10) / 10,
    },
    Attachments: {
      type: Array,
      default: [],
    },
    Note: {
      type: String,
    },
    Status: {
      type: String,
      required: true,
    },
    Owner: { //đăng bởi ai
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //for actions
    Comments: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

let Home = mongoose.model("Home", homeSchema);
module.exports = { Home };
