const router = require('express').Router();
const {User} = require('../models');

router.get('/', (req, res) => {
    User.find({}).then(data => {
        res.json(data);
    })
})

router.get('/:id', (req, res) => {
})

module.exports = router;