import createHttpError from "http-errors"
import logger from "../configs/logger.config.js"

export const createConversations = async(req,res,next) =>{
    console.log(req.body)
try {
    const sender_id = req.user.userId
    const {receiver_id, isGroup} = req.body
    if(isGroup == false){
        //check if receiver_id is provided
        if(!receiver_id){
            logger.error("please provide the user id you wanna start a conversation with!")
            throw createHttpError.BadGateway("Oops...Something went wrong !")
        }
        //check if chat exists
        const existed_conversation = await doesConversationExist(
            sender_id,
            receiver_id,
            false
        )
        if(existed_conversation){
            res.json(existed_conversation)
        }else{
            // let receiver_user = await findUser(receiver_id);
            let convoData = {
                name:"conversation name",
                picture:"conversation picture",
                isGroup: false,
                users: [sender_id,receiver_id],
            };
            const newConvo = await createConversation(convoData);
            const populatedConvo = await populateConversation(
                newConvo._id,
                "users",
                "-password"
            );
            res.status(200).json(populatedConvo)
        }
    } else {
        console.log("hnaaaaaaaaaaa")
        //it's a group chat
        //check if group chat exists
        const existed_group_conversation = await doesConversationExist(
            "",
            "",
            isGroup
        );
        res.status(200).json(existed_group_conversation);
    }
} catch (error) {
    next(error)
}
}

export const getConvesations = async (req,res,next) =>{
    try {
        const user_id = req.user.userId;
        const conversations = await getConversations(user_id);
        res.status(200).json(conversations)
    } catch (error) {
        next(error)
    }
}

export const creatGroup = async (req,res,next) =>{
    const {name, users} = req.body
    //add current user to users
    users.push(req.user.userId)
    if(!name || !users) {
        throw createHttpError.BadRequest("Please fill all fields.")
    }
    if (users.length < 2) {
        throw createHttpError.BadRequest(
            "Please add at least 2 users to the group chat."
        );
    }
    let convoData = {
        name,
        users,
        isGroup: true,
        admin: req.user.userId,
        picture: process.env.DEFAULT_GROUP_PICTURE,
    };
    try {
        const newConvo = await createConversation(convoData)
        const populateConvo = await populateConversation(
            newConvo._id,
            "users admin",
            "-password"
        );
        res.status(200).json(populateConvo)
    } catch (error) {
        next(error)
    }
}