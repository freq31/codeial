
const express=require('express');

const router=express.Router();
const passport=require('passport');
//const homeController=require('../controllers/home_controller');
const userController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);

router.post('/create-user',userController.createuser);
//use passport as a middleware to authenticate:
router.post('/verify-user',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.verify_user);
router.get('/signout',userController.endsession);
router.get('/friends',passport.checkAuthentication,userController.friends);
//google-login
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.verify_user);
module.exports=router;