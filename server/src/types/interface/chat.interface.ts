export enum ChatRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system"
}

export type Stage =
  | "greeting"
  | "question"
  | "assessment"
  | "complete"
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
  riskLevel?: RiskLevel | null;
  advice?: string;

  nextAction?: {
    actionType: NextActionType;
    reason?: string;
  };
  fileName?: string;
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

// 🔥 Chat document
export interface IChat {
  _id?: string;
  userId: string;
  sessionId: string;
  chatName: string;
  messages: IMessage[];
  createdAt?: string;
  updatedAt?: string;
}