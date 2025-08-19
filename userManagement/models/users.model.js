import mongoose,{Schema} from "mongoose"

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    token:{type:String}
})

const User=mongoose.model("users",userSchema)
export {User};