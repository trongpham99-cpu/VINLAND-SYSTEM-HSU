const mongoose = require("mongoose");
const { Types } = mongoose;
const messageSchema = new mongoose.Schema(
    {
        userId: { type: Types.ObjectId, required: true, ref: "users" },
        roomId: { type: Types.ObjectId, required: true, ref: "rooms" },
        content: { type: String, required: true },
        attachments: { type: Array, default: [] },
        type: { type: String, enum: ["text", "image", "video", "file"], default: "text" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("messages", messageSchema);
