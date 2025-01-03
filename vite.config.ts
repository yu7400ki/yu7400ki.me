import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { devServerDefaultOptions } from "honox/vite";
import client from "honox/vite/client";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

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
    ],
  };
});
