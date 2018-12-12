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

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst authController = __webpack_require__(/*! ./controllers/authController */ \"./src/server/controllers/authController.js\");\nconst contactController = __webpack_require__(/*! ./controllers/contactController */ \"./src/server/controllers/contactController.js\");\nconst userController = __webpack_require__(/*! ./controllers/userController */ \"./src/server/controllers/userController.js\");\n\nconst app = express();\n\n// Set up default mongoose connection\nconst mongoDB = 'mongodb://127.0.0.1/saturdays-art-surf';\nmongoose.connect(mongoDB, { useNewUrlParser: true });\n\n// Get Mongoose to use the global promise library\nmongoose.Promise = global.Promise;\n\n// Get the default connection\nconst db = mongoose.connection;\napp.use( bodyParser.json() );       // to support JSON-encoded bodies\napp.use(bodyParser.urlencoded({     // to support URL-encoded bodies\n  extended: true\n}));\n\n// Bind connection to error event (to get notification of connection errors)\ndb.on('error', console.error.bind(console, 'MongoDB connection error:'));\n\n// Add headers\napp.use((req, res, next) => {\n    // Website you wish to allow to connect\n    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');\n\n    // Request methods you wish to allow\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');\n\n    // Request headers you wish to allow\n    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');\n\n    // Set to true if you need the website to include cookies in the requests sent\n    // to the API (e.g. in case you use sessions)\n    res.setHeader('Access-Control-Allow-Credentials', true);\n\n    // Pass to next layer of middleware\n    next();\n});\n\n// Authentication\napp.use('/auth', authController);\n// Contact us\napp.use('/contact', contactController);\n// Settings\napp.use('/user', userController);\n\n\n\nmodule.exports = app;\n\n//# sourceURL=webpack:///./src/server/back.js?");

/***/ }),

/***/ "./src/server/config.js":
/*!******************************!*\
  !*** ./src/server/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//\nmodule.exports = {\n    // VERIFY TOKEN\n    'secret': 'supersecret',\n\n    // CONTACT\n    'email': 'ideal.kt.reality@gmail.com',\n    'password': 'Ronaldinho10g'\n};\n\n//# sourceURL=webpack:///./src/server/config.js?");

/***/ }),

/***/ "./src/server/controllers/authController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/authController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nrouter.use(bodyParser.urlencoded({ extended: false }));\nrouter.use(bodyParser.json());\n\nconst User = __webpack_require__(/*! ../models/User */ \"./src/server/models/User.js\");\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nconst config = __webpack_require__(/*! ../config */ \"./src/server/config.js\");\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\n\n\nrouter.post('/register', (req, res) => {\n\n    // Check if the user's email has already existed or not.\n    User.findOne({ email: req.body.email }, (err, email) => {\n\n        if (err) return handleDBError(err, res);\n        if (email) return res.status(409).send('an account with this user\\'s email already exists');\n\n        const hashedPassword = bcrypt.hashSync(req.body.password, 8);\n        User.create({\n        email : req.body.email,\n        password : hashedPassword,\n        },\n        (err, user) => {\n        if (err) return res.status(500).send(\"There was a problem registering the user.\");\n\n        // create a token\n        const token = jwt.sign({ id: user._id }, config.secret, {\n            expiresIn: 86400 // expires in 24 hours\n        });\n\n        res.status(200).send({ auth: true, token: token });\n        });\n    });\n});\n\n/*\n// add the middleware function\nrouter.use(function (user, req, res, next) {\n  res.status(200).send(user);\n});\n*/\n\n\nrouter.post('/login', (req, res) => {\n  // Email validation.\n  User.findOne({ email: req.body.email }, (err, user) => {\n    if (err) return handleDBError(err, res);\n    if (!user) return res.status(401).send('No user found.');\n\n    // Password validation.\n    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);\n    if (!passwordIsValid) return res.status(401).send('Password is incorrect.');\n    const token = jwt.sign({ id: user._id }, config.secret, {\n      expiresIn: 86400 // expires in 24 hours\n    });\n\n    User.findByIdAndUpdate(user._id, {$set: {\n      tokens: {\n        access: \"auth\",\n        token: token\n      }\n    }\n    }, {new: true}, (err, user) => {\n      if (err) return res.status(500).send(\"There was a problem updating the user.\");\n      res.status(200).send(user);\n      // res.status(200).send({ auth: true, token: token });\n    });\n  });\n});\n\n\n\nrouter.get('/logout/:userID', verifyToken, function(req, res) {\n  User.findOneAndUpdate({_id: req.params.userID}, {$set: {\n    tokens: {\n      access: \"false\",\n      token: null\n    }\n  }\n  }, {new: true}, (err, user) => {\n    if (err) return res.status(500).send(\"There was a problem updating the user.\");\n\n    var token = req.headers['x-access-token'];\n    res.status(200).send({ auth: false, token: null });\n  });\n});\n\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/controllers/authController.js?");

/***/ }),

/***/ "./src/server/controllers/contactController.js":
/*!*****************************************************!*\
  !*** ./src/server/controllers/contactController.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nconst config = __webpack_require__(/*! ../config */ \"./src/server/config.js\");\n\n\n/* GET users listing. */\nrouter.post('/', function(req, res) {\n    const email = req.body.email;\n    const inquiry = req.body.inquiry;\n    const content = `email: ${email} \\n inquiry: ${inquiry} `;\n\n    const transporter = nodemailer.createTransport({\n        service: 'gmail',\n        auth: {\n            user: config.email,\n            pass: config.password\n        }\n    });\n\n    const mailOptions = {\n        from: email, // sender address\n        to: config.email, // list of receivers\n        subject: 'New Message from Contact Form', // Subject line\n        text: content// plain text body\n    };\n    transporter.sendMail(mailOptions, function (err, info) {\n        if(err)\n            res.send('A problem has been occurred while submitting your data.');\n        else\n            res.send('Your message has been sent successfully.');\n    });\n});\n\nmodule.exports = router;\n\n\n\n//# sourceURL=webpack:///./src/server/controllers/contactController.js?");

/***/ }),

/***/ "./src/server/controllers/userController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/userController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n\nconst User = __webpack_require__(/*! ../models/User */ \"./src/server/models/User.js\");\nconst verifyToken = __webpack_require__(/*! ../verifyToken */ \"./src/server/verifyToken.js\");\n\nrouter.use(bodyParser.urlencoded({ extended: true }));\nrouter.use(bodyParser.json());\n\n\n// SETTINGS > EMAL & PASSWORD UPDATE\nrouter.put(`/:userID`, verifyToken, (req, res) => {\n\n    User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, (err, user) => {\n        console.log(`req.body`, req.body);\n        console.log(`user`, user);\n\n        if (err) return res.status(500).send(\"There was a problem updating the user.\");\n\n        // Current password validation.\n        const passwordIsValid = bcrypt.compareSync(req.body.curPassword, user.password);\n        if (!passwordIsValid) return res.status(401).send('Current password is incorrect.');\n\n        // Update password.\n        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);\n        User.findOneAndUpdate({_id: req.params.userID}, {password: hashedPassword}, {new: true}, (err, user) => {\n\n            if (err) return res.status(500).send(\"There was a problem updating the user.\");\n            res.status(200).send(user);\n        });\n    });\n});\n\n\n// SETTINGS > GETTING USER DATA FOR DISPLAY EMAIL WITH POPUP MODAL\nrouter.get('/:userID', verifyToken, (req, res) => {\n\n    User.findOne({_id: req.params.userID}, (err, user) => {\n\n        if (err) return res.status(500).send(\"There was a problem finding the user.\");\n        if (!user) return res.status(404).send(\"No user found.\");\n        res.status(200).send(user);\n    });\n});\n\n// SETTINGS > COMPARE INPUT DATA WITH CURRENT PASSWORD\nrouter.post('/:userID', (req, res) => {\n\n    User.findOne({_id: req.params.userID}, (err, user) => {\n\n        if (err) return res.status(500).send(\"There was a problem finding the users.\");\n\n        // COMPARE\n        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);\n        if (!passwordIsValid) return res.status(401).send('Password is incorrect.');\n\n        res.status(200).send('Match');\n    });\n});\n\n\n\nmodule.exports = router;\n\n/*\n//////////////////////////////////////////////////////////////\n// Profile modal.\nrouter.get('/:userID', verifyToken, function (req, res) {\n    User.findOne({_id: req.params.userID}, function (err, user) {\n        if (err) return res.status(500).send(\"There was a problem finding the user.\");\n        if (!user) return res.status(404).send(\"No user found.\");\n        res.status(200).send(user);\n    });\n});\n\n// Settings page.\nrouter.put('/:userID', VerifyToken, function (req, res) {\n\n    // Find user and update user information.\n    User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, function (err, user) {\n        if (err) return res.status(500).send(\"There was a problem updating the user.\");\n\n        // Update userName in the ITEM collection.\n        Item.update({userID: req.params.userID}, {userName: req.body.name}, {multi: true},  function(err, items) {\n\n            if (err) return res.status(500).send(\"There was a problem updating the userName.\");\n\n            // Update sender name in the MESSAGE collection.\n            Message.update({senderID: req.params.userID}, {sender: req.body.name}, {multi: true},  function(err, messages) {\n\n                if (err) return res.status(500).send(\"There was a problem updating the sender name.\");\n                res.status(200).send(user);\n            });\n        });\n    });\n});\n\n// Password page.\nrouter.put('/password/:userID', VerifyToken, function (req, res) {\n    //TODO: Fix error\n    User.findOne({ _id: req.params.userID }, (err, user) => {\n        // Current password validation.\n        const passwordIsValid = bcrypt.compareSync(req.body.currentPassword, user.password);\n        if (!passwordIsValid) return res.status(401).send('Current password is incorrect.');\n\n        // Update password.\n        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);\n        User.findOneAndUpdate({name: req.params.name}, {password: hashedPassword}, {new: true}, function (err, user) {\n\n        if (err) return res.status(500).send(\"There was a problem updating the user.\");\n        res.status(200).send(user);\n        });\n    });\n});\n\n// Get user's current password to compare with user input.\nrouter.post('/password/:userID', function (req, res) {\n    User.findOne({_id: req.params.userID}, function (err, user) {\n        if (err) return res.status(500).send(\"There was a problem finding the users.\");\n\n        // Password validation.\n        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);\n        if (!passwordIsValid) return res.status(401).send('Password is incorrect.');\n\n        res.status(200).send('Match');\n    });\n});\n//////////////////////////////////////////////////////////////\n*/\n\n// Model.findOneAndUpdate(conditions, update, options, (error, doc) => {});\n\n\n\n//# sourceURL=webpack:///./src/server/controllers/userController.js?");

/***/ }),

/***/ "./src/server/models/User.js":
/*!***********************************!*\
  !*** ./src/server/models/User.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\n\nconst UserSchema = new Schema({\n\n    email: String,\n    password: String,\n\n    tokens: [{\n        access: {\n            type: String,\n            required: true\n        },\n        token: {\n            type: String,\n            required: true\n        }\n    }]\n});\n\nconst User = mongoose.model('User', UserSchema);\n\nmodule.exports = User;\n\n//# sourceURL=webpack:///./src/server/models/User.js?");

/***/ }),

/***/ "./src/server/verifyToken.js":
/*!***********************************!*\
  !*** ./src/server/verifyToken.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst config = __webpack_require__(/*! ./config */ \"./src/server/config.js\");\n\nfunction verifyToken(req, res, next) {\n  const token = req.headers['x-access-token'];\n\n  if (!token)\n    return res.status(403).send({ auth: false, message: 'No token provided.' });\n\n  jwt.verify(token, config.secret, (err, decoded) => {\n    if (err)\n    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });\n    // if everything good, save to request for use in other routes\n    req.userId = decoded.id;\n    next();\n  });\n}\n\nmodule.exports = verifyToken;\n\n//# sourceURL=webpack:///./src/server/verifyToken.js?");

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

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ })

/******/ });