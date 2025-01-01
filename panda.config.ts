import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: neutral,
      grayColor: neutral,
      radius: "md",
    }),
  ],
  include: ["./app/**/*.{js,jsx,ts,tsx,vue}"],
  outdir: "styled-system",
});
