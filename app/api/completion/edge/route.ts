import { makeCompletion } from "@/openai";

// the bug only occurs without the edge runtime:
export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  return await makeCompletion(prompt);
}
