import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

type ResponseData = {
  message: string;
};

export const runtime = "edge";

export default async function handler(req: NextApiRequest) {
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
  console.log(result);
  return NextResponse.json({ message: JSON.stringify(result) });
}
