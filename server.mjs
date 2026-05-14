import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(".")); // serves your current project files (index.html, index.js, etc.)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/translate", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({ error: "Missing text or language" });
    }

    const messages = [
      {
        role: "system",
        content:
          "You are a helpful translator. Translate clearly and simply. Only return the translation. Make sure the translation come back in English form. For example, if a word is going to be translated into chinese, return the result written in English."
      },
      {
        role: "user",
        content: `Translate this into ${language}:\n${text}`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages
    });

    res.json({ translation: completion.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

app.listen(3000, () => console.log("Open http://localhost:3000"));
