const express=require('express');
const router=express.Router();
const passport=require('passport');
//const homeController=require('../controllers/home_controller');
const postController=require('../controllers/posts_controller');
router.get('/',postController.posts);
router.post('/add-post',passport.checkAuthentication,postController.addnewpost);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports=router;