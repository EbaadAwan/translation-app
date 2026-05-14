import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const text = "Hello, how are you?";
const language = "Spanish";

const messages = [
  {
    role: "system",
    content: "You are a helpful translator. Translate clearly and simply. Only return the translation. Make sure the translation come back in English form. For example, if a word is going to be translated into chinese, return the result written in English."
  },
  {
    role: "user",
    content: `Translate this into ${language}: ${text}`
  }
];

const completion = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  messages
});

console.log(completion.choices[0].message.content);
