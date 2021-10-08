const User = require('../models/user')
const Room = require('../models/room')
const MessageBucket = require('../models/message-bucket')

module.exports = {

    getSingleChatRoom: async (userId1, userId2) => {
        try {
            let r = await Room.findOne({
                $and: [{
                    members: {
                        $all: [ userId1, userId2 ]
                    }}, {
                    members: {
                        $size: 2
                    }}]})
            if (r === null) {
                r = await Room.create({members: [userId1, userId2]})
            }
            return r._id
        } catch (e) {
            throw e
        }
    },

    sendMessage: async (from, to, content, img) => {
        try {
            let room = await module.exports.getSingleChatRoom(from, to);
            let message = {
                from: from,
                content: content,
                img: img
            }
            await MessageBucket.updateOne({
                room: room,
                count: { $lt: 10 }
            }, {
                $push: {
                    messages: message
                },
                $inc: { count: 1 },
            }, {
                upsert: true
            })
            return message
        } catch (e) {
            throw e
        }
    },

    getSomeMessagesInRoom: async (from, to, page) => {
        try {
            const room = await module.exports.getSingleChatRoom(from, to);
            let msgBucket = await
                MessageBucket.find({room: room._id})
                    .sort({updatedAt: -1})
                    .skip(page - 1)
                    .limit(1)
            if (msgBucket[0] == null) return null;
            return msgBucket[0].messages
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
