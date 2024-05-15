import express from "express"
import trimRequest from "trim-request"
import authMiddleware from "../middlewares/authMiddelware.js"
import {creatGroup, createConversations, getConvesations} from "../controllers/conversation.controller.js"

const router = express.Router()

router.route("/").post(trimRequest.all,authMiddleware,createConversations)
router.route("/").get(trimRequest.all,authMiddleware,getConvesations)
router.route("/group").post(trimRequest.all,authMiddleware,creatGroup)

export default router