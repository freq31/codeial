const express=require('express');

const router=express.Router();
//const homeController=require('../controllers/home_controller');
const postController=require('../controllers/posts_controller');
router.get('/',postController.posts);
module.exports=router;