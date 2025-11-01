import { promises as fs } from "fs";
import { dirname } from "path";

export async function readJson<T>(path: string, fallback: T): Promise<T> {
  try { return JSON.parse(await fs.readFile(path, "utf-8")); }
  catch { return fallback; }
}
export async function writeJson<T>(path: string, data: T) {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}