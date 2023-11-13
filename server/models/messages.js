const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessgeSchema = new Schema(
    {
        conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
        senderId: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessgeSchema);