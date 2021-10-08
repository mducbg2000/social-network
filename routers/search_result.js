const passport = require('passport');
const User = require('../models/user');
const router = require('express').Router();
const Groups = require('../models/group')
const groupService = require('../services/group.service')
const ejs = require('ejs')
const queryString = require('querystring');
const userService = require('../services/user.service');
const followService = require('../services/follow.service');
router.get('/group', async (req, res) => {
    let data = await User.findById(req.user._id).select({_id: 0}).populate('friends', 'name mssv avatar').populate('groups', 'name avatar');
    let name = queryString.unescape(req.query.name);
    let raw = await groupService.searchByName(name);
    let results = [];

    for (let r of raw) {
        r.contain = await groupService.checkContain(req.user._id, r._id)
        results.push(r)
    }
    res.render('search_result',{
        queryPath: req.path,
        query: req.query.name,
        user: req.user,
        groups: data.groups,
        results: results
    })
})

router.get('/user', async (req, res) => {
    let data = await User.findById(req.user._id).select({_id: 0}).populate('friends', 'name mssv avatar').populate('groups', 'name avatar');
    let name = queryString.unescape(req.query.name);
    let raw = await userService.searchByName(name);
    let results = [];
    for (let r of raw) {
        r.contain = await followService.isFollow(req.user._id, r._id)
        results.push(r)
    }
    res.render('search_result',{
        queryPath: req.path,
        query: req.query.name,
        user: req.user,
        groups: data.groups,
        results: results
    })
})

module.exports = router;
