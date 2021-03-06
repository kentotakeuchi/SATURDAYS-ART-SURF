const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require("request");
const schedule = require('node-schedule');

const Item = require('../models/Item');
const verifyToken = require('../verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


const date = formatDate(new Date());

// UPDATE WHOLE DATA AT 6:00 AM
schedule.scheduleJob('29 10 * * *', () => { // min hour dom month dow

    // GET WHOLE DATA AND STORE THEM INTO DB
    request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`, (err, res, body) => {
        console.log(`data`, date);

        if(err) return console.log(err);

        const ids = JSON.parse(body).objectIDs;

        ids.forEach(el => {
            request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`, (err, res, body) => {

                if(err) return console.log(err);

                const data = JSON.parse(body);

                if (data.primaryImageSmall !== ``) {
                    if (!data) return res.sendStatus(400);

                    Item.findOne({ objectID: data.objectID }, (err, item) => {
                        console.log(`data.objectID`, data.objectID);

                        if(err) return console.log(err);

                        if (item !== null) {
                            console.log(`not save`);
                            return;
                        } else {
                            console.log(`save`);

                            // Create an instance of model SomeModel
                            const item = new Item({
                                accessionNumber:data.accessionNumber,
                                additionalImages: data.additionalImages,
                                artistBeginDate: data.artistBeginDate,
                                artistDisplayName: data.artistDisplayName,
                                artistEndDate: data.artistEndDate,
                                artistNationality: data.artistNationality,
                                artistRole: data.artistRole,
                                city: data.city,
                                classification: data.classification,
                                brand: data.brand,
                                department: data.department,
                                dimensions: data.dimensions,
                                isPublicDomain: data.isPublicDomain,
                                medium: data.medium,
                                objectBeginDate: data.objectBeginDate,
                                objectEndDate: data.objectEndDate,
                                objectID: data.objectID,
                                objectName: data.objectName,
                                objectURL: data.objectURL,
                                primaryImage: data.primaryImage,
                                primaryImageSmall: data.primaryImageSmall,
                                repository: data.repository,
                                title: data.title
                            });

                            // Save the new item, passing a callback
                            item.save(err => {
                                if (err) return handleError(err);

                                console.log(`You have successfully added new data!`);
                            });
                        }
                    });
                }
            });
        });
    });
});


// GET 5 DATA FROM DB AT RANDOM FOR "BG OF LANDING PAGE"
router.get(`/`, (req, res) => {
    console.log(`get img for bg`);

    Item.findRandom({}, {}, {limit: 45}, (err, items) => {

        if (err) {
            res.end('Error getting items.');
        } else {
            res.send(items);
        }
    });
});


// GET 5 DATA FROM DB AT RANDOM FOR "MAIN PAGE"
router.get(`/main`, verifyToken, (req, res) => {

    Item.findRandom({}, {}, {limit: 5}, (err, items) => {

        if (err) {
            res.end('Error getting items.');
        } else {
            res.send(items);
        }
    });
});


// GET AN ITEM USER CLICKS
router.get(`/:id`, verifyToken, (req, res) => {

    const id = req.params.id;

    Item.findOne({ objectID: id }, (err, item) => {

        if (err) {
            res.end(`Error getting item.`);
        } else {
            res.send(item);
        }
    });
});


// GET ITEMS USER SEARCHED
router.get('/search/:query', verifyToken, (req, res) => {

    const query = req.params.query;

    Item.find({ $text: { $search: query } }, (err, items) => {
        if (err) {
            res.end('Error searching item.');
        } else {
            res.send(items);
        }
    });
});


function formatDate(date) {

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month < 9 && day < 10) {
        return `${year}-0${month + 1}-0${day}`;
    } else if (month < 9 && day >= 10) {
        return `${year}-0${month + 1}-${day}`;
    } else if (month >= 9 && day < 10) {
        return `${year}-${month + 1}-0${day}`;
    } else if (month >= 9 && day >= 10) {
        return `${year}-${month + 1}-${day}`;
    }
};

module.exports = router;
