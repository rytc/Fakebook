const {Mongoose, Schema} = require('mongoose');

const Reaction = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = Mongoose.model('reaction', Reaction);

