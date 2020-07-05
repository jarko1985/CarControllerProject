const express = require('express');
const carController = require('./../controllers/carController');
const authController = require('./../controllers/authController');


const carRouter = express.Router();



carRouter
.route('/')
.get(authController.protect,carController.getAllCars)
.post(carController.addNewCar);



carRouter
.route('/:id')
.get(carController.getCarById)
.patch(carController.updateCarById)
.delete(authController.protect,authController.restrictTo('admin'),carController.deleteCarById);


module.exports = carRouter;