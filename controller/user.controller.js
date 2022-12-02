const {userService, oauthService} = require("../service");


module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);

        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {

            const hashPassword = await oauthService.hashPassword(req.body.password);

            await userService.create({...req.body, password: hashPassword});

            res.status(201).json('Created');

        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user, users, body} = req;
            const newUserInfo = body;
            const userId = req.params.userId;
            const updatedUser = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await userService.findByIdWithCars(req.user._id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await userService.deleteOne(req.params.userId);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },


};