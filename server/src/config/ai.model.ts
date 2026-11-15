import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import dotenv from 'dotenv';
dotenv.config();


export const llm1 = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY as string,
  model: "gemini-2.5-flash",
  temperature: 0.3,
});


export const llm = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY as string,
  model: "mistral-small-latest",
  temperature: 0.3,
});