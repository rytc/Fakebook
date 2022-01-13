const router = require('express').Router();
const {User} = require('../../models');

router.get('/', (req, res) => {
    User.find({}).then(data => {
        res.json(data);
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id).populate('friends').populate('thoughts')
        .then(newUser => {
            res.json(newUser);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(404)
        });
})

router.post('/', (req, res) => {
    User.create({username: req.body.username, email: req.body.email}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(406);
    });
})

router.put('/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {...req.body}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(406);
    });
})

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    })
})



module.exports = router;