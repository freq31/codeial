module.exports.profile=function(req,res){
    //return res.end('<h1>user profile</h1>');
    return res.render('users',{
        title:"users profile"
    });
}