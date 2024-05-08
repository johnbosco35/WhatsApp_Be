import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js"

export const doesConversationExist = async (sender_id,receiver_id,isGroup) =>{
    if (isGroup === false) {
        let convos = await ConversationModel.find({
            isGroup: false,
            $and: [
                {users: {$elemMatch: {$eq: sender_id}}},
                {users: {$elemMatch: {$eq: receiver_id_id}}},
            ]
        })
        .populate("users", "-password")
        .populate("latestMessage");

        if (!convos) throw createHttpError.BadRequest("Oops...Something went wrong !");

        //populate message model
        convos = await UserModel.populate(convos, {
            path:"latestMessage.sender",
            select: "name email picture status",
        });
        return convos[0];
    } else {
        //it's a group chat
        let convo = await ConversationModel.findById(isGroup).populate("users admin", "-password").populate("latestMessage");

        if (!convo) throw createHttpError.BadRequest("Oops...Something went wrong !")
        //populate message model
    convo = await UserModel.populate(convo, {
        path:"latestMessage.sender",
        select: "name email picture status",
    })

    return convo
    }
}