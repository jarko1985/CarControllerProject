const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');



const userRouter = express.Router();


userRouter.route('/signup').post(authController.signUp);
userRouter.route('/login').post(authController.logIn);
userRouter.route('/forgotPassword').post(authController.forgotPassword);
userRouter.route('/resetPassword/:token').patch(authController.resetPassword);
userRouter.route('/updatePassword').patch(authController.updatePassword);



userRouter
.route('/')
.get(userController.getAllUsers)
.post(userController.addNewUser);



userRouter
.route('/:id')
.get(userController.getUserById)
.patch(userController.updateUserrById)
.delete(userController.deleteUserById);


module.exports = userRouter;