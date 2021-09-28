const express=require('express');
const router=express.Router();
const passport=require('passport');
const likesController=require('../controllers/likes_controller');
router.post('/add-likes/:id',passport.checkAuthentication,likesController.addnewlike);
//router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);
module.exports=router;