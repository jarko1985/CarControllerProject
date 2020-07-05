const express = require('express');
const viewsController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const viewRouter = express.Router();



viewRouter.use(authController.isLoggedIn);
 
viewRouter.get('/',viewsController.getOverView);

    
viewRouter.get('/car/:slug',viewsController.getCarView);

viewRouter.post('/car/:slug',viewsController.getSms);



viewRouter.get('/login',viewsController.getLoginForm);

module.exports = viewRouter;