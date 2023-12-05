const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
    {
        participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
        latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);