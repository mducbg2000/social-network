const express = require('express')
const router = express.Router();
const path = require('path')
const userService = require('../services/user.service')
const friendService = require('../services/follow.service')
// tường nhà

router.use(express.static(path.join(process.cwd(), '/public')))

router.get('/:id', (async (req, res) => {
    try {
        let currentUser = await userService.getProfile(req.user._id)
        let user = await userService.getProfile(req.params.id);
        let isFollow = await friendService.isFollow(req.user._id, req.params.id)
        let isYourself = (req.user._id == req.params.id)
        res.render('profile', {
            currentUser: currentUser,
            queryPath: req.path,
            user: user,
            isFollow: isFollow,
            isYourself: isYourself,
            following: user.following
        })
    } catch (e) {
        res.status(404).send({
            status: 'error',
            msg: e
        })
    }

}))

router.put('/background', async (req, res) => {
    try {
        await userService.changeBackground(req.user._id, req.body.background);
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(404).send({
            status: 'error',
            msg: e
        })
    }
})

router.put('/avatar', async (req, res) => {
    try {
        await userService.changeAvatar(req.user._id, req.body.avatar);
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(404).send({
            status: 'error',
            msg: e
        })
    }
})


module.exports = router;
