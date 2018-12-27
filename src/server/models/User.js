const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: String,
    password: String,

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],

    // TODO: probably, no need.
    requestToken: String,
    requestTokenSecret: String,

    // TWITTER
    id: Number,
    name: String,
    accessToken: String,
    accessTokenSecret: String
});

UserSchema.statics.findOrCreate = require("find-or-create");

const User = mongoose.model('User', UserSchema);

module.exports = User;