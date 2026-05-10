import mongoose, { Schema, Document } from "mongoose";
import { ChatRole, IChat } from "../types/interface/chat.interface";

const messageSchema = new Schema(
  {
    m_id: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(ChatRole),
      required: true
    },
    content: {
      type: String,
      required: true
    },
    langCode: {
      type: String,
      required: true
    },

    meta: {
      stage: {
        type: String,
        enum: ["greeting", "question", "assessment", "emergency"],
        default: null
      },
      riskLevel: {
        type: String,
        enum: ["low", "medium", "high"],
        default: null
      },
      advice: String,

      nextAction: {
        actionType: {
          type: String,
          enum: ["none", "doctor_booking", "pharmacy", "emergency"],
          default: "none"
        },
        reason: String
      },
      fileName: String,
      medicines: [String]
    }
  },
  { _id: false }
);

const chatSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    chatName: { type: String, required: true },
    messages: [messageSchema]
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", chatSchema);