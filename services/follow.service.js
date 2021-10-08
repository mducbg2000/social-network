const User = require('../models/user')
const Post = require('../models/post')
const mongoose = require('mongoose')

module.exports = {

    // thằng user có follow thằng followed ko?
    isFollow: async (user, followed) => {
        try {
            let u = await User.findById(user);
            return u.following.includes(followed);
        } catch (e) {
            console.log(e)
        }
    },

    // user follow thằng followed (được follow)
    follow: async (user, followed) => {
        try {
            await User.findByIdAndUpdate(user, {
                $addToSet: {
                    following: followed
                }
            })

            await User.findByIdAndUpdate(followed, {
                $addToSet: {
                    followers: user
                }
            })

        } catch (e) {
            throw e
        }
    },

    // bỏ follow
    unfollow: async (user, followed) => {
        try {

            await User.findByIdAndUpdate(user, {
                $pull: {
                    following: followed
                }
            })

            await User.findByIdAndUpdate(followed, {
                $pull: {
                    followers: user
                }
            })

        } catch (e) {
            throw e
        }
    }

}
