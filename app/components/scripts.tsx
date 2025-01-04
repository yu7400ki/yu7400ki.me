// biome-ignore lint/correctness/noNodejsModules:
import fs from "node:fs/promises";
import type { Manifest } from "vite";

type Options = {
  src: string;
  async?: boolean;
  prod?: boolean;
  manifest?: Manifest;
  nonce?: string;
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity:
export const Script = (options: Options) => {
  const src = options.src;
  if (options.prod ?? import.meta.env.PROD) {
    let manifest: Manifest | undefined = options.manifest;
    if (!manifest) {
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
    }
    if (manifest) {
      const scriptInManifest = manifest[src.replace(/^\//, "")];
      if (scriptInManifest) {
        return (
          <script
            type="module"
            async={!!options.async}
            src={`/${scriptInManifest.file}`}
            nonce={options.nonce}
          />
        );
      }
    }
    return <></>;
  }
  return (
    <script
      type="module"
      async={!!options.async}
      src={src}
      nonce={options.nonce}
    />
  );
};

export const InlineScript = async (
  options: Omit<Options, "async"> & { type?: "module" | "text/javascript" },
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity:
) => {
  const src = options.src;
  const type = options.type ?? "text/javascript";
  if (options.prod ?? import.meta.env.PROD) {
    let manifest: Manifest | undefined = options.manifest;
    if (!manifest) {
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
    }
    if (manifest) {
      const scriptInManifest = manifest[src.replace(/^\//, "")];
      if (scriptInManifest) {
        const file = await fs.readFile(
          `dist/${scriptInManifest.file}`,
          "utf-8",
        );
        return (
          <script
            type={type}
            nonce={options.nonce}
            // biome-ignore lint/security/noDangerouslySetInnerHtml:
            dangerouslySetInnerHTML={{ __html: file }}
          />
        );
      }
    }
    return <></>;
  }
  return <script type={type} src={src} nonce={options.nonce} />;
};
