// biome-ignore lint/correctness/noNodejsModules: build time only
import path from "node:path";
import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import { transformerNotationDiff } from "@shikijs/transformers";
import fg from "fast-glob";
import honox from "honox/vite";
import { devServerDefaultOptions } from "honox/vite";
import client from "honox/vite/client";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { visit } from "unist-util-visit";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { remarkGithubPermalinks } from "./app/lib/github";

const entry = "./app/server.ts";

export default defineConfig(async ({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [
        client({
          input: ["/app/global.css", "/app/theme.ts"],
        }),
      ],
    };
  }

  const files = await fg("app/routes/**/*.mdx", { dot: true, onlyFiles: true });
  const targets = files.map((p) => {
    const dir = path.dirname(path.relative("app/routes", p));
    const base = path.basename(p, path.extname(p));
    return {
      src: p,
      dest: path.join(dir),
      rename: `${base}.md`,
    };
  });

  return {
    build: {
      assetsDir: "static", // make all non-island asset imports map to the /dist/static directory when emitted
      ssrEmitAssets: true, // emit all the assets required during the SSR build
      emptyOutDir: false,
    },
    plugins: [
      honox({
        devServer: {
          exclude: [
            ...devServerDefaultOptions.exclude,
            /^\/app\/.+/,
            /^\/favicon.ico/,
            /^\/static\/.+/,
            /\.(png|jpg|jpeg|svg|webp)$/,
          ],
        },
      }),
      ssg({ entry }),
      AutoImport({
        resolvers: [
          IconsResolver({
            prefix: "Icon",
            extension: "jsx",
          }),
        ],
      }),
      Icons({
        compiler: "solid",
      }),
      mdx({
        elementAttributeNameCase: "html",
        jsxImportSource: "hono/jsx",
        providerImportSource: "/app/lib/mdx-components.tsx",
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkBreaks,
          remarkGfm,
          remarkGithubPermalinks,
          remarkMath,
        ],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              theme: "github-dark",
              parseMetaString,
              transformers: [transformerNotationDiff()],
            },
          ],
          () => (tree) => {
            visit(tree, "element", (node) => {
              if (node?.type !== "element" || node?.tagName !== "pre") {
                return;
              }
              const [codeEl] = node.children;
              if (codeEl.tagName !== "code") {
                return;
              }
              codeEl.properties.class = [
                ...(codeEl.properties.class || []),
                "code-block",
              ];
            });
          },
          rehypeSlug,
          rehypeKatex,
        ],
      }),
      viteStaticCopy({
        targets,
      }),
    ],
  };
});

function parseMetaString(metaString = ""): Record<string, string> {
  const regex = /(\w+)="([^"]*)"/g;
  const meta: Record<string, string> = {};
  let match = regex.exec(metaString);
  while (match) {
    meta[match[1]] = match[2];
    match = regex.exec(metaString);
  }
  return meta;
}
