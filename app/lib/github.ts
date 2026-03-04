import type { Node } from "unist";
import { visit } from "unist-util-visit";
import { z } from "zod";

export const PERMALINK_REGEX =
  /https:\/\/github\.com\/(?<owner>[^/]+)\/(?<repository>[^/]+)\/blob\/(?<commit>[^/]+)\/(?<path>[^#]+)(?:#L(?<line>\d+)(?:-L(?<lineEnd>\d+))?)?/;

export const permalinkSchema = z
  .object({
    owner: z.string(),
    repository: z.string(),
    commit: z.string(),
    path: z.string(),
    line: z.coerce.number(),
    lineEnd: z.coerce.number(),
  })
  .or(
    z.object({
      owner: z.string(),
      repository: z.string(),
      commit: z.string(),
      path: z.string(),
      line: z.coerce.number(),
      lineEnd: z.undefined(),
    }),
  )
  .or(
    z.object({
      owner: z.string(),
      repository: z.string(),
      commit: z.string(),
      path: z.string(),
      line: z.undefined(),
      lineEnd: z.undefined(),
    }),
  );

export type Permalink = z.infer<typeof permalinkSchema>;

export function parsePermalink(url: string): Permalink {
  const match = url.match(PERMALINK_REGEX);
  if (!match) {
    throw new Error("Invalid permalink");
  }
  return permalinkSchema.parse(match.groups);
}

const contentsResponseSchema = z.object({
  content: z.string(),
  encoding: z.literal("base64"),
});

const extToGitHubLanguage: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  jsx: "JavaScript",
  py: "Python",
  rb: "Ruby",
  rs: "Rust",
  go: "Go",
  java: "Java",
  c: "C",
  h: "C",
  cpp: "C++",
  cs: "C#",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  md: "Markdown",
  mdx: "MDX",
  sh: "Shell",
  sql: "SQL",
  swift: "Swift",
  kt: "Kotlin",
  scala: "Scala",
  hs: "Haskell",
  ex: "Elixir",
  lua: "Lua",
  toml: "TOML",
  xml: "XML",
  zig: "Zig",
  vue: "Vue",
  svelte: "Svelte",
  dart: "Dart",
  php: "PHP",
  scss: "SCSS",
  r: "R",
};

function getLanguageFromPath(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  return extToGitHubLanguage[ext] ?? "Text";
}

export async function fetchPermalink(permalink: string) {
  const { owner, repository, commit, path } = parsePermalink(permalink);
  const apiUrl = `https://api.github.com/repos/${owner}/${repository}/contents/${path}?ref=${commit}`;

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch permalink");
  }

  const json = await response.json();
  const result = contentsResponseSchema.safeParse(json);
  if (!result.success) {
    throw new Error("Failed to parse GitHub API response");
  }

  const binary = atob(result.data.content.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const content = new TextDecoder().decode(bytes);
  const lines = content.split("\n");
  if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  const language = getLanguageFromPath(path);
  const title = `${owner}/${repository} - ${path}`;

  return { title, lines, language };
}

export function remarkGithubPermalinks() {
  return <T extends Node>(tree: T) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (
        !(
          typeof index === "number" &&
          "children" in node &&
          Array.isArray(node.children) &&
          node.children.length === 1 &&
          node.children[0].type === "link"
        )
      ) {
        return;
      }
      const [link] = node.children as Node[];
      if (
        !(
          "url" in link &&
          typeof link.url === "string" &&
          "children" in link &&
          Array.isArray(link.children) &&
          link.children.every(
            (child) =>
              child.type === "text" &&
              typeof child.value === "string" &&
              child.value === link.url,
          )
        )
      ) {
        return;
      }
      const match = link.url.match(PERMALINK_REGEX);
      if (!match) {
        return;
      }
      parent?.children.splice(index, 1, {
        type: "mdxJsxFlowElement",
        // @ts-ignore
        name: "GithubEmbed",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "permalink",
            value: match[0],
          },
        ],
        children: [],
      });
    });
  };
}
