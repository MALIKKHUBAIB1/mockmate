import { GEMINI_API_KEY } from "../const";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = GEMINI_API_KEY; // Fallback API key
const genAI = new GoogleGenerativeAI(apiKey);

async function createChatSession() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Define valid safetySettings
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_HIGH_AND_ABOVE,
      },
    ];

    // Start the chat session with the provided settings
    const chatSession = await model.startChat({
      generationConfig,
      safetySettings, // Valid categories
    });

    return chatSession;
  } catch (error) {
    console.error("Error starting chat session:", error);
    throw error; // Handle the error appropriately
  }
}

// Export the chat session asynchronously
module.exports = createChatSession;
