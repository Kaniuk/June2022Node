const router = require('express').Router();

const controller = require("../controller/car.controller");


router.get('/', controller.getAllCars);
router.post('/', controller.createCar);

router.get('/:carId', controller.findOne);


module.exports = router;
