const router = require('express').Router();
const userService = require('../services/user.service')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/', async (req, res) => {
    try {
        let user = await userService.login(req.body.email, req.body.pwd);
        if (user !== null) {
            const token = jwt.sign({
                id: user._id
            }, process.env.SECRETKEY);
            res.cookie('token', token);
            res.cookie('userId', user._id)
            res.json({token: token,
                msg: 'OK',
                status: 'success',
                user: {
                    id: user._id,
                    name: user.name
                }
            });
        } else {
            res.status(400).json({
                status: 'error',
                msg: 'e'
            })
        }
    } catch (e) {
        console.log(e);
    }
})



module.exports = router;
