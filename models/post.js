const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    //include the array of ids of all comments in the post schema
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comments'

        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'

        }
    ]

},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;