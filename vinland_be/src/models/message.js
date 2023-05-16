const mongoose = require("mongoose");
const { Types } = mongoose;
const messageSchema = new mongoose.Schema(
    {
        userID: { type: Types.ObjectId, required: true, ref: "User" },
        roomID: { type: Types.ObjectId, required: true, ref: "Room" },
        Content: { type: String, required: true },
        Attachments: { Type: [Object] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
