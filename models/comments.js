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
    }
},{
    timestamps:true
});

const Comments=mongoose.model('Comments',commentsSchema);
module.exports=Comments;