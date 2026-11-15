import mongoose, { Schema, Document } from "mongoose";
import { ChatRole, IChat } from "../types/interface/chat.interface.js";

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

    meta: {
      stage: {
        type: String,
        enum: ["greeting", "question", "assessment", "emergency"],
        default: null
      },
      questions: {
        type: [String],
        default: []
      },
      risk: {
        level: {
          type: String,
          enum: ["low", "medium", "high"],
          default: null
        },
        reason: String
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
      fileName: {
        type: String,
        default: null
      },
      medicines: [String]
    }
  },
  { _id: false }
);

const chatSchema: Schema = new Schema<IChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String, required: true, default: "New Chat",
      maxlength: 100,
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
    messages: [messageSchema]
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", chatSchema);