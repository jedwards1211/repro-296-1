import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
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
  res.status(200).json({ message: JSON.stringify(result) });
}
