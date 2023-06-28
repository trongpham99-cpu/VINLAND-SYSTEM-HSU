const mongoose = require("mongoose");
const { Types } = mongoose;
const blogSchema = new mongoose.Schema(
    {
        title: { type: String },
        content: { type: String },
        thumbnail: { type: String },
        userId: { type: Types.ObjectId, required: true, ref: "users" },
        rating: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
