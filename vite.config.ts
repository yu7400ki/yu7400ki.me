import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import honox from "honox/vite";
import { devServerDefaultOptions } from "honox/vite";
import client from "honox/vite/client";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { visit } from "unist-util-visit";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import { remarkGithubPermalinks } from "./app/lib/github";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [
        client({
          input: ["/app/global.css", "/app/theme.ts"],
        }),
      ],
    };
  }
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
        ],
        rehypePlugins: [
          [rehypeShiki, { theme: "github-dark" }],
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
        ],
      }),
    ],
  };
});
