import mongoose, { Collection } from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide your name"],
    },
    email:{
        type: String,
        required:[true,"Please enter your email address"] , 
        lowercase: true,
        validate: [validator.isEmail,'Please use a valid Email Address']
    },
    picture:{
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
    },
    status:{
    type:String,
    default: "Hey there ! I am using whatsapp",
    },
    password:{
        type:String,
        require:[true, "Please provide your password"],
        minLength:[6,'Password should be at least 6 characters'],
        maxLength:[128,'Password should be less than 128 characters'],
    }
},{
    Collection:"users",
    timestamps:true
})

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);

export default UserModel