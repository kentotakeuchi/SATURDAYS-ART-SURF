const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Query = require('../models/Query');
const verifyToken = require('../verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// GET LIST OF QUERY
router.get('/list', verifyToken, (req, res) => {

    Query.find({}, (err, queries) => {
        console.log(`queries`, queries);

        if (err) {
            res.end(`Error getting query list.`);
        } else {
            res.send(queries);
        }
    });
});

module.exports = router;