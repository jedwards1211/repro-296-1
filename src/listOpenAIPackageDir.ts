import fs from "fs";
import path from "path";

export async function listOpenAIPackageDir(): Promise<string[]> {
  const paths = [];
  const packageDir = await findPackageDir("openai");
  if (!packageDir) throw new Error("failed to find package dir for openai");
  for await (const entry of walk(packageDir)) {
    paths.push(path.relative(packageDir, path.join(entry.path, entry.name)));
  }
  return paths;
}

async function* walk(dir: string): AsyncIterable<fs.Dirent> {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    yield d;
    if (d.isDirectory()) yield* walk(entry);
  }
}

async function findPackageDir(pkg: string) {
  let dir = __dirname;
  while (dir && dir !== "/") {
    if (
      await fs.promises.stat(path.join(dir, "node_modules", pkg)).then(
        (stat) => stat.isDirectory(),
        () => false
      )
    ) {
      return path.join(dir, "node_modules", pkg);
    }
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
}
