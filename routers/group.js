const express = require('express')
const router = express.Router();
const path = require('path')
const groupService = require('../services/group.service')
const Group = require('../models/group');
const { route } = require('./login');

router.use(express.static(path.join(process.cwd(), '/public')))

router.get('/:groupId', async (req, res) => {
    const data = await Group.findById(req.params.groupId)
    const isAdmin = await groupService.isAdmin(req.user._id, data._id)
    const isMember = await groupService.checkContain(req.user._id, data._id)
    res.render('group', {
        isMember: isMember,
        isAdmin: isAdmin,
        groupId: data._id,
        queryPath: req.path,
        user: req.user,
        groupName: data.name,
        numOfMembers: data.members.length,
        background: data.avatar
    });
})

// create group
router.post('/', async (req, res) => {
    try {
        let data = await groupService.createGroup(req.user._id, req.body.name, req.body.avatar)
        res.send({
            status: 'success',
            msg: 'ok',
            groupId: data._id
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        });
    }
})

// join group
router.post('/:groupId', async (req, res) => {
    try {
        await groupService.joinGroup(req.user._id, req.params.groupId)
        res.send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        });
    }
})

// rời group
router.delete('/:groupId', async (req, res) => {
    try {
        await groupService.outGroup(req.user._id, req.params.groupId)
        res.send({msg: 'OK'})
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        });
    }
})


router.put('/background', async (req, res) => {
    try {
        await groupService.changeBackground(req.body.groupId, req.body.background)
        res.send({
            status: 'success',
            msg: 'OK'
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        });
    }
})



module.exports = router;
