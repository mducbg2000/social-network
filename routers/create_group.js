const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('create_group', {user: req.user})
})

module.exports = router