const { mongoose } = require("mongoose");


const todoSchema = mongoose.Schema({
    userId:{
    type:mongoose.Types.ObjectId,
    ref:"user",
    required:true
    },
    task:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    priority:{
        type:Number,
        required:true
    }
})
module.exports= mongoose.model("todo", todoSchema)