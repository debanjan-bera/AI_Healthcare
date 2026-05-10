import { Request, Response } from "express";
import { saveSession } from "../services/chat.service";
import chatModel from "../../model/chat.model";
import { ChatRole, IMessage } from "../../types/interface/chat.interface";
import { AuthRequest } from "../../middleware/authMiddleware";
import { buildHealthcarePrompt, buildPdfPrompt } from "../../utils/prompt";
import { generateAIResponse } from "../services/aiService.service";
import { parseAIJSON } from "../../utils/ai";
import { generateId } from "../../utils/token";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

export const createSessionHandler = async (req: AuthRequest, res: Response) => {
  const { message } = req.body;
  const userId: string | undefined = req.user?.id;
  try {
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
      sessionId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
}

export const chatHandler = async (req: AuthRequest, res: Response) => {

  const sessionId: string | string[] = req.params.session_id;
  const userId: string | undefined = req.user?.id
  const { message, message_id } = req.body;

  if (!userId || !message || !message_id) {
    return res.status(400).json({
      success: false,

      message: `${userId} and ${message} ${message_id} are required`,
    });
  }

  const chat = await chatModel.findOne({
    sessionId,
    userId
  });

  if (!chat) {
    return res.status(400).json({
      successful: false,
      message: "Invalid session or unauthorized",
    });
  }
  // if(langCode !== "en"){

  chat?.messages.push({ m_id: message_id, role: "user" as ChatRole, content: message, langCode: 'en' });

  const history = await chatModel.findOne({ sessionId }).sort({ createdAt: 1 });

  const formatted: IMessage[] | undefined = history?.messages.map(m => ({
    role: m.role,
    content: m.content,
  }));

  const historyText: string =
    formatted
      ?.slice(-6)
      .filter(m => m?.role && m?.content)
      .map(m => {
        const role =
          m.role === "user"
            ? "Patient"
            : m.role === "assistant"
              ? "Assistant"
              : "System";

        return `${role}: ${m.content.trim()}`;
      })
      .join("\n") || "No previous messages";
  const prompt = buildHealthcarePrompt(message, historyText);

  const result = await generateAIResponse(prompt);

  const parsed = parseAIJSON(result);

  const m_id = generateId();

  chat?.messages.push({
    m_id,
    role: "assistant" as ChatRole,
    content: parsed.followUpQuestion || parsed.advice || "No response",
    langCode: "en",
    meta: {
      stage: parsed.stage,
      riskLevel: parsed.riskLevel,
      advice: parsed.advice,
      nextAction: parsed.nextAction
    }
  });

  await chat?.save();

  return res.status(200).json({
    successful: true,
    m_id,
    reply: parsed.followUpQuestion || parsed.advice || "No response",
    meta: parsed
  })
}


export const getChatHistoryHandler = async (req: AuthRequest, res: Response) => {
  const sessionId: string | string[] = req.params.session_id;
  const userId: string | undefined = req.user?.id

  if (!userId || !sessionId) {
    return res.status(401).json({
      successful: false,
      message: "Unauthorized",
    })
  }

  const chat = await chatModel.findOne({
    sessionId,
    userId
  }).sort({ createdAt: 1 });


  return res.status(200).json({
    successful: true,
    history: chat?.messages || []
  });


}

export const getAllSessionHandler = async (req: AuthRequest, res: Response) => {
  const userId: string | undefined = req.user?.id

  if (!userId) {
    return res.status(401).json({
      successful: false,
      message: "Unauthorized",
    })
  }
  const sessions = await chatModel.find(
    { userId },
    { sessionId: 1, chatName: 1, _id: 0 }
  ).sort({ updatedAt: -1 });

  return res.status(200).json({
    successful: true,
    sessions,
  });
}

export const uploadPdfHandler = async (req: AuthRequest, res: Response) => {
  const sessionId: string | string[] = req.params.session_id;
  const userId: string | undefined = req.user?.id;
  const file = (req as any).file as Express.Multer.File;

  if (!userId || !file || !sessionId) {
    return res.status(400).json({
      success: false,
      message: "User ID, file, and Session ID are required",
    });
  }

  try {
    const chat = await chatModel.findOne({ sessionId, userId });
    if (!chat) {
      return res.status(400).json({
        successful: false,
        message: "Invalid session or unauthorized",
      });
    }

    // Parse PDF
    const dataBuffer = file.buffer;
    
    let pdfText = "";
    try {
        // Handle modern pdf-parse (Mehmet Kozan version) which uses a class
        const { PDFParse } = pdf;
        if (PDFParse) {
            const parser = new PDFParse({ data: dataBuffer });
            const result = await parser.getText();
            pdfText = result.text;
        } else {
            // Fallback for traditional pdf-parse
            const pdfParser = typeof pdf === 'function' ? pdf : (pdf.default || pdf);
            if (typeof pdfParser === 'function') {
                const pdfData = await pdfParser(dataBuffer);
                pdfText = pdfData.text;
            } else {
                throw new Error("PDF parser not found in module");
            }
        }
    } catch (err) {
        console.error("PDF Parsing Inner Error:", err);
        throw new Error("Failed to parse PDF content");
    }

    // Add PDF upload message to chat
    const user_m_id = generateId();
    chat.messages.push({
      m_id: user_m_id,
      role: "user" as ChatRole,
      content: `Uploaded a lab report: ${file.originalname}`,
      langCode: 'en'
    });

    const prompt = buildPdfPrompt(pdfText);
    const result = await generateAIResponse(prompt);
    const parsed = parseAIJSON(result);

    const ai_m_id = generateId();
    chat.messages.push({
      m_id: ai_m_id,
      role: "assistant" as ChatRole,
      content: parsed.advice || "I've analyzed your report. Here is the summary.",
      langCode: "en",
      meta: {
        stage: parsed.stage,
        riskLevel: parsed.riskLevel,
        advice: parsed.advice,
        nextAction: parsed.nextAction,
        fileName: file.originalname,
        medicines: parsed.medicines || []
      }
    });

    await chat.save();

    return res.status(200).json({
      successful: true,
      m_id: ai_m_id,
      reply: parsed.advice || "I've analyzed your report. Here is the summary.",
      meta: parsed
    });

  } catch (error) {
    console.error("PDF Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process PDF",
    });
  }
}