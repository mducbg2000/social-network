const Group = require('../models/group');
const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose')
module.exports = {

    createGroup: async (userId, name, avatar) => {
        try {
            let newG =  await Group.create({
                name: name,
                admin: userId,
                avatar: avatar,
                members: [userId]
            });
            await User.findByIdAndUpdate(userId, {
                $addToSet: {
                    groups: newG._id
                }
            })
            return newG
        } catch (e) {
            throw e
        }
    },

    joinGroup: async (userId, groupId) => {
        try {
            await Group.findByIdAndUpdate(groupId, {
                $addToSet: {
                    members: userId
                }
            });

            await User.findByIdAndUpdate(userId, {
                $addToSet: {
                    groups: groupId
                }
            })
        } catch (e) {
            throw e
        }
    },

    outGroup: async (userId, groupId) => {
        try {
            await Group.findByIdAndUpdate(groupId, {
                $pull: {
                    members: userId
                }
            });
            await User.findByIdAndUpdate(userId, {
                $pull: {
                    groups: groupId
                }
            })
        } catch (e) {
            throw e
        }
    },


    searchByName: async (name) => {
        try {
            return await Group.find({name: new RegExp(name, 'i'), groupType:'normal'})
        } catch (e) {
            throw e
        }
    },

    checkContain: async (userId, groupId) => {
        try {
            const g = await Group.findById(groupId);
            return g.members.includes(userId)
        } catch (e) {
            throw e
        }
    },

    changeBackground: async (groupId, background) => {
        try {
            await Group.findByIdAndUpdate(groupId, {
                $set: {
                    avatar: background
                }
            })
        } catch (e) {
            throw e
        }
    },

    isAdmin: async (userId, groupId) => {
        try {
            const g = await Group.findOne({
                _id: groupId,
                admin: userId
            })
            return (g != null)
        } catch (e) {
            throw e
        }
    }

}
