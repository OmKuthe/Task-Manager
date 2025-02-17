import mongoose from "mongoose";
import { Users } from "./userModel.js";

const taskModel = mongoose.Schema(
    {
        user:{type:mongoose.Schema.ObjectId,ref:Users,required:true},
        title:{type:String,required:true},
        desc:{type:String},
        status:{type:String,enum:["pending","completed"],default:"pending"},
        category:{type:String,enum:["personal","work"],default:"personal"},
        duedate:{type:Date},
        createdAt:{type:Date,default:Date.now}
    }
)

export const Tasks = mongoose.model('Tasks',taskModel)