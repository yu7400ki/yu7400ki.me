// biome-ignore lint/correctness/noNodejsModules:
import fs from "node:fs/promises";
import { encodeBase64 } from "hono/utils/encode";
import type { Manifest } from "vite";

type Options = {
  content: Record<string, string[]>;
  inlineScripts?: string[];
};

async function sha256(buffer: Buffer) {
  return await crypto.subtle.digest("SHA-256", buffer);
}

export const ContentSecurityPolicy = async (options: Options) => {
  if (!import.meta.env.PROD) {
    return <></>;
  }
  let manifest: Manifest | undefined;
  const MANIFEST = import.meta.glob<{ default: Manifest }>(
    "/dist/.vite/manifest.json",
    {
      eager: true,
    },
  );
  for (const [, manifestFile] of Object.entries(MANIFEST)) {
    if (manifestFile.default) {
      manifest = manifestFile.default;
      break;
    }
  }
  if (manifest) {
    for (const src of options.inlineScripts ?? []) {
      const scriptInManifest = manifest[src.replace(/^\//, "")];
      if (scriptInManifest) {
        const file = await fs.readFile(
          `dist/${scriptInManifest.file}`,
          "utf-8",
        );
        const hash = await sha256(Buffer.from(file));
        const b64 = encodeBase64(hash);
        if (!options.content["script-src"]) {
          options.content["script-src"] = [];
        }
        options.content["script-src"].push(`'sha256-${b64}'`);
      }
    }
  }
  const content = Object.entries(options.content)
    .map(([key, value]) => {
      return `${key} ${value.join(" ")}`;
    })
    .join("; ");
  return <meta httpEquiv="content-security-policy" content={content} />;
};
