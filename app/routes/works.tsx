import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import { container } from "../../styled-system/patterns";
import type { Frontmatter } from "../types";
import { loadArticles, readArticle } from "../utils/mdx";

export default createRoute(async (c) => {
  const dir = `${import.meta.dirname}/works`;
  const works = await Promise.all(
    (await loadArticles(dir)).map(async (file) => ({
      ...(await readArticle<Frontmatter>(dir, file)),
      slug: file,
    })),
  );
  works.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return c.render(
    <div class={container()}>
      <h1
        class={css({
          fontFamily: "latin",
          fontSize: "6xl",
          fontWeight: "bold",
          mt: "10",
          mb: "6",
          sm: {
            fontSize: "8xl",
            mt: "12",
            mb: "8",
          },
        })}
      >
        Works
      </h1>
      <div
        class={css({
          display: "grid",
          gap: "8",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(16rem, 100%), 1fr))",
          sm: {
            gap: "16",
          },
        })}
      >
        {works.map(({ frontmatter, slug }) => (
          <a
            href={`works/${slug}`}
            class={css({
              display: "grid",
              alignContent: "start",
              _hover: {
                color: "colorPalette.text",
              },
            })}
          >
            <img
              class={css({
                w: "full",
                h: "auto",
                aspectRatio: "16/9",
                objectFit: "cover",
                rounded: "xl",
                mb: "2",
                borderColor: "border.muted",
                borderWidth: "1",
              })}
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
            />
            <h2
              class={css({
                fontSize: "lg",
              })}
            >
              {frontmatter.title}
            </h2>
            <p
              class={css({
                color: "fg.muted",
              })}
            >
              {frontmatter.description}
            </p>
          </a>
        ))}
      </div>
    </div>,
    { title: "Works" },
  );
});
