import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";

type ResponseData =
  | {
      files: string[];
    }
  | { error: string };

// The bug only appears for me when edge is not enabled.
// export const runtime = "edge";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const packageDir = await findPackageDir();
  if (!packageDir) {
    res.status(404).json({ error: "failed to find package dir" });
    return;
  }
  const files: string[] = [];
  for await (const file of listFiles(packageDir))
    files.push(path.relative(packageDir, file));
  res.status(200).json({ files });
}

async function* listFiles(dir: string): AsyncIterable<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    yield fullPath;
    if (entry.isDirectory()) yield* listFiles(fullPath);
  }
}

async function findPackageDir() {
  let dir = __dirname;
  while (dir && dir !== "/") {
    if (
      await fs.stat(path.join(dir, "node_modules", "openai")).then(
        (stat) => stat.isDirectory(),
        () => false
      )
    ) {
      return path.join(dir, "node_modules", "openai");
    }
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
}
