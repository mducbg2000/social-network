const router = require('express').Router()
const chatService = require('../services/chat.service')
router.get('/:from/:to/:page', async (req, res) => {
    try {
        let messengers = await chatService.getSomeMessagesInRoom(req.params.from, req.params.to, req.params.page)
        res.send({
            status: 'success',
            msg: 'OK',
            data: messengers
        })
    } catch (e) {
        res.status(400).send({
            status: 'error',
            msg: e
        })

    }
})

module.exports = router
