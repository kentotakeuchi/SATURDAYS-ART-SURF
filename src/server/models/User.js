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

    requestToken: String,
    requestTokenSecret: String,

    accessToken: String,
    accessTokenSecret: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;