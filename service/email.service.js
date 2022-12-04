const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const emailTemplates = require('../email-templates');
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/config');
const ApiError = require("../error/ApiError");


const sendEmail = async (receiverMail, emailAction) => {
    console.log('emailAction', emailAction);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailAction];
    console.log({templateInfo});
    if (!templateInfo) {
        throw new ApiError('Wrong template', 500);
    }
    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });
    console.log('---', templateInfo.templateName);
    const html = await templateRenderer.render(templateInfo.templateName);

    console.log('=================3');

    return transporter.sendMail({
        from: 'No reply',
        to: receiverMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendEmail
};