const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const userForReminded = require('../dataBase/OAuth');
const userForEmail = require('../dataBase/User');
const emailService = require("../service/email.service");
const {REMINDER} = require("../config/email-action.enum");

dayjs.extend(utc);
module.exports = new CronJob(
    '@weekly',
    async function () {
        try {
            const weekAgo = dayjs().utc().subtract(1, 'week');
            const usersTokens = await userForReminded.find({updatedAt: {$lte: weekAgo}});
            const usersIdsForReminding = usersTokens.map(({_user_id}) => _user_id);

            console.log(usersIdsForReminding);
            const users = await userForEmail.find({_id: {$in: usersIdsForReminding}});
            // const userEmails = users.map(({email}) => email);
            for (const user of users) {
                if (user.email !== 'harchenko.lyuda@gmail.com') continue;

                await emailService.sendEmail(user.email, REMINDER, {userName: user.name});
            }


        } catch (e) {
            console.error(e);
        }
    },
);