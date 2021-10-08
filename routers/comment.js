const router = require('express').Router()
const commentService = require('../services/comment.service')
const ejs = require('ejs')
const path = require('path')
router.post('/', async (req, res) => {
    try {
        const comment = await commentService.addComment(
            req.body.postId,
            req.user._id,
            req.body.content,
            req.body.img
        )
        let data = [];
        data.push(comment)
        let html = await ejs.renderFile(path.join(process.cwd(), '/views/comment.ejs'),
            {
                commentList: data
        })
        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (e) {
        console.log(e)
        res.status(400).send({
            status: 'error',
            msg: e
        })
    }
})

router.get('/:postId/:page', async (req, res) => {
    try {
        const commentList = await commentService.getComment(req.params.postId, req.params.page);
        let html = await ejs.renderFile(path.join(process.cwd(), '/views/comment.ejs'),
            {
                commentList: commentList
            })
        res.send({
            html: html,
            numberOfCmtInPage: commentList.length,
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        })
    }
})

module.exports = router
