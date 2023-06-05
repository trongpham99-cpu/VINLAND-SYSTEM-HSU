const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    thumbnail: {
      type: Object,
      required: true,
    },
    interior: {
      type: Object,
      required: true,
    },
    slug: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
      set: (v) => Math.round(v * 10) / 10,
    },
    attachments: {
      type: Array,
      default: [],
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    owner: {
      //đăng bởi ai
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //for actions
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

let Home = mongoose.model("Home", homeSchema);
module.exports = { Home };
