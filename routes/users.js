
const express=require('express');

const router=express.Router();
const passport=require('passport');
//const homeController=require('../controllers/home_controller');
const userController=require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);

router.post('/create-user',userController.createuser);
//use passport as a middleware to authenticate:
router.post('/verify-user',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.verify_user);
router.get('/signout',userController.endsession);
module.exports=router;