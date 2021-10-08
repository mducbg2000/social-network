const router = require('express').Router();
const userService = require('../services/user.service')
const followService = require('../services/follow.service')

router.post('/:followedId', async (req, res) => {
    try {
        await followService.follow(req.user._id, req.params.followedId);
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        })
    }
})

router.delete('/:followedId', async (req, res) => {
    try {
        await followService.unfollow(req.user._id, req.params.followedId);
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        })
    }
})


module.exports = router
