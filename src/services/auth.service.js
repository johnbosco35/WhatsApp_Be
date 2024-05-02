import createHttpError from "http-errors"
import validator from "validator"
import UserModel from "../models/userModel"
import bcrypt from "bcrypt"

export const createUser = async (userData) => {
    const {name,email,picture,status,password} = userData

    //check if fields are empty
    if(!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all fields.")
    }

    //check name Length
    if(!validator.isLength(name,{
        min: 2, 
        max: 16,
    })
){
    throw createHttpError.BadRequest("Please make sure your name is between 2 and 16 characters.")
    }

    //check status length
    if (status && status.length > 64) {
            throw createHttpError.BadRequest("Please make sure your status is less than 64 characters.")
        
    }

    //check if email address is valid
    if(validator.isEmail(email)) {
        throw  createHttpError.BadRequest('Invalid Email Address')
    }

    //check if user already exist
    const checkDb = await UserModel.findOne({email})
    if (checkDb) {
        throw createHttpError.Conflict("This email has been used.")
    }

    //check password length
    if (!validator.isLength(password,{
        min: 6,
        max: 128,
    })
) {
    throw createHttpError.BadRequest("Please make sure your password is between 6 and 128 character.s")
}

//hash password---> to be done in the user model

//adding user to database
const user = await new UserModel({
    name,
    email,
    status: status || DEFAULT_STATUS,
    password: picture || DEFAULT_PICTURE,
}).save()
return user
}

export const signUser = async (email, password) => {
    const user = await UserModel.findOne({email: email.tolowerCase()}).lean()

    //check if user exit
    if (!user) throw createHttpError.NotFound('No such user found');

    //compare passwords
    let passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) throw createHttpError.NotFound('Wrong Password');

    return user;
}