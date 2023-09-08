import { NextResponse } from "next/server";
import { listOpenAIPackageDir } from "@/listOpenAIPackageDir";

export async function GET() {
  await import("openai").catch(() => {});
  const files = await listOpenAIPackageDir();
  return new NextResponse(files.join("\n") + "\n");
}
