const router = require('express').Router();
const { Schema } = require('mongoose');
const {Thought, User, Reaction} = require('../../models');

router.get('/', (req, res) => {
    Thought.find({}).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    })
})

router.get('/:id', (req, res) => {
    Thought.findById(req.params.id).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    })
})

router.post('/', (req, res) => {
    // First make sure the user id exists
    User.findById(req.body.id)
        .then(user => {
            // Create the thought with the username
            Thought.create({thoughtText: req.body.thoughtText, username: user.username})
                .then(thought => {
                    // Add the thought to the user document
                    User.findByIdAndUpdate(user._id, {$push: {thoughts: thought._id}})
                        .then(update => {
                            res.json(thought);
                        });
                }).catch(err => {
                    // Failed to create thought
                    console.log(err);
                    res.sendStatus(406);
                });
    }).catch(err => {
        // Failed to find  the user
        console.log(err);
        res.sendStatus(404);
    })
});

router.put('/:id', (req,res) => {
    Thought.findByIdAndUpdate(req.params.id, {thoughtText: req.body.thoughtText}).then(thought => {
        res.json(thought);
    }).catch(err => {
        console.log(err);
        res.sendStatus(406);
    })
})

router.delete('/:id', (req,res) => {
    Thought.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
})

router.post('/:id/reactions', (req, res) => {
    Thought.findOneAndUpdate(req.params.id, 
        { $addToSet: {reactions: {...req.body} } }
        ).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    })
})

router.delete('/:id/reactions/:reactionId', (req, res) => {
    console.log("delete reaction")
    Thought.findByIdAndUpdate(req.params.id, { 
        $pull: {
            reactions: {_id: req.params.reactionId}
        }
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
        console.log(err);
        res.sendStatus(404);
    })
})

module.exports = router;