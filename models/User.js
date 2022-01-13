const {Mongoose, Schema} = require('mongoose');

const User = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    {
        toJSON : {
            virtuals: true
        }
    }
);

User.virtual('friendCount').get(() => {
    return this.friends.length;
})

module.exports = Mongoose.model('user', User);

