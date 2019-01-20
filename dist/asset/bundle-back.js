/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/back.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/back.js":
/*!****************************!*\
  !*** ./src/server/back.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst authController = __webpack_require__(/*! ./controllers/authController */ \"./src/server/controllers/authController.js\");\nconst contactController = __webpack_require__(/*! ./controllers/contactController */ \"./src/server/controllers/contactController.js\");\nconst itemController = __webpack_require__(/*! ./controllers/itemController */ \"./src/server/controllers/itemController.js\");\nconst queryController = __webpack_require__(/*! ./controllers/queryController */ \"./src/server/controllers/queryController.js\");\nconst userController = __webpack_require__(/*! ./controllers/userController */ \"./src/server/controllers/userController.js\");\n\nconst app = express();\n\n// Set up default mongoose connection\nconst mongoDB = 'mongodb://127.0.0.1/saturdays-art-surf';\nmongoose.connect(mongoDB, { useNewUrlParser: true });\n\n// Get Mongoose to use the global promise library\nmongoose.Promise = global.Promise;\n\n// Get the default connection\nconst db = mongoose.connection;\n\n/*\napp.use( bodyParser.json() );       // to support JSON-encoded bodies\n*/\napp.use(bodyParser.urlencoded({     // to support URL-encoded bodies\n  extended: true\n}));\n\n\n// Bind connection to error event (to get notification of connection errors)\ndb.on('error', console.error.bind(console, 'MongoDB connection error:'));\n\n// Add headers\napp.use((req, res, next) => {\n    // Website you wish to allow to connect\n    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');\n\n    // Request methods you wish to allow\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');\n\n    // Request headers you wish to allow\n    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');\n\n    // Set to true if you need the website to include cookies in the requests sent\n    // to the API (e.g. in case you use sessions)\n    res.setHeader('Access-Control-Allow-Credentials', true);\n\n    // Pass to next layer of middleware\n    next();\n});\n\n// AUTHENTIFICATION\napp.use('/api/auth', authController);\n// CONTACT US\napp.use('/api/contact', contactController);\n// ITEM\napp.use('/api/item', itemController);\n// QUERY\napp.use('/api/query', queryController);\n// SETTINGS\napp.use('/api/user', userController);\n\n\nmodule.exports = app;\n\n//# sourceURL=webpack:///./src/server/back.js?");

/***/ }),

/***/ "./src/server/config.js":
/*!******************************!*\
  !*** ./src/server/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\n    \"proxy\": \"https://cors-anywhere.herokuapp.com/\",\n\n    // TWITTER\n    \"twitter\": {\n        \"consumer_key\": \"t51ofvZzAyIr4D65HQSMTBGBt\",\n        \"consumer_secret\": \"XzuR7J4QZvlAESSNnkm5RA53Tk5tBwDIucU9qw21QiojcdJClq\",\n        \"callbackURL\": \"http://localhost:3000/auth/login/twitter/callback\"\n    },\n\n    // FACEBOOK\n    \"facebook\": {\n        \"app_id\": \"303968186904870\",\n        \"app_secret\": \"2a501c9f19dfdcf71541ef0d9fe18860\",\n        \"callbackURL\": \"http://localhost:3000/auth/login/facebook/callback\"\n    },\n\n    // VERIFY TOKEN\n    'secret': 'supersecret',\n\n    // CONTACT\n    'email': 'ideal.kt.reality@gmail.com',\n    'password': 'Ronaldinho10g'\n};\n\n//# sourceURL=webpack:///./src/server/config.js?");

/***/ }),

/***/ "./src/server/controllers/authController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/authController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nrouter.use(bodyParser.urlencoded({ extended: false }));\nrouter.use(bodyParser.json());\n\nconst User = __webpack_require__(/*! ../models/User */ \"./src/server/models/User.js\");\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst config = __webpack_require__(/*! ../config */ \"./src/server/config.js\");\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\n\n// TWITTER\nconst twitterAPI = __webpack_require__(/*! node-twitter-api */ \"node-twitter-api\");\nconst twitter = new twitterAPI({\n    consumerKey: config.twitter.consumer_key,\n    consumerSecret: config.twitter.consumer_secret,\n    callback: config.twitter.callbackURL\n});\nif (typeof localStorage === \"undefined\" || localStorage === null) {\n  let LocalStorage = __webpack_require__(/*! node-localstorage */ \"node-localstorage\").LocalStorage;\n  localStorage = new LocalStorage('./scratch');\n}\n\n// FACEBOOK\nconst passport = __webpack_require__(/*! passport */ \"passport\");\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\n// const FacebookTokenStrategy = require('passport-facebook-token');\nconst FacebookStrategy = __webpack_require__(/*! passport-facebook */ \"passport-facebook\").Strategy;\n\nrouter.use(session({\n  secret: 's3cr3t',\n  resave: true,\n  saveUninitialized: true\n}));\nrouter.use(passport.initialize());\nrouter.use(passport.session());\n\npassport.use(new FacebookStrategy({\n  clientID: config.facebook.app_id,\n  clientSecret: config.facebook.app_secret,\n  callbackURL: config.facebook.callbackURL,\n},\n(accessToken, refreshToken, profile, cb) => {\n  console.log(`accessToken`, accessToken);\n  console.log(`refreshToken`, refreshToken);\n  console.log(`profile`, profile);\n\n  User.findOrCreate({ facebookId: profile.id }, (err, user) => {\n\n    return cb(err, user); // the user object we just made gets passed to the route's controller as `req.user`\n  });\n}));\n\n\n///////////////////////////////////////////////\n/// TWITTER\n\nlet reqTokenSecret;\n\nrouter.get(`/login/twitter`, (req, res) => {\n\n    twitter.getRequestToken((err, requestToken, requestTokenSecret, results) => {\n\n      if (err) {\n        console.log(`err getting OAuth request token : ${err}`);\n      } else {\n\n        reqTokenSecret = requestTokenSecret;\n      }\n\n      res.send({url: `https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`});\n  });\n});\n\n// twitter page > veryfied > redirect to the below router.\n// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓\n\nrouter.get(`/login/twitter/callback`, (req, res) => {\n\n  const reqToken = req.query.oauth_token,\n        verifier = req.query.oauth_verifier;\n\n  twitter.getAccessToken(reqToken, reqTokenSecret, verifier, (err, accessToken, accessTokenSecret, results) => {\n\n    if (err) {\n      console.log(err);\n    } else {\n\n      twitter.verifyCredentials(accessToken, accessTokenSecret, (err, userTW) => {\n\n        if (err) return handleDBError(err, res);\n\n        // MEMO: From here, my custom code(JWT x TWITTER).↓↓↓↓↓↓↓\n        // create a token\n        const token = jwt.sign({ id: userTW._id }, config.secret, {\n          expiresIn: 86400 // expires in 24 hours\n        });\n\n        User.findOneAndUpdate(\n        { id: userTW.id },\n        { tokens: { access: `auth`, token: token }},\n        (err, user) => {\n\n          if (err) return handleDBError(err, res);\n\n          // If twitter id has NOT existed in db yet.\n          if (!user) {\n            console.log(`id NOT exist`);\n\n            User.create({\n              id: userTW.id,\n              name: userTW.screen_name,\n              email: `We don't have your email address and password.`,\n              password: `We don't have your password`,\n              tokens: {\n                access: `auth`,\n                token: token\n              },\n              accessToken: accessToken,\n              accessTokenSecret: accessTokenSecret\n            },\n            (err, userNew) => {\n              if (err) return res.status(500).send(\"There was a problem registering the user.\");\n              console.log(`userNew`, userNew);\n\n              localStorage.setItem('token', token);\n              localStorage.setItem('user_id', userNew._id);\n            });\n\n          // If twitter id has already existed in db.\n          } else {\n            console.log(`id exist`);\n\n            localStorage.setItem('token', token);\n            localStorage.setItem('user_id', user._id);\n          }\n\n          res.redirect(`http://localhost:8080/main.html`);\n        });\n      });\n    }\n  });\n});\n\n\n// Trigger when main page is loaded.\nrouter.get(`/login/twitter/accessToken`, (req, res) => {\n\n  const userID = localStorage.getItem(`user_id`);\n  const token = localStorage.getItem(`token`);\n  const dataArr = [userID, token];\n  res.send(dataArr);\n});\n\n\n///////////////////////////////////////////////\n/// FACEBOOK\n\nrouter.get(`/login/facebook`, (req, res, next) => {\n  console.log(`here`);\n  // console.log(`req.user`, req.user);\n\n  passport.authenticate(`facebook`, (err, user, info) => {\n    console.log(`err`, err);\n    console.log(`user`, user);\n    console.log(`info`, info);\n  })(req, res, next);\n});\n\nrouter.get(`/login/facebook/callback`, (req, res) => {\n  console.log(`cb`);\n\n  passport.authenticate(`facebook`, { failureRedirect: `http://localhost:8080` }),\n  (req, res) => {\n    // Successful authentication, redirect home.\n    res.redirect(`http://localhost:8080/main.html`);\n  }\n});\n\n\n///////////////////////////////////////////////\n/// REGISTER\n\nrouter.post('/register', (req, res) => {\n  console.log(`req.body`, req.body);\n\n    // Check if the user's email has already existed or not.\n    User.findOne({ email: req.body.email }, (err, email) => {\n\n        if (err) return handleDBError(err, res);\n        if (email) return res.status(409).send('an account with this user\\'s email already exists');\n\n        const hashedPassword = bcrypt.hashSync(req.body.password, 8);\n        User.create({\n          email : req.body.email,\n          password : hashedPassword,\n        },\n        (err, user) => {\n        if (err) return res.status(500).send(\"There was a problem registering the user.\");\n\n        // create a token\n        const token = jwt.sign({ id: user._id }, config.secret, {\n            expiresIn: 86400 // expires in 24 hours\n        });\n        console.log(`user`, user);\n\n        res.status(200).send({ auth: true, token: token });\n        });\n    });\n});\n\n\n///////////////////////////////////////////////\n/// LOGIN\n\nrouter.post('/login', (req, res) => {\n  // Email validation.\n  User.findOne({ email: req.body.email }, (err, user) => {\n    if (err) return handleDBError(err, res);\n    if (!user) return res.status(401).send('No user found.');\n\n    // Password validation.\n    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);\n    if (!passwordIsValid) return res.status(401).send('Password is incorrect.');\n\n    const token = jwt.sign({ id: user._id }, config.secret, {\n      expiresIn: 86400 // expires in 24 hours\n    });\n\n    User.findByIdAndUpdate(user._id, {$set: {\n      tokens: {\n        access: \"auth\",\n        token: token\n      }\n    }\n    }, {new: true}, (err, user) => {\n      if (err) return res.status(500).send(\"There was a problem updating the user.\");\n      res.status(200).send(user);\n      // res.status(200).send({ auth: true, token: token });\n    });\n  });\n});\n\n\n///////////////////////////////////////////////\n/// LOGOUT\n\nrouter.get('/logout/:userID', verifyToken, function(req, res) {\n  User.findOneAndUpdate({_id: req.params.userID}, {$set: {\n    tokens: {\n      access: \"false\",\n      token: null\n    }\n  }\n  }, {new: true}, (err, user) => {\n    if (err) return res.status(500).send(\"There was a problem during logout.\");\n\n    var token = req.headers['x-access-token'];\n    res.status(200).send({ auth: false, token: null });\n  });\n});\n\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/controllers/authController.js?");

/***/ }),

/***/ "./src/server/controllers/contactController.js":
/*!*****************************************************!*\
  !*** ./src/server/controllers/contactController.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nconst config = __webpack_require__(/*! ../config */ \"./src/server/config.js\");\n\n\n/* GET users listing. */\nrouter.post('/', verifyToken, (req, res) => {\n    const email = req.body.email;\n    const inquiry = req.body.inquiry;\n    const content = `email: ${email} \\n inquiry: ${inquiry} `;\n\n    const transporter = nodemailer.createTransport({\n        service: 'gmail',\n        auth: {\n            user: config.email,\n            pass: config.password\n        }\n    });\n\n    const mailOptions = {\n        from: email, // sender address\n        to: config.email, // list of receivers\n        subject: 'New Message from Contact Form', // Subject line\n        text: content// plain text body\n    };\n    transporter.sendMail(mailOptions, (err, info) => {\n        console.log(`info`, info);\n        console.log(`err`, err);\n\n        if(err) {\n            res.send('A problem has been occurred while submitting your data.');\n        } else {\n            res.send('Your message has been sent successfully.');\n        }\n    });\n});\n\nmodule.exports = router;\n\n\n\n//# sourceURL=webpack:///./src/server/controllers/contactController.js?");

/***/ }),

/***/ "./src/server/controllers/itemController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/itemController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst request = __webpack_require__(/*! request */ \"request\");\nconst schedule = __webpack_require__(/*! node-schedule */ \"node-schedule\");\n\nconst Item = __webpack_require__(/*! ../models/Item */ \"./src/server/models/Item.js\");\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\n\nrouter.use(bodyParser.urlencoded({ extended: true }));\nrouter.use(bodyParser.json());\n\n\nconst date = formatDate(new Date());\n\n// UPDATE WHOLE DATA AT 6:00 AM\nschedule.scheduleJob('55 9 * * *', () => { // min hour dom month dow\n\n    // GET WHOLE DATA AND STORE THEM INTO DB\n    request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`, (err, res, body) => {\n        console.log(`data`, date);\n\n        if(err) return console.log(err);\n\n        const ids = JSON.parse(body).objectIDs;\n\n        ids.forEach(el => {\n            request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`, (err, res, body) => {\n\n                if(err) return console.log(err);\n\n                const data = JSON.parse(body);\n\n                if (data.primaryImageSmall !== ``) {\n                    if (!data) return res.sendStatus(400);\n\n                    Item.findOne({ objectID: data.objectID }, (err, item) => {\n                        console.log(`data.objectID`, data.objectID);\n\n                        if(err) return console.log(err);\n\n                        if (item !== null) {\n                            console.log(`not save`);\n                            return;\n                        } else {\n                            console.log(`save`);\n\n                            // Create an instance of model SomeModel\n                            const item = new Item({\n                                accessionNumber:data.accessionNumber,\n                                additionalImages: data.additionalImages,\n                                artistBeginDate: data.artistBeginDate,\n                                artistDisplayName: data.artistDisplayName,\n                                artistEndDate: data.artistEndDate,\n                                artistNationality: data.artistNationality,\n                                artistRole: data.artistRole,\n                                city: data.city,\n                                classification: data.classification,\n                                brand: data.brand,\n                                department: data.department,\n                                dimensions: data.dimensions,\n                                isPublicDomain: data.isPublicDomain,\n                                medium: data.medium,\n                                objectBeginDate: data.objectBeginDate,\n                                objectEndDate: data.objectEndDate,\n                                objectID: data.objectID,\n                                objectName: data.objectName,\n                                objectURL: data.objectURL,\n                                primaryImage: data.primaryImage,\n                                primaryImageSmall: data.primaryImageSmall,\n                                repository: data.repository,\n                                title: data.title\n                            });\n\n                            // Save the new item, passing a callback\n                            item.save(err => {\n                                if (err) return handleError(err);\n\n                                console.log(`You have successfully added new data!`);\n                            });\n                        }\n                    });\n                }\n            });\n        });\n    });\n});\n\n\n// GET 5 DATA FROM DB AT RANDOM FOR \"BG OF LANDING PAGE\"\nrouter.get(`/`, (req, res) => {\n\n    Item.findRandom({}, {}, {limit: 45}, (err, items) => {\n\n        if (err) {\n            res.end('Error getting items.');\n        } else {\n            res.send(items);\n        }\n    });\n});\n\n\n// GET 5 DATA FROM DB AT RANDOM FOR \"MAIN PAGE\"\nrouter.get(`/main`, verifyToken, (req, res) => {\n\n    Item.findRandom({}, {}, {limit: 5}, (err, items) => {\n\n        if (err) {\n            res.end('Error getting items.');\n        } else {\n            res.send(items);\n        }\n    });\n});\n\n\n// GET AN ITEM USER CLICKS\nrouter.get(`/:id`, verifyToken, (req, res) => {\n\n    const id = req.params.id;\n\n    Item.findOne({ objectID: id }, (err, item) => {\n\n        if (err) {\n            res.end(`Error getting item.`);\n        } else {\n            res.send(item);\n        }\n    });\n});\n\n\n// GET ITEMS USER SEARCHED\nrouter.get('/search/:query', verifyToken, (req, res) => {\n\n    const query = req.params.query;\n\n    Item.find({ $text: { $search: query } }, (err, items) => {\n        if (err) {\n            res.end('Error searching item.');\n        } else {\n            res.send(items);\n        }\n    });\n});\n\n\nfunction formatDate(date) {\n\n    const day = date.getDate();\n    const month = date.getMonth();\n    const year = date.getFullYear();\n\n    if (month < 9 && day < 10) {\n        return `${year}-0${month + 1}-0${day}`;\n    } else if (month < 9 && day >= 10) {\n        return `${year}-0${month + 1}-${day}`;\n    } else if (month >= 9 && day < 10) {\n        return `${year}-${month + 1}-0${day}`;\n    } else if (month >= 9 && day >= 10) {\n        return `${year}-${month + 1}-${day}`;\n    }\n};\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/controllers/itemController.js?");

/***/ }),

/***/ "./src/server/controllers/queryController.js":
/*!***************************************************!*\
  !*** ./src/server/controllers/queryController.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst Query = __webpack_require__(/*! ../models/Query */ \"./src/server/models/Query.js\");\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\n\nrouter.use(bodyParser.urlencoded({ extended: true }));\nrouter.use(bodyParser.json());\n\n\n// GET LIST OF QUERY\nrouter.get('/list', verifyToken, (req, res) => {\n\n    Query.find({}, (err, queries) => {\n\n        if (err) {\n            res.end(`Error getting query list.`);\n        } else {\n            res.send(queries);\n        }\n    });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/controllers/queryController.js?");

/***/ }),

/***/ "./src/server/controllers/userController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/userController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n\nconst User = __webpack_require__(/*! ../models/User */ \"./src/server/models/User.js\");\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\n\nrouter.use(bodyParser.urlencoded({ extended: true }));\nrouter.use(bodyParser.json());\n\n\n// SETTINGS > EMAL & PASSWORD UPDATE\nrouter.put(`/:userID`, verifyToken, (req, res) => {\n\n    User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, (err, user) => {\n        console.log(`req.body`, req.body);\n        console.log(`user`, user);\n\n        if (err) return res.status(500).send(\"There was a problem updating the user.\");\n\n        // Current password validation.\n        const passwordIsValid = bcrypt.compareSync(req.body.curPassword, user.password);\n        if (!passwordIsValid) return res.status(401).send('Current password is incorrect.');\n\n        // Update password.\n        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);\n        User.findOneAndUpdate({_id: req.params.userID}, {password: hashedPassword}, {new: true}, (err, user) => {\n\n            if (err) return res.status(500).send(\"There was a problem updating the user.\");\n            res.status(200).send(user);\n        });\n    });\n});\n\n\n// SETTINGS > GETTING USER DATA FOR DISPLAY EMAIL WITH POPUP MODAL\nrouter.get('/:userID', verifyToken, (req, res) => {\n\n    User.findOne({_id: req.params.userID}, (err, user) => {\n\n        if (err) return res.status(500).send(\"There was a problem finding the user.\");\n        if (!user) return res.status(404).send(\"No user found.\");\n        res.status(200).send(user);\n    });\n});\n\n// SETTINGS > COMPARE INPUT DATA WITH CURRENT PASSWORD\nrouter.post('/:userID', (req, res) => {\n\n    User.findOne({_id: req.params.userID}, (err, user) => {\n\n        if (err) return res.status(500).send(\"There was a problem finding the users.\");\n\n        // COMPARE\n        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);\n        if (!passwordIsValid) return res.status(401).send('Password is incorrect.');\n\n        res.status(200).send('Match');\n    });\n});\n\n\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./src/server/controllers/userController.js?");

/***/ }),

/***/ "./src/server/models/Item.js":
/*!***********************************!*\
  !*** ./src/server/models/Item.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst random = __webpack_require__(/*! mongoose-simple-random */ \"mongoose-simple-random\");\nconst Schema = mongoose.Schema;\n\nconst ItemSchema = new Schema({\n    accessionNumber: String,\n    additionalImages: Array,\n    artistBeginDate: String,\n    artistDisplayName: String,\n    artistEndDate: String,\n    artistNationality: String,\n    artistRole: String,\n    city: String,\n    classification: String,\n    brand: String,\n    department: String,\n    dimensions: String,\n    isPublicDomain: Boolean,\n    medium: String,\n    objectBeginDate: Number,\n    objectEndDate: Number,\n    objectID: Number,\n    objectName: String,\n    objectURL: String,\n    primaryImage: String,\n    primaryImageSmall: String,\n    repository: String,\n    title: String\n});\n\n// For search whole string.\n// Case insensitive, multiple fields, but not allowing with partial string like \"sur\" for \"surfin\".\nItemSchema.index({'$**': 'text'});\n\n// For findRandom method.\nItemSchema.plugin(random);\n\nconst Item = mongoose.model('Item', ItemSchema);\n\nmodule.exports = Item;\n\n//# sourceURL=webpack:///./src/server/models/Item.js?");

/***/ }),

/***/ "./src/server/models/Query.js":
/*!************************************!*\
  !*** ./src/server/models/Query.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst QuerySchema = new Schema({\n\n    objQueries: Array,\n    geoQueries: Array,\n    dateQueries: Array,\n    deptQueries: Array\n});\n\nconst Query = mongoose.model('Query', QuerySchema);\n\nmodule.exports = Query;\n\n//# sourceURL=webpack:///./src/server/models/Query.js?");

/***/ }),

/***/ "./src/server/models/User.js":
/*!***********************************!*\
  !*** ./src/server/models/User.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst UserSchema = new Schema({\n\n    email: String,\n    password: String,\n\n    tokens: [{\n        access: {\n            type: String,\n            required: true\n        },\n        token: {\n            type: String,\n            required: true\n        }\n    }],\n\n    // TODO: probably, no need.\n    requestToken: String,\n    requestTokenSecret: String,\n\n    // TWITTER\n    id: Number,\n    name: String,\n    accessToken: String,\n    accessTokenSecret: String\n});\n\nUserSchema.statics.findOrCreate = __webpack_require__(/*! find-or-create */ \"find-or-create\");\n\nconst User = mongoose.model('User', UserSchema);\n\nmodule.exports = User;\n\n//# sourceURL=webpack:///./src/server/models/User.js?");

/***/ }),

/***/ "./src/server/verifyToken.js":
/*!***********************************!*\
  !*** ./src/server/verifyToken.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst config = __webpack_require__(/*! ./config */ \"./src/server/config.js\");\n\nfunction verifyToken(req, res, next) {\n\n  const token = req.headers['x-access-token'];\n\n  if (!token)\n    return res.status(403).send({ auth: false, message: 'No token provided.' });\n\n  jwt.verify(token, config.secret, (err, decoded) => {\n    if (err)\n    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });\n    // if everything good, save to request for use in other routes\n    req.userId = decoded.id;\n    next();\n  });\n}\n\nmodule.exports = verifyToken;\n\n//# sourceURL=webpack:///./src/server/verifyToken.js?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "find-or-create":
/*!*********************************!*\
  !*** external "find-or-create" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"find-or-create\");\n\n//# sourceURL=webpack:///external_%22find-or-create%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-simple-random":
/*!*****************************************!*\
  !*** external "mongoose-simple-random" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-simple-random\");\n\n//# sourceURL=webpack:///external_%22mongoose-simple-random%22?");

/***/ }),

/***/ "node-localstorage":
/*!************************************!*\
  !*** external "node-localstorage" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-localstorage\");\n\n//# sourceURL=webpack:///external_%22node-localstorage%22?");

/***/ }),

/***/ "node-schedule":
/*!********************************!*\
  !*** external "node-schedule" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-schedule\");\n\n//# sourceURL=webpack:///external_%22node-schedule%22?");

/***/ }),

/***/ "node-twitter-api":
/*!***********************************!*\
  !*** external "node-twitter-api" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-twitter-api\");\n\n//# sourceURL=webpack:///external_%22node-twitter-api%22?");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-facebook":
/*!************************************!*\
  !*** external "passport-facebook" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-facebook\");\n\n//# sourceURL=webpack:///external_%22passport-facebook%22?");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request\");\n\n//# sourceURL=webpack:///external_%22request%22?");

/***/ })

/******/ });