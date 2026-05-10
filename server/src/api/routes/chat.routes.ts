import express from 'express';
import { chatHandler, createSessionHandler, getAllSessionHandler, getChatHistoryHandler, uploadPdfHandler} from '../controllers/chat.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const chatRouter = express.Router()

chatRouter.post("/", authMiddleware, createSessionHandler);

chatRouter.post("/:session_id", authMiddleware, chatHandler);

chatRouter.get("/:session_id", authMiddleware, getChatHistoryHandler);

chatRouter.get("/user/sessions", authMiddleware, getAllSessionHandler);

chatRouter.post("/upload/:session_id", authMiddleware, upload.single('file'), uploadPdfHandler);

export default chatRouter