import express, { Request, Response } from 'express';
import multer from 'multer';
// import { healthCareAgentServices } from '../services/ai.service.js';

const AIAgentRouter = express.Router();


// AIAgentRouter.post('/chat', authMiddleware, AIAgenticController.chatHandler);
AIAgentRouter.post('/chat', async(req:Request, res:Response)=>{
  try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        // const response = await healthCareAgentServices(message)

        // const lastMessage = response.messages[response.messages.length - 1];

        return res.json({
            success: true,
            // reply: lastMessage.content,
            // state: response,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
export default AIAgentRouter;