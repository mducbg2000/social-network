const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config();
router.get('/', passport.authenticate('azure_ad_oauth2'))
router.get('/callback', passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({
            id: req.user._id
        }, process.env.SECRETKEY);
        res.cookie('token', token);
        res.cookie('userId', req.user._id)
        res.redirect('/home')
    })

module.exports = router
