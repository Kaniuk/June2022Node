const router = require('express').Router();

const controller = require("../controller/user.controller");
const mdlwr = require("../middleware/user.middleware");


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
    mdlwr.getUserDynamically('userId','params','_id'),
    controller.getUserById
);

router.put('/:userId',
    mdlwr.isNewUserValid,
    mdlwr.isEditableUserValid,
    mdlwr.isBodyValidUpdate,
    // mdlwr.userNormalizator,
    mdlwr.getUserDynamically('userId','params','_id'),
    controller.updateUser
);

router.delete('/:userId',
    mdlwr.isUserIdValid,
    // mdlwr.checkIsUserExist,
    controller.deleteUser
);


module.exports = router;
