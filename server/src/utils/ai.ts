import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // stable, fast + cheap
  generationConfig: {
    responseMimeType: "application/json",
  },
});


export const parseAIJSON = (text: string) => {
  try {
    if (!text) throw new Error("Empty AI response");

    // Remove markdown blocks
    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract first valid JSON object
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON found");
    }

    cleaned = cleaned.substring(firstBrace, lastBrace + 1);

    return JSON.parse(cleaned);

  } catch (err) {
    console.error("JSON PARSE ERROR:", err);

    // 🔥 fallback response (VERY IMPORTANT)
    return {
      stage: "question",
      followUpQuestion: "Can you please describe your symptoms more clearly?",
      riskLevel: "low",
      advice: "",
      nextAction: {
        type: "none",
        reason: "Fallback due to parsing error"
      }
    };
  }
};

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const generateWithRetry = async (model: any, prompt: string) => {
  const MAX_RETRIES = 3;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();

    } catch (err: any) {
      if (err.status === 503 && i < MAX_RETRIES - 1) {
        console.warn(`Retry ${i + 1} due to 503...`);
        await sleep(1000 * (i + 1)); // 1s → 2s → 3s
        continue;
      }

      throw err;
    }
  }
};

