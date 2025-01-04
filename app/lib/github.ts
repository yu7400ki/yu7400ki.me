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

export const permalinkResponseSchema = z.object({
  title: z.string(),
  payload: z.object({
    blob: z.object({
      rawLines: z.array(z.string()),
      language: z.string(),
    }),
  }),
});

export async function fetchPermalink(permalink: string) {
  const response = await fetch(permalink, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch permalink");
  }
  const json = await response.json();
  const result = permalinkResponseSchema.safeParse(json);
  if (!result.success) {
    throw new Error("Failed to parse permalink response");
  }
  const { title, payload } = result.data;
  return {
    title,
    lines: payload.blob.rawLines,
    language: payload.blob.language,
  };
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
