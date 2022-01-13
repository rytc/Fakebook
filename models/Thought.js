const {model, Schema} = require('mongoose')
const Reaction = require('./Reaction.js')

const Thought = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 120
    },
    username: {
        type: String,
        require:true,
    },
    reactions: [Reaction]
}, {
    timestamps: true,
});

Thought.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = model('thought', Thought);