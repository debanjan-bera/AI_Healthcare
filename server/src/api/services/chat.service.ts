import chatModel from "../../model/chat.model.js"
import userModel from "../../model/user.model.js"

export const saveSession = async (
  userId: string,
  uid: string,
  message?: string
) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Safe chat name
    const chatName = message?.trim()
      ? message.trim().slice(0, 40)
      : "New Chat";

    // 3. Create chat session
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



// async function findHospitals(lat: number, lng: number) {
//   const response = await fetch(
//     `https://api.example.com/hospitals?lat=${lat}&lng=${lng}`
//   );

//   return response.json();
// }
// async function searchMedicine(name: string) {
//   const response = await db.medicines.findOne({
//     name
//   });

//   return response;
// }
// async function symptomChecker(symptoms: string[]) {
//   return aiModel.invoke(
//     `Analyze symptoms: ${symptoms.join(",")}`
//   );
// }