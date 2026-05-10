import chatModel from "../../model/chat.model"
import userModel from "../../model/user.model"

export const saveSession = async (
  userId: string,
  uid: string,
  message?: string
) => {
  try {
    // 1. Validate user
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Safe chat name
    const chatName = message?.trim()
      ? message.trim().slice(0, 40)
      : "New Chat";

    // 3. Create session
    const chat = new chatModel({
      userId,
      sessionId: uid,
      chatName,
      messages: [],
    });

await chat.save();

  } catch (error) {
    console.error("Error saving session:", error);
    throw error;
  }
};