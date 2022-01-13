const router = require('express').Router();

router.use('/users', require('./usersRoutes.js'));
router.use('/thoughts', require('./thoughtsRoutes.js'));

module.exports = router;