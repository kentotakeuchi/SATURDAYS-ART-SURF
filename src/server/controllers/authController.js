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

// TWITTER
const twitterAPI = require('node-twitter-api');
const twitter = new twitterAPI({
    consumerKey: config.twitter.consumer_key,
    consumerSecret: config.twitter.consumer_secret,
    callback: config.twitter.callbackURL
});
if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/*
// FACEBOOK
const passport = require('passport');
const session = require('express-session');
// const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;

router.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: config.facebook.app_id,
  clientSecret: config.facebook.app_secret,
  callbackURL: config.facebook.callbackURL,
},
(accessToken, refreshToken, profile, cb) => {
  console.log(`accessToken`, accessToken);
  console.log(`refreshToken`, refreshToken);
  console.log(`profile`, profile);

  User.findOrCreate({ facebookId: profile.id }, (err, user) => {

    return cb(err, user); // the user object we just made gets passed to the route's controller as `req.user`
  });
}));
*/


///////////////////////////////////////////////
/// TWITTER

let reqTokenSecret;

router.get(`/login/twitter`, (req, res) => {

    twitter.getRequestToken((err, requestToken, requestTokenSecret, results) => {
      console.log(`requestToken`, requestToken);

      if (err) {
        console.log(`err getting OAuth request token : ${err}`);
      } else {

        reqTokenSecret = requestTokenSecret;
      }

      res.send({url: `https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`});
  });
});

// twitter page > veryfied > redirect to the below router.
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

router.get(`/login/twitter/callback`, (req, res) => {

  const reqToken = req.query.oauth_token,
        verifier = req.query.oauth_verifier;

  twitter.getAccessToken(reqToken, reqTokenSecret, verifier, (err, accessToken, accessTokenSecret, results) => {

    if (err) {
      console.log(err);
    } else {

      twitter.verifyCredentials(accessToken, accessTokenSecret, (err, userTW) => {

        if (err) return handleDBError(err, res);

        // MEMO: From here, my custom code(JWT x TWITTER).↓↓↓↓↓↓↓
        // create a token
        const token = jwt.sign({ id: userTW._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        User.findOneAndUpdate(
        { id: userTW.id },
        { tokens: { access: `auth`, token: token }},
        (err, user) => {

          if (err) return handleDBError(err, res);

          // If twitter id has NOT existed in db yet.
          if (!user) {
            console.log(`id NOT exist`);

            User.create({
              id: userTW.id,
              name: userTW.screen_name,
              email: `We don't have your email address and password.`,
              password: `We don't have your password`,
              tokens: {
                access: `auth`,
                token: token
              },
              accessToken: accessToken,
              accessTokenSecret: accessTokenSecret
            },
            (err, userNew) => {
              if (err) return res.status(500).send("There was a problem registering the user.");
              console.log(`userNew`, userNew);

              localStorage.setItem('token', token);
              localStorage.setItem('user_id', userNew._id);
            });

          // If twitter id has already existed in db.
          } else {
            console.log(`id exist`);

            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user._id);
          }

          res.redirect(`http://www.kentotakeuchi.com/saturdays-art-surf/main.html`);
        });
      });
    }
  });
});


// Trigger when main page is loaded.
router.get(`/login/twitter/accessToken`, (req, res) => {

  const userID = localStorage.getItem(`user_id`);
  const token = localStorage.getItem(`token`);
  const dataArr = [userID, token];
  res.send(dataArr);
});


/*
///////////////////////////////////////////////
/// FACEBOOK

router.get(`/login/facebook`, (req, res, next) => {
  console.log(`here`);
  // console.log(`req.user`, req.user);

  passport.authenticate(`facebook`, (err, user, info) => {
    console.log(`err`, err);
    console.log(`user`, user);
    console.log(`info`, info);
  })(req, res, next);
});

router.get(`/login/facebook/callback`, (req, res) => {
  console.log(`cb`);

  passport.authenticate(`facebook`, { failureRedirect: `http://localhost:8080` }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:8080/main.html`);
  }
});
*/


///////////////////////////////////////////////
/// REGISTER

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


///////////////////////////////////////////////
/// LOGIN

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


///////////////////////////////////////////////
/// LOGOUT

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