const {userService} = require("../service");


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
            const userInfo = req.body;
            await userService.create(userInfo);

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
          const updatedUser =  await userService.updateOne(userId, newUserInfo);

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.user);
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