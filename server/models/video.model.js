const mongoose=require('mongoose');

var videoSchema=new mongoose.Schema({
    title:{type:String,required:true},
    url:{type:String,required:true,unique:true},
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now()},
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array },
    description:{type:String, required:true},
   // category:{type:String,enum: ['', '', '']}, 
    comments: [{
        comment: { type: String},
        commentator: { type: String }
      }],
    view:[{
        numOfView:{type:Number,default: 0},
        userId:{type:String}
    }]
 
});

 mongoose.model('Video', videoSchema);