const router = require('express').Router()
const Post = require('../models/post')
const postService = require('../services/post.service')

router.post('/:postId', async (req, res) => {
    try {
        await postService.likePost(req.user._id, req.params.postId)
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).send({
            status:'error',
            msg: e
        })
    }
})

router.delete('/:postId', async (req, res) => {
    try {
        await postService.dislikePost(req.user._id, req.params.postId)
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).send({
            status:'error',
            msg: e
        })
    }
})

module.exports = router