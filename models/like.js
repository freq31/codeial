const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
        
    },
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    //this field is used to defining the type of the liked object since this is a dynamic reference
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comments']
    }
},{
    timestamps:true
})
const Like=mongoose.model('Like',likeSchema);
module.exports=Like;