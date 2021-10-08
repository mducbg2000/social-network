const router = require('express').Router();
const User = require('../models/user');
const userService = require('../services/user.service')
const schoolService = require('../services/school.service')
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        await userService.register(
            req.body.email,
            req.body.name,
            req.body.pwd,
            req.body.birthDay,
            req.body.gender,
            req.body.mssv,
            req.body.major);
        res.status(200).send({
            status: 'success',
            msg: 'OK'
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        });
    }
});

router.get('/', async (req, res) => {
    try {
        let codes = await schoolService.getListsCode();
        res.render('register', {
            codes: codes
        });
    } catch (e) {
        res.status(400).send('get register')
    }

})

module.exports = router;
