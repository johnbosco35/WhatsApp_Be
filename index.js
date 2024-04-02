import mongoose from "mongoose"
import app from "./app.js"
import { Server } from "socket.io"
import logger from "./src/configs/logger.config.js"
import SocketServer from "./src/Socket.js"


//env variables
const {MONGO_URL} = process.env
const PORT = process.env.PORT || 5000

//exit on mongodb error
mongoose.connection.on("error",(err)=>{
   logger.error(`Mongodb connection error : ${err}`);
   process.exit(1)
})

//mongodb debug mode
if  (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true)
}

//mongodb connection 
mongoose
.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{
    logger.info("connect to DataBase.")
})
let server
 server =app.listen(PORT, ()=>{
    logger.info(`Server is running on port ${PORT}`)
})

//socket io
const io = new  Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_ENPOINT
    }
})
io.on("connection", (socket) =>{
    logger.info("socket io connected successfully.");
    SocketServer(socket,io)
})

//handle server errors
const exitHandler = () =>{
    if (server) {
        logger.info("server closed.");
        process.exit(1);
    }else {
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) =>{
    logger.error(error);
    exitHandler()
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
    if (server) {
        logger.info("server closed.");
        process.exit(1)
    }
})