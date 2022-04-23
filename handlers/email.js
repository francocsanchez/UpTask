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

const generarHTML = (archivo, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, options)
    return juice(html);
}

exports.enviar = async (options) => {
    let info = {
        from: '"UpTask" <no-replay@uptask.com>', // sender address
        to: options.user.email, // list of receivers
        subject: options.subject, // Subject line
        text: 'Hi!', // plain text body
        html: generarHTML(options.archivo, options) // html body
    };
    const enviarEmail = util.promisify(transport.sendMail, transport)
    return enviarEmail.call(transport, info)
}