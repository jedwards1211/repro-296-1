import { makeCompletion } from "@/openai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  return await makeCompletion(prompt);
}
