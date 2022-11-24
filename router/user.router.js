const router = require('express').Router();

const controller = require("../controller/user.controller");
const mdlwr = require("../middleware/user.middleware");


router.get('/',
    controller.getAllUsers
);

router.post('/',
    mdlwr.checkIsEmailExist,
    mdlwr.userNormalizator,
    mdlwr.isBodyValidCreate,
    controller.createUser
);


router.get('/:userId',
    mdlwr.checkIsUserExist,
    controller.getUserById
);

router.put('/:userId',
    mdlwr.isBodyValidUpdate,
    mdlwr.userNormalizator,
    mdlwr.checkIsUserExist,
    controller.updateUser
);

router.delete('/:userId',
    mdlwr.checkIsUserExist,
    controller.deleteUser
);


module.exports = router;
