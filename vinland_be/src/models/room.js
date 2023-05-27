const mongoose = require("mongoose");
const { Types } = mongoose;
const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Name of the room with product_name_sale
        avatar: { type: String, required: true }, // Avatar of the room
        messages: { type: [Types.ObjectId], default: Array, ref: "messages" },
        users: { type: [Types.ObjectId], default: Array, ref: "users" },
        owner: { type: Types.ObjectId, required: true, ref: "users" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("rooms", roomSchema);
