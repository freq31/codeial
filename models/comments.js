const mongoose=require('mongoose');

const commentsSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'

        }
    ]
},{
    timestamps:true
});

const Comments=mongoose.model('Comments',commentsSchema);
module.exports=Comments;