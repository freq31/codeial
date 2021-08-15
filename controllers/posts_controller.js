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
        if(err){req.flash('error',err);return;}
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            })
        }
        req.flash('success','Post Published');
        return res.redirect('back');

    

    });
    
}
module.exports.destroy=async function(req,res){
    //.id means converting object id to strings
    try{
        let posts=await Post.findById(req.params.id);
        if(posts.user==req.user.id){
            posts.remove();
            await Comments.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                });
            }
            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');

        }
        else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');

        }

    }catch(err){
        req.flash('error',err);
        return;
    }
    
}
