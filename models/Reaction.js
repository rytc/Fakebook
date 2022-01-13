const {model, Schema} = require('mongoose');

const Reaction = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        required: true,
    },
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
    timestamps: true,
    id: false
});

module.exports = Reaction;

