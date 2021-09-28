const express=require('express');

const router=express.Router();
const usersapi=require('../../../controllers/api/v1/users_api');
router.post('/create-session',usersapi.verify_user);
module.exports=router;