import { generateWithRetry, model } from "../../utils/ai";
export const generateAIResponse = async (prompt: string) => {
  try {
    const text = await generateWithRetry(model, prompt);

    return text;

  } catch (error) {
    console.error("AI ERROR:", error);

    // fallback response
    return JSON.stringify({
      stage: "question",
      followUpQuestion: "I'm having trouble right now. Can you describe your symptoms again?",
      riskLevel: "low",
      advice: "",
      nextAction: {
        type: "none",
        reason: "Temporary AI failure"
      }
    });
  }
};