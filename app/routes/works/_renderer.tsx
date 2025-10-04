import { jsxRenderer } from "hono/jsx-renderer";
import { css, cx } from "../../../styled-system/css";
import { container } from "../../../styled-system/patterns";
import { link } from "../../../styled-system/recipes";

const getLinkIcon = (hostname: string) => {
  switch (hostname) {
    case "github.com":
      return IconFa6BrandsGithub;
    case "x.com":
      return IconFa6BrandsXTwitter;
    default:
      return IconLucideLink;
  }
};

function Link({ href }: { href: string }) {
  const url = new URL(href);
  const Icon = getLinkIcon(url.hostname);

  return (
    <div
      class={css({
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        alignItems: "center",
        gap: "2",
      })}
    >
      <Icon />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        class={cx(link(), css({ wordBreak: "break-word" }))}
      >
        {href}
      </a>
    </div>
  );
}

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
        <p
          class={css({
            color: "fg.muted",
            fontSize: "lg",
            mb: "6",
          })}
        >
          {frontmatter?.description}
        </p>
        {frontmatter?.links && (
          <div
            class={css({
              display: "grid",
              justifyItems: "start",
              gap: "1",
              color: "fg.muted",
              mb: "6",
              fontFamily: "latin",
            })}
          >
            {frontmatter?.links?.map((link) => (
              <Link href={link} />
            ))}
          </div>
        )}
        <img
          src={frontmatter?.thumbnail}
          alt=""
          class={css({
            w: "full",
            h: "auto",
            objectFit: "contain",
            rounded: "xl",
            borderColor: "border.muted",
            borderWidth: "1",
            mb: "6",
            sm: {
              mb: "8",
            },
          })}
          fetchpriority="high"
        />
        <article
          class={css({
            "& > * + *": {
              mt: "1.5em",
            },
          })}
        >
          {children}
        </article>
      </div>
    </Layout>
  );
});
