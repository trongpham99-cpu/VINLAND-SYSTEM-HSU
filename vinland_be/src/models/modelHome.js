const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  Attechments: {
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
  // User: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

let Home = mongoose.model("Home", homeSchema);
module.exports = { Home };
