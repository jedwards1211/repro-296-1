import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const client = new OpenAI();
  const result = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "hi",
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return NextResponse.json({ message: JSON.stringify(result) });
}
