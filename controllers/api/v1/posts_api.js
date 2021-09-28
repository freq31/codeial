const Post=require('../../../models/post');
const Comments=require('../../../models/comments');
module.exports.index=async function(req,res){
    let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}
module.exports.destroy=async function(req,res){
    //.id means converting object id to strings
    try{
        let posts=await Post.findById(req.params.id);
        if(posts.user==req.user.id){
            posts.remove();
            await Comments.deleteMany({post:req.params.id});
            return res.json(200,{
                message:"Post and associated comments deleted"
            });

        }
        else{
            return res.json(401,{
                message:"You cannot delete this post!"
            })
        }

    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal server error"
        });
    }
    
}