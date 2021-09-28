const db=require('../config/mongoose');
const Post=require('../models/post');
const Comments = require('../models/comments');
const User=require('../models/user');
const Like=require('../models/like');
module.exports.posts=function(req,res){
    //return res.end('<h1>user posts</h1>');
    return res.render('posts',{
        title:"users posts"
    });
}
module.exports.addnewpost=async function(req,res){
    try{
        let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            })
        }
        req.flash('success','Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return;
    }
}
module.exports.destroy=async function(req,res){
    //.id means converting object id to strings
    try{
        let posts=await Post.findById(req.params.id);
        if(posts.user==req.user.id){
            posts.remove();
            await Comments.deleteMany({post:req.params.id});
            await Like.deleteMany({likeable:req.params.id,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:"Post deleted"
                })
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
