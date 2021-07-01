const db=require('../config/mongoose');
const Post=require('../models/post');
const Comment=require('../models/comments');
module.exports.posts=function(req,res){
    //return res.end('<h1>user posts</h1>');
    return res.render('posts',{
        title:"users posts"
    });
}
module.exports.addnewpost=function(req,res){
    
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post');return;}
        console.log(req);
        return res.redirect('back');

    

    });
    
}
