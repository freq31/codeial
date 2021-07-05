const Post=require('../models/post');
const Comment=require('../models/comments');

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