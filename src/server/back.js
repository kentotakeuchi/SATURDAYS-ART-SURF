const path = require('path');
const fs = require('fs');
// const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const authController = require('./controllers/authController');
const contactController = require('./controllers/contactController');
const itemController = require('./controllers/itemController');
const queryController = require('./controllers/queryController');
const userController = require('./controllers/userController');

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);

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
    res.setHeader('Access-Control-Allow-Origin', '*');

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
app.use('/api/auth', authController);
// CONTACT US
app.use('/api/contact', contactController);
// ITEM
app.use('/api/item', itemController);
// QUERY
app.use('/api/query', queryController);
// SETTINGS
app.use('/api/user', userController);


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// third party's middleware for production
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));


module.exports = app;