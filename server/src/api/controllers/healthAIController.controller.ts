import { Request, Response } from "express";
import { buildHealthcarePrompt } from "../../utils/prompt";
import { generateAIResponse } from "../services/aiService.service";
import { parseAIJSON } from "../../utils/ai";

export const healthAIController = async (req: Request, res: Response) => {
    try {
        const { input, mode } = req.body;

        if (!input || typeof input !== "string" || input.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "A valid clinical description or symptoms input is required.",
            });
        }

        const prompt = buildHealthcarePrompt(input,mode);

        const result = await generateAIResponse(prompt);

        const parsed =  parseAIJSON(result);

        return res.json({
            success: true,
            data: parsed,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate health AI response",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}