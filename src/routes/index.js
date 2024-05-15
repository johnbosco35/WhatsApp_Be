import express from "express"
import authRoutes from "./auth.route.js"
import ConversationRouter from "./conversation.route.js"


const router = express.Router()

router.use("/auth", authRoutes)
router.use("/conversation", ConversationRouter)

export default router