const Post=require('../models/post');
const Comment=require('../models/comments');

module.exports.createcomment=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log('error in creating comment');
                    return ;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }
    })
}
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            let post_id=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(post_id,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })

        }
        else{
            return res.redirect('back');
        }
    })
}