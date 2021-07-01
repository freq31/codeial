const express=require('express');
const router=express.Router();
const passport=require('passport');
//const homeController=require('../controllers/home_controller');
const commentsController=require('../controllers/comments_controller');
router.post('/add-comments',passport.checkAuthentication,commentsController.createcomment);
module.exports=router;