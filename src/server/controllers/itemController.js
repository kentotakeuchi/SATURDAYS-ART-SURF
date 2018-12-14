const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Item = require('../models/Item');
const verifyToken = require('../verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/', verifyToken, (req, res) => {
    console.log(`req.body`, req.body);

    if (!req.body) return res.sendStatus(400);

    // Create an instance of model SomeModel
    var item = new Item({
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
            console.log('err', err);
            res.end('error adding your item!');
            return handleError(err);
        }
        res.end('You have successfully added your item!');
    });
});

module.exports = router;