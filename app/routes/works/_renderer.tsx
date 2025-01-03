import { jsxRenderer } from "hono/jsx-renderer";
import { css } from "../../../styled-system/css";
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
    <a href={href} target="_blank" rel="noopener noreferrer" class={link()}>
      <Icon />
      <span>{url.href}</span>
    </a>
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
        <img
          src={frontmatter?.thumbnail}
          alt={frontmatter?.title}
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
