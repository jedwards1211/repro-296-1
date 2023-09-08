import type { NextApiRequest, NextApiResponse } from "next";
import { listOpenAIPackageDir } from "@/listOpenAIPackageDir";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await import("openai").catch(() => {});
  const files = await listOpenAIPackageDir();
  res.status(200).end(files.join("\n") + "\n");
}
