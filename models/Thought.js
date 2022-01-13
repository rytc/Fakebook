const {Mongoose, Schema} = require('mongoose')

const Thought = new Schema({
    thoguthText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 120
    },
    username: {
        type: String,
        require:true,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'reaction'
    }]
}, {
    timestamps: true,
});

Thought.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

module.exports = Mongoose.model('thought', Thought);