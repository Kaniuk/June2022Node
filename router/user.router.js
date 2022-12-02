const router = require('express').Router();

const controller = require("../controller/user.controller");
const mdlwr = require("../middleware/user.middleware");
const authMdlwr = require("../middleware/auth.middleware");


router.get('/',
    controller.getAllUsers
);

router.post('/',
    mdlwr.isNewUserValid,
    mdlwr.checkIsEmailExist,
    // mdlwr.userNormalizator,
    mdlwr.isBodyValidCreate,
    controller.createUser
);


router.get('/:userId',
    mdlwr.isUserIdValid,
    authMdlwr.checkAccessToken,
    mdlwr.getUserDynamically('userId', 'params', '_id'),
    controller.getUserById
);

router.put('/:userId',
    mdlwr.isNewUserValid,
    authMdlwr.checkAccessToken,
    mdlwr.isEditableUserValid,
    mdlwr.isBodyValidUpdate,
    mdlwr.getUserDynamically('userId', 'params', '_id'),
    controller.updateUser
);

router.delete('/:userId',
    mdlwr.isUserIdValid,
    authMdlwr.checkAccessToken,
    controller.deleteUser
);


module.exports = router;
