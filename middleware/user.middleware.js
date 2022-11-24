const ApiError = require('../error/ApiError');
const {userService} = require("../service");
const {userNormalizator} = require("../helper");

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const users = await userService.findByParams();
            const user = await userService.findOneByParams({_id: userId});

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.users = users;
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;
            if (!name || name.length < 3 || typeof name !== 'string') {
                throw new ApiError('Wrong name', 400);
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age', 400);
            }
            if (!email || !email.includes('@')) {
                throw new ApiError('Wrong email', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isBodyValidUpdate: (req, res, next) => {
        try {
            const {name, age, email} = req.body;
            if (name && (name.length < 3 || typeof name !== 'string')) {
                throw new ApiError('Wrong name', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Wrong age', 400);
            }
            if (email && !email.includes('@')) {
                throw new ApiError('Wrong email', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    userNormalizator: (req, res, next) => {
        try {
            let {name, email} = req.body;

            if (name) req.body.name = userNormalizator.name(name);

            if (email) req.body.email = email.toLowerCase();

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {email} = req.body;

            const users = await userService.findByParams();
            const user = await userService.findOneByParams({email});

            if (user) {
                throw new ApiError('User with this email is already exists', 409);
            }

            req.users = users;
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

};
