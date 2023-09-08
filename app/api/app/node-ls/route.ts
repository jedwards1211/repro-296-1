import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";

type ResponseData =
  | {
      files: string[];
    }
  | { error: string };

// The bug only appears for me when edge is not enabled.
// export const runtime = "edge";

export async function GET() {
  const packageDir = await findPackageDir();
  if (!packageDir) {
    return NextResponse.json(
      { error: "failed to find package dir" },
      { status: 404 }
    );
    return;
  }
  const files: string[] = [];
  for await (const file of listFiles(packageDir))
    files.push(path.relative(packageDir, file));
  return NextResponse.json({ files });
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
