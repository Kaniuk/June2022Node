const removeOldToken = require('./removeOldToken');
const removeOldPassword = require('./removeOldPasswords');
const reminder = require('./reminderForUser');

const cronRunner = () => {
    removeOldToken.start();
    removeOldPassword.start();
    reminder.start();
};

module.exports = {
    cronRunner,
};