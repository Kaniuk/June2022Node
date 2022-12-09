const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const OAuth = require('../dataBase/OAuth');

dayjs.extend(utc);
module.exports = new CronJob(
    '*/30 * * * * *',
    async function () {
        try {
            const monthAgo = dayjs().utc().subtract(1, 'month');
            await OAuth.deleteMany({createdAt: {$lte: monthAgo}});

        } catch (e) {
            console.error(e);
        }
    },
);