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
