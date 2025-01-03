import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import { container } from "../../styled-system/patterns";
import type { Frontmatter } from "../types";
import { loadArticles, readArticle } from "../utils/mdx";

export default createRoute(async (c) => {
  const dir = `${import.meta.dirname}/blog`;
  const blog = await Promise.all(
    (await loadArticles(dir)).map(async (file) => ({
      ...(await readArticle<Pick<Frontmatter, "date" | "title">>(dir, file)),
      slug: file,
    })),
  );
  blog.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

  return c.render(
    <div class={container({ maxW: "4xl" })}>
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
        Blog
      </h1>
      <div
        class={css({
          display: "grid",
          gap: "3",
          sm: {
            gap: "4",
          },
        })}
      >
        {blog.map(({ frontmatter, slug }) => (
          <a
            href={`blog/${slug}`}
            class={css({
              display: "flex",
              alignItems: "center",
              gap: "6",
              fontSize: "lg",
              sm: {
                fontSize: "xl",
              },
              _hover: {
                color: "colorPalette.text",
              },
            })}
          >
            <h2>{frontmatter.title}</h2>
            <span
              class={css({
                fontFamily: "latin",
                fontSize: "sm",
                color: "fg.muted",
              })}
            >
              {frontmatter.date.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </a>
        ))}
      </div>
    </div>,
    { title: "Blog" },
  );
});
