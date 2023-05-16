const mongoose = require("mongoose");
const { Types } = mongoose;
const roomSchema = new mongoose.Schema(
    {
        Name: { type: String, required: true }, // Name of the room with product_name_sale
        Messages: { type: [Types.ObjectId], required: true, ref: "Message" },
        Users: { type: [Types.ObjectId], required: true, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
