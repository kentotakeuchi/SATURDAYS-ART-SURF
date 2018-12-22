const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('../verifyToken');

const twitterAPI = require('node-twitter-api');
const twitter = new twitterAPI({
    consumerKey: config.twitter.consumer_key,
    consumerSecret: config.twitter.consumer_secret,
    callback: config.twitter.callbackURL
});


router.get(`/register/twitter`, (req, res) => {

    twitter.getRequestToken((err, requestToken, requestTokenSecret, results) => {
      if (err) {
        console.log(`err getting OAuth request token : ${err}`);
      } else {

        const reqToken = new User({
          requestToken: requestToken,
          requestTokenSecret: requestTokenSecret
        });

        reqToken.save(err => {
          if (err) return handleError(err);
          console.log(`save reqToken`);
        });

        // res.send(reqToken);

        res.redirect(`${config.proxy}https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`);
      }
  });
});


router.post(`/register/twitter`, (req, res) => {
  console.log(`req.body`, req.body);
  const requestToken = req.body.requestToken;
});


router.post('/register', (req, res) => {
  console.log(`req.body`, req.body);

    // Check if the user's email has already existed or not.
    User.findOne({ email: req.body.email }, (err, email) => {

        if (err) return handleDBError(err, res);
        if (email) return res.status(409).send('an account with this user\'s email already exists');

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
        email : req.body.email,
        password : hashedPassword,
        },
        (err, user) => {
        if (err) return res.status(500).send("There was a problem registering the user.");

        // create a token
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        console.log(`user`, user);

        res.status(200).send({ auth: true, token: token });
        });
    });
});

/*
// add the middleware function
router.use(function (user, req, res, next) {
  res.status(200).send(user);
});
*/


router.post('/login', (req, res) => {
  // Email validation.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return handleDBError(err, res);
    if (!user) return res.status(401).send('No user found.');

    // Password validation.
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send('Password is incorrect.');
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    User.findByIdAndUpdate(user._id, {$set: {
      tokens: {
        access: "auth",
        token: token
      }
    }
    }, {new: true}, (err, user) => {
      if (err) return res.status(500).send("There was a problem updating the user.");
      res.status(200).send(user);
      // res.status(200).send({ auth: true, token: token });
    });
  });
});



router.get('/logout/:userID', verifyToken, function(req, res) {
  User.findOneAndUpdate({_id: req.params.userID}, {$set: {
    tokens: {
      access: "false",
      token: null
    }
  }
  }, {new: true}, (err, user) => {
    if (err) return res.status(500).send("There was a problem during logout.");

    var token = req.headers['x-access-token'];
    res.status(200).send({ auth: false, token: null });
  });
});


module.exports = router;