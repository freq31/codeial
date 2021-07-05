const db=require('../config/mongoose');
const user=require('../models/user');
module.exports.profile=function(req,res){
    //return res.end('<h1>user profile</h1>');
    user.findById(req.params.id,function(err,user){
        return res.render('users',{
            title:"users profile",
            user_profile:user
        });
    })
    
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/req.user.id');
    }
    return res.render('signin',{
        title:"sign in"
    });
}
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/req.user.id');
    }
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
            req.flash('error',err);
            return ;
        }
        if(!User){
            user.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name
        
            },function(err,User){
                if(err){req.flash('error',err);
                return;}
                //return back to the home page after adding new task
                req.flash('success','Congrats you have been successfully registered');
                return res.redirect('/users/signin');
            });

        }
        else{
            return res.redirect('back');
        }
    });
    
    

}
module.exports.verify_user=function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.endsession=function(req,res){
    req.logout();
    req.flash('success','You have logged Out');
    return res.redirect('/');
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        user.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Your details have been successfully updated');
            return res.redirect('back');
        });
        
    }
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}
module.exports.friends=function(req,res){
    user.find({},function(err,user){
        if(err){
            console.log('error in fetching users from db',err);
            return;
        }
        return res.render('friends',{
            title:"friends-list",
            users:user
        });

    })
}