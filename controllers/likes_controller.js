const db=require('../config/mongoose');
const Post=require('../models/post');
const Like=require('../models/like');
const Comments = require('../models/comments');
const User=require('../models/user');
module.exports.addnewlike=async function(req,res){
    try{
        //console.log(req.params.id);
        let post=await Post.findById(req.params.id).populate('Like');
        let comment=await Comments.findById(req.params.id).populate('Like');
        let parent,type,like,deleted=false;
        if(post){
            parent=post;
            type="Post";
        }
        else if(comment){
            //console.log("comment");
            parent=comment;
            type="Comments";
        }
        let existinglikes=await Like.findOne({
            user:req.user._id,
            likeable:req.params._id,
            onModel:type
        });
        if(existinglikes){
            //console.log("deleted");
            parent.likes.pull(existinglikes._id);
            parent.save();
            existinglikes.remove();
            deleted=true;
        }
        else{
            //console.log("added");
            like= await Like.create({
                user:req.user._id,
                likeable:req.params._id,
                onModel:type
            });
            parent.likes.push(like);
            parent.save();
            //console.log("added");
        }
        //console.log(req.xhr);
        if(req.xhr){
            //console.log("dynamic liking");
            return res.status(200).json({
                data:{
                    likes:parent.likes,
                    id:req.params.id,
                    deleted:deleted
                },
                message:"Like Added!"
            })
        }
        //console.log("like added");
        req.flash('success','Like Added');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return;
    }
}
/*
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
*/