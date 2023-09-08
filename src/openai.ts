import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// the bug only occurs without the edge runtime:
export const runtime = "edge";

export async function makeCompletion(prompt: any) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt: `Create three slogans for a business with unique features.

Business: Bookstore with cats
Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
Business: Gym with rock climbing
Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
Business: ${prompt}
Slogans:`,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
