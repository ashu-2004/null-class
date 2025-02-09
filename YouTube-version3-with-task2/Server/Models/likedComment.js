import mongoose from "mongoose"
const likedCommentschema=mongoose.Schema({
    commentid:{type:String,require:true},
    viewer:{type:String,require:true},
    likedon:{type:Date,default:Date.now()}
})
export default mongoose.model("Likedcomment",likedCommentschema)