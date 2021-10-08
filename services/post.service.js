const Post = require('../models/post');
const User = require('../models/user');
const Group = require('../models/group');
const Comment = require('../models/comment')
const mongoose = require('mongoose')
module.exports = {

    // lấy vài post để đưa lên trang chủ
    getPostsInHome: async (userId, pageNumber) => {
        try {
            let user = await User.findById(userId);
            return await
                Post.find({
                    $or : [{
                        owner: { $in: [...user.following, userId] },
                        group: undefined
                    }, {
                        group: { $in: user.groups }
                    }]
                })
                    .populate('owner', 'name avatar')
                    .populate('group', 'name')
                    .select('content img like group')
                    .sort({updatedAt: -1})
                    .skip(3*pageNumber - 3)
                    .limit(3);
        } catch (e) {
            throw e
        }
    },

    // lấy vài post để đưa lên tường nhà
    getPostsInProfile: async (userId, pageNumber) => {
        try {
            return await
                Post.find({owner: mongoose.Types.ObjectId(userId), group: undefined})
                    .populate('owner', 'name avatar')
                    .populate('group', 'name')
                    .select('content img like group')
                    .sort({updatedAt: -1})
                    .skip(3*pageNumber - 3)
                    .limit(3);
        } catch (e) {
            throw e
        }
    },

    // lấy vài post để đưa lên nhóm
    getPostsInGroups: async (groupId, pageNumber) => {
        try {
            return await
                Post.find({group: mongoose.Types.ObjectId(groupId)})
                    .populate('owner', 'name avatar')
                    .populate('group', 'name')
                    .select('content img like group')
                    .sort({updatedAt: -1})
                    .skip(3*pageNumber - 3)
                    .limit(3);
        } catch (e) {
            throw e
        }
    },

    // lấy vài post vừa đăng gần nhất đưa lên trang home
    getPostsInHomeTop: async (userId, pageNumber) => {
        try {
            return await
                Post.find({owner: mongoose.Types.ObjectId(userId)})
                    .populate('owner', 'name avatar')
                    .populate('group', 'name')
                    .select('content img comments like group')
                    .sort({updatedAt: -1})
                    .skip(3*pageNumber - 3)
                    .limit(1);
        } catch (e) {
            throw e
        }
    },

    createPost: async (userId, content, img, groupId) => {
        try {
            return await Post.create({
                owner: userId,
                content: content,
                img: img,
                group: groupId,
            })
        } catch (e) {
            throw e
        }
    },

    // sửa nội dung
    modifyContentPost: async (postId, newContent, img) => {
        try {
            await Post.findByIdAndUpdate(
                postId,
                {
                    content: newContent,
                    img: (img === null) ? this.img : img
                }
            )
        } catch (e) {
            throw e
        }
    },

    likePost: async (userId, postId) => {
        try {
            await Post.findByIdAndUpdate(postId, {
                $addToSet: {
                    like: userId
                }
            })
        } catch (e) {
            throw e
        }
    },

    dislikePost: async (userId, postId) => {
        try {
            await Post.findByIdAndUpdate(postId, {
                $pull: {
                    like: userId
                }
            })
        } catch (e) {
            throw e
        }
    },

    deletePost: async (postId) => {
        try {
            await Post.findByIdAndDelete(postId);
        } catch (e) {
            throw e
        }
    }


}






