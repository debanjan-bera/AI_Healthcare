import express from 'express';
import { ChatController } from '../controllers/chat.controller.js';
// import { ChatController } from '../controllers/chat.controller.js';
// import { authMiddleware } from '../../middleware/authMiddleware.js';
// import multer from 'multer';

// const upload = multer({ storage: multer.memoryStorage() });

// const chatRouter = express.Router()

// chatRouter.post("/", authMiddleware, ChatController.createChatSessionHandler);

// chatRouter.post("/router", ChatController.routerAgentHandler);
// chatRouter.post("/:session_id", authMiddleware, ChatController.chatHandler);



// // chatRouter.get("/:session_id", authMiddleware, getChatHistoryHandler);

// // chatRouter.get("/user/sessions", authMiddleware, getAllSessionHandler);

// // chatRouter.post("/upload/:session_id", authMiddleware, upload.single('file'), uploadPdfHandler);



const chatRouter = express.Router()


chatRouter.post("/create-session", ChatController.createChatSessionHandler);
chatRouter.post("/:session_id", ChatController.chatHandler);
export default chatRouter