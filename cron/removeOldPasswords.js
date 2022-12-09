const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const OldPassword = require('../dataBase/OldPassword');

dayjs.extend(utc);
module.exports = new CronJob(
    '* * */1 * * *',
    async function () {
        try {
            const yearAgo = dayjs().utc().subtract(1, 'year');
            await OldPassword.deleteMany({createdAt: {$lte: yearAgo}});

        } catch (e) {
            console.error(e);
        }
    },
);