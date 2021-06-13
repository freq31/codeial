const express=require('express');

const router=express.Router();
//const homeController=require('../controllers/home_controller');
const userController=require('../controllers/users_controller');
router.get('/profile',userController.profile);
module.exports=router;