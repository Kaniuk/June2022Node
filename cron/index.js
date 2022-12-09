const removeOldToken = require('./removeOldToken');
const removeOldPassword = require('./removeOldPasswords');

const cronRunner = () => {
    removeOldToken.start();
    removeOldPassword.start();
};

module.exports = {
    cronRunner,
};