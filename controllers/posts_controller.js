const db=require('../config/mongoose');
const Post=require('../models/post');
const Comments = require('../models/comments');
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
module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting object id to strings
        if(post.user==req.user.id){
            post.remove();
            Comments.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            })

        }
        else{
            return res.redirect('back');

        }
    })
}
