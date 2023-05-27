const mongoose = require("mongoose");
const { Types } = mongoose;
const messageSchema = new mongoose.Schema(
    {
        userID: { type: Types.ObjectId, required: true, ref: "User" },
        roomID: { type: Types.ObjectId, required: true, ref: "Room" },
        content: { type: String, required: true },
        attachments: { Type: [Object], default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
