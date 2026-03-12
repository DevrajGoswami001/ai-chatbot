import express from "express";
import Chat from "../models/Chat.js";
import { generateResponse } from "../../langchain/chatChain.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({
        error: "User message is required"
      });
    }

    // Get previous chats from MongoDB
    const previousChats = await Chat.find()
      .sort({ createdAt: 1 })
      .limit(10);

    // Convert them into message history
    const history = [];

    previousChats.forEach(chat => {
      history.push({
        role: "user",
        content: chat.userMessage
      });

      history.push({
        role: "assistant",
        content: chat.aiResponse
      });
    });

    // Add current user message
    history.push({
      role: "user",
      content: userMessage
    });

    // Generate AI response using history
    const aiResponse = await generateResponse(history);

    // Save new chat
    const chat = new Chat({
      userMessage,
      aiResponse
    });

    await chat.save();

    res.json({
      userMessage,
      aiResponse
    });

  } catch (error) {

    console.error("ERROR:", error);

    res.status(500).json({
      error: "Server error"
    });

  }
});

export default router;