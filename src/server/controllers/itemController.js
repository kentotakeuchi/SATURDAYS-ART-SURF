const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('../models/Item');
const verifyToken = require('../verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get the default connection
const db = mongoose.connection;


router.post('/', verifyToken, (req, res) => {
    // console.log(`req.body`, req.body);

    if (!req.body) return res.sendStatus(400);

    // Create an instance of model SomeModel
    const item = new Item({
        accessionNumber:req.body.accessionNumber,
        additionalImages: req.body.additionalImages,
        artistBeginDate: req.body.artistBeginDate,
        artistDisplayName: req.body.artistDisplayName,
        artistEndDate: req.body.artistEndDate,
        artistNationality: req.body.artistNationality,
        artistRole: req.body.artistRole,
        city: req.body.city,
        classification: req.body.classification,
        brand: req.body.brand,
        department: req.body.department,
        dimensions: req.body.dimensions,
        isPublicDomain: req.body.isPublicDomain,
        medium: req.body.medium,
        objectBeginDate: req.body.objectBeginDate,
        objectEndDate: req.body.objectEndDate,
        objectID: req.body.objectID,
        objectName: req.body.objectName,
        objectURL: req.body.objectURL,
        primaryImage: req.body.primaryImage,
        primaryImageSmall: req.body.primaryImageSmall,
        repository: req.body.repository,
        title: req.body.title
    });

    // Save the new item, passing a callback
    item.save(err => {
        if (err) {
            // console.log('err', err);
            res.end('error adding your item!');
            return handleError(err);
        }
        res.end('You have successfully added your item!');
    });
});

router.get('/search/:query', verifyToken, (req, res) => {

    const query = req.params.query;
    console.log(`query`, query);

    Item.find({ $text: { $search: query } }, (err, items) => {
        if (err) {
            res.end('Error searching item.');
        } else {
            res.send(items);
        }
    });
});


module.exports = router;


// app.post('/items/search', VerifyToken, (req, res) => {
//     const searchText = req.body.searchText;

//     if (!req.body) return res.sendStatus(400);

//     const filter = req.body.filter == 'true' ? {
//         name: 1,
//         _id: 0
//     } : {};

//     Item.find({
//         "name": { $regex: searchText, $options: 'i' }
//     }, filter, (err, items) => {
//         if (err) {
//             res.end('Error searching item.');
//         } else {
//             res.send(items);
//         }
//     });
// });