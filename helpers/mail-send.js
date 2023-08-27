const nodemailer = require('nodemailer');
const config = require("../config");

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: config.email.emailAddress,
        pass: config.email.password
    }
});

module.exports = transporter;