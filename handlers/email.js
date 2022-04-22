const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

var transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

let info = transport.sendMail({
    from: '"Sistem UpTask" <about@uptask.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Reseteo de clave", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
});