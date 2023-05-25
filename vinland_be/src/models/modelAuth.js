const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    // Home: {
    //   //thong tin nha dat cua nguoi dang
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Home",
    //   required: true,
    // },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
module.exports = { User };
