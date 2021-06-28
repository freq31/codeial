const db=require('../config/mongoose');
const user=require('../models/user');
module.exports.profile=function(req,res){
    //return res.end('<h1>user profile</h1>');
    return res.render('users',{
        title:"users profile"
    });
}
module.exports.signin=function(req,res){
    return res.render('signin',{
        title:"sign in"
    });
}
module.exports.signup=function(req,res){
    return res.render('signup',{
        title:"sign up"
    });
}
module.exports.createuser=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('/users/signup');
    }
    user.findOne({email:req.body.email},function(err,User){
        if(err){
            console.log('error in finding user in signing up');
            return ;
        }
        if(!User){
            user.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
        
            },function(err,User){
                if(err){console.log('error in creating the task');
                return;}
                //return back to the home page after adding new task
                return res.redirect('/users/signin');
            });

        }
        else{
            return res.redirect('back');
        }
    });
    
    

}
module.exports.verify_user=function(req,res){

}