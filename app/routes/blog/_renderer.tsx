import { jsxRenderer } from "hono/jsx-renderer";
import { css } from "../../../styled-system/css";
import { container } from "../../../styled-system/patterns";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  return (
    <Layout frontmatter={frontmatter}>
      <div class={container({ maxW: "4xl" })}>
        <h1
          class={css({
            fontSize: "4xl",
            mt: "12",
            sm: {
              fontSize: "5xl",
              mt: "16",
            },
          })}
        >
          {frontmatter?.title}
        </h1>
        <span
          class={css({
            display: "block",
            color: "fg.muted",
            fontSize: "lg",
            mb: "12",
            sm: {
              mb: "16",
            },
          })}
        >
          {new Date(frontmatter?.date ?? "").toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
        <article
          class={css({
            "& > * + *": {
              mt: "1.5em",
            },
            "& [aria-hidden=true]": {
              srOnly: true,
            },
          })}
        >
          {children}
        </article>
      </div>
    </Layout>
  );
});
