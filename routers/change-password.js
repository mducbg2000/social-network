const router = require('express').Router();
const userService = require('../services/user.service')
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('sendMailToChangePwd')
})

router.post('/', async (req, res) => {
    try {
        await userService.sendResetPwdId(req.body.email)
            .then(r => res.render('successfulSendingEmail'));
    } catch (e) {
        res.status(400).send('Send email fail')
    }
})

router.get('/:resetId', (req, res) => {
    try {
        res.render('changePwd');
    } catch (e) {
        console.log(e);
    }
})

router.post('/:resetId', async (req, res) => {
    try {
        let result = await userService.resetPassword(req.body.newPwd, req.params.resetId);
        if (result === null) res.status(400).render("failToChangePwd");
        res.status(200).render("successfulToChangePwd");
    } catch (e) {
        console.log(e);
        res.status(400).render("failToChangePwd");
    }
})
module.exports = router
