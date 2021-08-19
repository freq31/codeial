const Post=require('../models/post');
const Comment=require('../models/comments');
const User=require('../models/user');
module.exports.createcomment=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
        if(post){
            let comment =await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
            post.save();
            if(req.xhr){
                comment = await comment.populate('user', 'name').execPopulate();
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:"Comment Created!"
                })
            }
            req.flash('success','Comment Published');
            return res.redirect('/');
        }

    }catch(err){
        req.flash('error',err);
        return;
    }
    
}
module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let post_id=comment.post;
            comment.remove();
            let post=await Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"Comment deleted"
                });
            }
            req.flash('success','Comment deleted');
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
    
}