import { type Highlighter, createHighlighter } from "shiki";
import { css } from "../../styled-system/css";
import { fetchPermalink, parsePermalink } from "../lib/github";

type Props = {
  permalink: string;
};

const THEME = "github-dark";
const highlighterMap = new Map<string, Highlighter>();

async function getHighlighter(language: string) {
  let highlighter = highlighterMap.get(language);
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [THEME],
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
  const highlighter = await getHighlighter(language);
  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

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
