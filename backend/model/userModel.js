import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
    {
        username :{ type:String,required:true,unique:true },
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        date:{type:Date,default:Date.now}
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const Users= mongoose.model('Users',userSchema);