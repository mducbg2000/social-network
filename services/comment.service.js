const Post = require('../models/post');
const User = require('../models/user');
const Group = require('../models/group');
const Comment = require('../models/comment')
const mongoose = require('mongoose')
module.exports = {
    // comment
    addComment: async (postId, cmtOwner, content, img) => {
        try {
            await Post.findByIdAndUpdate(mongoose.Types.ObjectId(postId), {
                $set:{
                    updatedAt: Date.now()
                }
            })
            let comment = await Comment.create({
                post: postId,
                owner: cmtOwner,
                content: content,
                img: img
            })
            return await comment.populate('owner', 'name avatar').execPopulate()
        } catch (e) {
            throw e
        }
    },

    getComment: async (postId, page) => {
        try {
            return await
                Comment.find({post: mongoose.Types.ObjectId(postId)})
                    .populate('owner', 'name avatar')
                    .sort({createdAt: 1})
                    .skip(10*page - 10)
                    .limit(10);
        } catch (e) {
            throw e
        }
    }
}
