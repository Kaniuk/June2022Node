const {WELCOME, FORGOT_PASS, REMINDER} = require("../config/email-action.enum");
module.exports = {
    [WELCOME]: {
        subject: 'Welcome on a board',
        templateName: 'welcome'


    },
    [FORGOT_PASS]: {
        subject: 'Your password is under protect',
        templateName: 'forgot-pass'

    },
    [REMINDER]: {
        subject: 'You forget about us!',
        templateName: 'reminder'
    }
};