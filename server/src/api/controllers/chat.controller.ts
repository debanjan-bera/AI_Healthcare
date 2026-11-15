import { Request, Response } from "express";
import { saveSession } from "../services/chat.service.js";
import { healthCareAgentServices } from "../services/ai.service.js";





export class ChatController {
    static createChatSessionHandler = async (req: Request, res: Response) => {
        try {
            const { message } = req.body;
            const userId: string | undefined = "1001";
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            const sessionId = crypto.randomUUID();
            await saveSession(userId, sessionId, message);

            return res.status(200).json({
                success: true,
                message: "Chat session created successfully",
                sessionId,
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create session",
            });
        }


    }
    static chatHandler = async (req: Request, res: Response) => {
        try {
            const { message } = req.body;
            const threadId = "1028437";
            const agentResponse = await healthCareAgentServices(message, threadId);
            res.json({ success: true, message: agentResponse });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong!' });
        }
    }
}
