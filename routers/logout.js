const router = require('express').Router();
require('dotenv').config();

router.get('/', (req, res) => {
    res.clearCookie('token');
    res.redirect('login')
})

module.exports = router;