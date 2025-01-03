import {} from "hono";
import type { Frontmatter, Meta } from "./types";

declare module "hono" {
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType:
    (
      content: string | Promise<string>,
      // head?: Head,
      meta?: Meta & { frontmatter?: Frontmatter },
    ): Response | Promise<Response>;
  }
}
