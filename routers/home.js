const passport = require('passport');
const User = require('../models/user');
const router = require('express').Router();
const Groups = require('../models/group')
const ejs = require('ejs')

router.get('/', async (req, res) => {
    let data = await User.findById(req.user._id).select({_id: 0}).populate('following', 'name avatar online').populate('groups', 'name avatar');

    res.render('home',{
        queryPath: req.path,
        query: req.query.name,
        user: req.user,
        following: data.following,
        groups: data.groups
    })
})

module.exports = router;
