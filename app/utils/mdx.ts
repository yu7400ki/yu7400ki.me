// biome-ignore lint/correctness/noNodejsModules:
import fs from "node:fs/promises";
import { parse as parseYaml } from "@std/yaml";

export function parseFrontmatter<T>(content: string): T {
  const match = content.match(/^---\n([\s\S]+?)\n---\n/);
  if (!match) {
    throw new Error("Frontmatter not found");
  }
  const frontmatter = parseYaml(match[1]);
  return frontmatter as T;
}

export async function loadArticles(dir = import.meta.dirname) {
  const files = await fs.readdir(dir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function readArticle<T>(dir: string, file: string) {
  const content = await fs.readFile(`${dir}/${file}.mdx`, "utf-8");
  const frontmatter = parseFrontmatter<T>(content);
  return { frontmatter, content };
}
