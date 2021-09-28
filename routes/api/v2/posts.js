const express=require('express');

const router=express.Router();
const postsapi=require('../../../controllers/api/v2/posts_api');
router.get('/',postsapi.index);
module.exports=router;