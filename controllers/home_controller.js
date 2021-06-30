const Post=require('../models/post');
module.exports.home=function(req,res){
    //return res.end('<h1>express is up for codeial</h1>');
    
    //populate user of each post in post
    Post.find({}).populate('user').exec(function(err,post){
        if(err){
            console.log('error in fetching posts from db');
            return;
        }
        return res.render('home',{
            title:"home",
            posts:post,
            
        });
    });
    
}