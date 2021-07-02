const Post=require('../models/post');
const User=require('../models/user');
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
        User.find({},function(err,user){
            if(err){
                console.log('error in fetching users from db',err);
                return;
            }
            return res.render('home',{
                title:"home",
                posts:post,
                users:user
            });

        })
        
        
    });
}