const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const verifyToken = require('../verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// SETTINGS > EMAL & PASSWORD UPDATE
router.put(`/:userID`, verifyToken, (req, res) => {

    User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, (err, user) => {
        console.log(`req.body`, req.body);
        console.log(`user`, user);

        if (err) return res.status(500).send("There was a problem updating the user.");

        // Current password validation.
        const passwordIsValid = bcrypt.compareSync(req.body.curPassword, user.password);
        if (!passwordIsValid) return res.status(401).send('Current password is incorrect.');

        // Update password.
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
        User.findOneAndUpdate({_id: req.params.userID}, {password: hashedPassword}, {new: true}, (err, user) => {

            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(user);
        });
    });
});


// SETTINGS > GETTING USER DATA FOR DISPLAY EMAIL WITH POPUP MODAL
router.get('/:userID', verifyToken, (req, res) => {

    User.findOne({_id: req.params.userID}, (err, user) => {

        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// SETTINGS > COMPARE INPUT DATA WITH CURRENT PASSWORD
router.post('/:userID', (req, res) => {

    User.findOne({_id: req.params.userID}, (err, user) => {

        if (err) return res.status(500).send("There was a problem finding the users.");

        // COMPARE
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send('Password is incorrect.');

        res.status(200).send('Match');
    });
});



module.exports = router;

/*
//////////////////////////////////////////////////////////////
// Profile modal.
router.get('/:userID', verifyToken, function (req, res) {
    User.findOne({_id: req.params.userID}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// Settings page.
router.put('/:userID', VerifyToken, function (req, res) {

    // Find user and update user information.
    User.findOneAndUpdate({_id: req.params.userID}, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");

        // Update userName in the ITEM collection.
        Item.update({userID: req.params.userID}, {userName: req.body.name}, {multi: true},  function(err, items) {

            if (err) return res.status(500).send("There was a problem updating the userName.");

            // Update sender name in the MESSAGE collection.
            Message.update({senderID: req.params.userID}, {sender: req.body.name}, {multi: true},  function(err, messages) {

                if (err) return res.status(500).send("There was a problem updating the sender name.");
                res.status(200).send(user);
            });
        });
    });
});

// Password page.
router.put('/password/:userID', VerifyToken, function (req, res) {
    //TODO: Fix error
    User.findOne({ _id: req.params.userID }, (err, user) => {
        // Current password validation.
        const passwordIsValid = bcrypt.compareSync(req.body.currentPassword, user.password);
        if (!passwordIsValid) return res.status(401).send('Current password is incorrect.');

        // Update password.
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
        User.findOneAndUpdate({name: req.params.name}, {password: hashedPassword}, {new: true}, function (err, user) {

        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
        });
    });
});

// Get user's current password to compare with user input.
router.post('/password/:userID', function (req, res) {
    User.findOne({_id: req.params.userID}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the users.");

        // Password validation.
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send('Password is incorrect.');

        res.status(200).send('Match');
    });
});
//////////////////////////////////////////////////////////////
*/

// Model.findOneAndUpdate(conditions, update, options, (error, doc) => {});

