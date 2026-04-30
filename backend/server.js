import "dotenv/config";
import express from "express";
import cors from "cors";
import personas from "./prompts.js";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { persona, message, history } = req.body;

  try {
    const systemPrompt = personas[persona];

    if (!systemPrompt) {
      return res.status(400).json({ error: "Invalid Persona Selected." });
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history || []).map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.parts?.[0]?.text || msg.content || "",
      })),
      { role: "user", content: message },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 1024,
    });

    res.json({ response: response.choices[0].message.content });

  } catch (error) {
    console.log("Groq API Error:", error.message);
    res.status(500).json({
      error: "Failed to generate a response. Please check API key and try again!",
    });
  }
});

app.get("/", (req, res) => {
  res.send("AI Chatbot is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));