module.exports.posts=function(req,res){
    //return res.end('<h1>user posts</h1>');
    return res.render('posts',{
        title:"users posts"
    });
}