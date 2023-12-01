const asyncHandler = require('express-async-handler');

const Conversation = require('../models/conversation');

exports.accessConversation = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json("UserId param not sent with request");
    }

    const isConversation = await Conversation.find({
        $and: [
            { participants: { $elemMatch: { $eq: req.user._id } } },
            { participants: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("participants", "-password");

    if (isConversation.length > 0) {
        res.json(isConversation)
    } else {
        let conversationData = {
            participants: [req.user._id, userId],
        };

        try {
            const createdConversation = await Conversation.create(conversationData);
            const fullConversation = await Conversation.findOne({ _id: createdConversation._id }).populate("participants", "-password");

            res.status(200).json(fullConversation);
        } catch(err) {
            res.status(400);
            console.error(err);
        }
    }
});

exports.fetchConversations = asyncHandler(async(req, res) => {
   const conversations = await Conversation.find({
    participants: { $elemMatch: { $eq: req.user._id } }
   }).populate("participants", "-password").sort({updatedAt: -1}); 

   res.status(200).json(conversations);
});