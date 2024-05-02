import mongoose, { Collection } from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const conversationSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, "Conversations name is required"],
        trim: true,
    },
    picture: {
        type: String,
        require: true
    },
    isGroup: {
        type: Boolean,
        default: false,
        require: true
    },
    users: [
        {
            type: ObjectId,
            ref: "UserModel"
        },
    ],
    latestMessage: {
        type: ObjectId,
        ref: "MessageModel",
    },
    admin: {
        type: ObjectId,
        ref: "UserModel"
    }
},{
    Collection: "conversations",
    timestamps: true,
})

const ConversationModel = mongoose.models.ConversationModel || mongoose.model("ConversationModel",conversationSchema)

export default ConversationModel