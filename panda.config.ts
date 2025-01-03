import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import cyan from "@park-ui/panda-preset/colors/cyan";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  patterns: {
    extend: {
      container: {
        transform(props) {
          return {
            position: "relative",
            maxWidth: "6xl",
            mx: "auto",
            px: { base: "4", md: "6", lg: "8" },
            ...props,
          };
        },
      },
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          japanese: { value: "'Hiragino Sans', 'BIZ UDPGothic', 'sans-serif'" },
          latin: {
            value:
              "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
          },
        },
      },
    },
  },
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: cyan,
      grayColor: neutral,
      radius: "md",
    }),
  ],
  include: ["./app/**/*.{js,jsx,ts,tsx,vue}"],
  outdir: "styled-system",
});
