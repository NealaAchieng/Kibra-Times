const mongoose=require("mongoose")
const postSchema=new mongoose .Schema({
    postImg:{type:String,required:true},
    postTitle:{type:String,required:true},
    postSummary:{type:String,required:true},
    postBody:{type:String,required:true},
    postCategory:{type:String,required:true},
    postTags:{type:Array,required:true},
    postSection:{type:String,required:true},
    postAuthor:{type:String,required:true},
    postDate:{type:String,required:true,default:Date.now},
    

})
module.exports= mongoose.model("Post",postSchema)