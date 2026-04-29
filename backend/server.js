import "dotenv/config";
import express from "express";
import cors from "cors";
import personas from "./prompts.js";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { persona, message, history } = req.body;

  try {
    const systemPrompt = personas[persona];

    if (!systemPrompt) {
      return res.status(400).json({ error: "Invalid Persona Selected." });
    }

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message: message });

    res.json({ response: result.text });
  } catch (error) {
    console.log("Gemini API Error:", error.message);
    res
      .status(500)
      .json({
        error:
          "Failed to generate a response. Please check API key and try again!",
      });
  }
});

app.get("/", (req, res) => {
  res.send("AI Chatbot is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
