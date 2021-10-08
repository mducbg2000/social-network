const router = require('express').Router();
const Post = require('../models/post');
const postService = require('../services/post.service')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path');
const { ok } = require('assert');
require('dotenv').config();

router.get('/home/:page', async (req, res) => {
    try {
        let postList = await postService.getPostsInHome(req.user._id, req.params.page);
        let html = await ejs.renderFile(path.join(process.cwd(), '/views/post.ejs'),
            {
                showGroup: true,
                postList: postList,
                user: req.user
            })
        res.set('Content-Type', 'text/html');
        res.send(html)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/group/:groupId/:page', async (req, res) => {
    try {
        let postList = await postService.getPostsInGroups(req.params.groupId, req.params.page);
        let html = await ejs.renderFile(path.join(process.cwd(), '/views/post.ejs'),
            {
                showGroup: false,
                postList: postList,
                user: req.user
            })
        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/profile/:userId/:page', async (req, res) => {
    try {
        let postList = await postService.getPostsInProfile(req.params.userId, req.params.page);
        let html = await ejs.renderFile(path.join(process.cwd(), '/views/post.ejs'),
            {
                showGroup: true,
                postList: postList,
                user: req.user
            })
        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/', async (req, res) => {
    try {
        let r = await postService.createPost(
            req.user._id,
            req.body.content,
            req.body.img,
            req.body.groupId 
        )
        res.send({msg: 'OK', r})
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/', async (req, res) => {
    try {
        let postList = await postService.getPostsInHomeTop(req.user._id, req.params.page);
        let html = await ejs.renderFile(path.join(process.cwd(), '/views/post.ejs'),
            {
                postList: postList,
                user: req.user
            })
        res.set('Content-Type', 'text/html');
        res.send(html)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/:postId', async (req, res) => {
    try {
        await postService.deletePost(req.params.postId)
        res.send({
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


module.exports = router;

