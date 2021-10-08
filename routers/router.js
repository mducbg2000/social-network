const router = require('express').Router();

router.use('/home', require('./home'));
router.use('/logout', require('./logout'));
router.use('/group', require('./group'));
router.use('/profile', require('./profile'));
router.use('/post', require('./post'));
router.use('/search', require('./search'));
router.use('/follow', require('./follow'));
router.use('/group', require('./group'));
router.use('/search_result', require('./search_result'));
router.use('/create_group', require('./create_group'))
router.use('/comment', require('./comment'))
router.use('/chat', require('./chat'))

router.use('/like', require('./like'))

module.exports = router;
