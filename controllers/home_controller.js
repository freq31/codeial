const Post=require('../models/post');
module.exports.home=function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,post){
        if(err){
            console.log('error in fetching posts from db',err);
            return;
        }
        console.log(post);
        return res.render('home',{
            title:"home",
            posts:post,
        });
    });
}