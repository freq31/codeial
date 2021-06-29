
const express=require('express');

const router=express.Router();
//const homeController=require('../controllers/home_controller');
const userController=require('../controllers/users_controller');
router.get('/profile',userController.profile);
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.post('/create-user',userController.createuser);
router.post('/verify-user',userController.verify_user);
router.post('/signout',userController.signout);
module.exports=router;