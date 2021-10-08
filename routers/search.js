const router = require('express').Router();
const User = require('../models/user');
const userService = require('../services/user.service')
const groupService = require('../services/group.service')
const queryString = require('querystring')

router.get('/user', async (req, res) => {
    try {
        let name = queryString.unescape(req.query.name);
        let result = await userService.searchByName(name);
        res.send(result)
    } catch (e) {
        console.log(e)
    }
})

router.get('/group', async (req, res) => {
    try {
        let name = queryString.unescape(req.query.name);
        let result = await groupService.searchByName(name);
        res.send(result);
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
