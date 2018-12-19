const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const nodemailer = require('nodemailer');
const config = require('../config');


/* GET users listing. */
router.post('/', verifyToken, (req, res) => {
    const email = req.body.email;
    const inquiry = req.body.inquiry;
    const content = `email: ${email} \n inquiry: ${inquiry} `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });

    const mailOptions = {
        from: email, // sender address
        to: config.email, // list of receivers
        subject: 'New Message from Contact Form', // Subject line
        text: content// plain text body
    };
    transporter.sendMail(mailOptions, (err, info) => {
        console.log(`info`, info);
        console.log(`err`, err);

        if(err) {
            res.send('A problem has been occurred while submitting your data.');
        } else {
            res.send('Your message has been sent successfully.');
        }
    });
});

module.exports = router;

