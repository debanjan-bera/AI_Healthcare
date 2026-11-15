import mongoose from "mongoose";

export enum ChatRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export type Stage =
  | "greeting"
  | "question"
  | "assessment"
  | "emergency";

export type RiskLevel = "low" | "medium" | "high";

export type NextActionType =
  | "none"
  | "doctor_booking"
  | "pharmacy"
  | "emergency";

// 🔥 Meta info for AI decisions
export interface IMessageMeta {
  stage?: Stage | null;
  risk?:{
    level: RiskLevel;
    reason?: string;
  }
  questions?: string[] | null;
  advice?: string;

  nextAction?: {
    type: NextActionType;
    reason?: string;
  };
  fileName?: string | null;
  medicines?: string[];
}

// 🔥 Single message
export interface IMessage {
  m_id?: string,
  role: ChatRole;
  content: string;
  langCode?: string;
  meta?: IMessageMeta;
}
export interface IChat {
  _id?: string;
   userId: mongoose.Types.ObjectId | string;
  sessionId: string;
  title: string;
  totalMessages: number;
  isPinned: boolean;
  isArchived: boolean;
  messages: IMessage[];
  createdAt?: string;
  updatedAt?: string;
}