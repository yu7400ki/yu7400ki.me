import { type Highlighter, createHighlighter } from "shiki";
import { css } from "../../styled-system/css";
import { fetchPermalink, parsePermalink } from "../lib/github";

type Props = {
  permalink: string;
};

const theme = "github-dark";
const highlighterMap = new Map<string, Highlighter>();

async function getHighlighter(language: string) {
  let highlighter = highlighterMap.get(language);
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: [language],
    });
    highlighterMap.set(language, highlighter);
  }
  return highlighter;
}

export default async function GithubEmbed({ permalink }: Props) {
  let { line, lineEnd } = parsePermalink(permalink);
  const { title, language, lines } = await fetchPermalink(permalink);
  if (!line) {
    line = 1;
    lineEnd = lines.length;
  }
  if (!lineEnd) {
    lineEnd = line;
  }
  const selectedLines = lines.slice(line - 1, lineEnd);
  const code = selectedLines.join("\n");
  const lang = languageMap[language] ?? "plaintext";
  const highlighter = await getHighlighter(lang);
  const html = highlighter.codeToHtml(code, { lang, theme });

  return (
    <div class={css({ rounded: "md", overflow: "hidden" })}>
      <div
        class={css({
          display: "grid",
          gap: 2,
          gridTemplateColumns: "auto 1fr",
          alignItems: "center",
          p: 2,
          fontSize: "xs",
          bg: "bg.emphasized",
          fontFamily: "latin",
        })}
      >
        <IconFa6BrandsGithub />
        <a
          class={css({
            wordBreak: "break-word",
          })}
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </div>
      <div
        class={css({
          "& > pre": {
            p: 4,
            overflowX: "auto",
            lineHeight: "normal",
          },
        })}
        // biome-ignore lint/security/noDangerouslySetInnerHtml:
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

const languageMap: Record<string, string> = {
  ABAP: "abap",
  ActionScript: "actionscript-3",
  Ada: "ada",
  Apex: "apex",
  APL: "apl",
  AppleScript: "applescript",
  AsciiDoc: "asciidoc",
  Assembly: "asm",
  Astro: "astro",
  Ballerina: "ballerina",
  Berry: "berry",
  BibTeX: "bibtex",
  Bicep: "bicep",
  Blade: "blade",
  C: "c",
  Cadence: "cadence",
  Cairo: "cairo",
  Clarity: "clarity",
  Clojure: "clojure",
  CMake: "cmake",
  COBOL: "cobol",
  CODEOWNERS: "codeowners",
  CodeQL: "codeql",
  CoffeeScript: "coffee",
  "Common Lisp": "common-lisp",
  Coq: "coq",
  "C++": "cpp",
  Crystal: "crystal",
  "C#": "csharp",
  CSS: "css",
  CSV: "csv",
  CUE: "cue",
  Cypher: "cypher",
  D: "d",
  Dart: "dart",
  Diff: "diff",
  Dockerfile: "docker",
  Edge: "edge",
  Elixir: "elixir",
  Elm: "elm",
  "Emacs Lisp": "emacs-lisp",
  Erlang: "erlang",
  Fennel: "fennel",
  Fluent: "fluent",
  "F#": "fsharp",
  GDScript: "gdscript",
  Genie: "genie",
  Gherkin: "gherkin",
  Gleam: "gleam",
  "Glimmer JS": "glimmer-js",
  "Glimmer TS": "glimmer-ts",
  GLSL: "glsl",
  Gnuplot: "gnuplot",
  Go: "go",
  GraphQL: "graphql",
  Groovy: "groovy",
  Hack: "hack",
  Handlebars: "handlebars",
  Haskell: "haskell",
  Haxe: "haxe",
  HLSL: "hlsl",
  HTML: "html",
  HTTP: "http",
  HXML: "hxml",
  Hy: "hy",
  Imba: "imba",
  INI: "ini",
  Java: "java",
  JavaScript: "javascript",
  Jinja: "jinja",
  Jison: "jison",
  JSON: "json",
  JSON5: "json5",
  "JSON with Comments": "jsonc",
  Jsonnet: "jsonnet",
  Julia: "julia",
  Kotlin: "kotlin",
  Kusto: "kusto",
  "Lean 4": "lean",
  Less: "less",
  Liquid: "liquid",
  Lua: "lua",
  Luau: "luau",
  Makefile: "make",
  Markdown: "markdown",
  Marko: "marko",
  MATLAB: "matlab",
  MDX: "mdx",
  Mermaid: "mermaid",
  Mojo: "mojo",
  Move: "move",
  Nextflow: "nextflow",
  Nginx: "nginx",
  Nim: "nim",
  Nix: "nix",
  "Objective-C": "objective-c",
  "Objective-C++": "objective-cpp",
  OCaml: "ocaml",
  Pascal: "pascal",
  Perl: "perl",
  PHP: "php",
  Polar: "polar",
  PostCSS: "postcss",
  PowerShell: "powershell",
  Prisma: "prisma",
  Prolog: "prolog",
  Pug: "pug",
  Puppet: "puppet",
  PureScript: "purescript",
  Python: "python",
  QML: "qml",
  R: "r",
  Racket: "racket",
  Raku: "raku",
  reStructuredText: "rst",
  Ruby: "ruby",
  Rust: "rust",
  SAS: "sas",
  Sass: "sass",
  Scala: "scala",
  Scheme: "scheme",
  SCSS: "scss",
  ShaderLab: "shaderlab",
  Shell: "shellscript",
  Smalltalk: "smalltalk",
  Solidity: "solidity",
  "Closure Templates": "soy",
  SPARQL: "sparql",
  SQL: "sql",
  "SSH Config": "ssh-config",
  Stata: "stata",
  Stylus: "stylus",
  Svelte: "svelte",
  Swift: "swift",
  SystemVerilog: "system-verilog",
  Tcl: "tcl",
  TeX: "tex",
  TOML: "toml",
  TSV: "tsv",
  TSX: "tsx",
  Turtle: "turtle",
  Twig: "twig",
  TypeScript: "typescript",
  TypeSpec: "typespec",
  Typst: "typst",
  V: "v",
  Vala: "vala",
  Verilog: "verilog",
  VHDL: "vhdl",
  "Vim Script": "viml",
  Vue: "vue",
  Vyper: "vyper",
  WebAssembly: "wasm",
  WGSL: "wgsl",
  Wikitext: "wikitext",
  XML: "xml",
  YAML: "yaml",
  ZenScript: "zenscript",
  Zig: "zig",
};
