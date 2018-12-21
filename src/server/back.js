const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authController = require('./controllers/authController');
const contactController = require('./controllers/contactController');
const itemController = require('./controllers/itemController');
const queryController = require('./controllers/queryController');
const userController = require('./controllers/userController');

const app = express();

// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/saturdays-art-surf';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

/*
app.use( bodyParser.json() );       // to support JSON-encoded bodies
*/
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// AUTHENTIFICATION
app.use('/auth', authController);
// CONTACT US
app.use('/contact', contactController);
// ITEM
app.use('/item', itemController);
// QUERY
app.use('/query', queryController);
// SETTINGS
app.use('/user', userController);


module.exports = app;