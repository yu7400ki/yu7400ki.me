import type { MDXComponents } from "mdx/types";
import { css, cva, cx } from "../../styled-system/css";
import { code, link, table, text } from "../../styled-system/recipes";
import GithubEmbed from "../components/github-embed";

const tableStyle = table({ variant: "outline" });

const listRecipe = cva({
  base: {
    ml: "6",
    "& > li::marker": {
      color: "fg.muted",
    },
    "& > li + li": {
      mt: "2",
    },
  },
  variants: {
    style: {
      disc: {
        listStyleType: "disc",
      },
      decimal: {
        listStyleType: "decimal",
      },
    },
  },
});

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    GithubEmbed: GithubEmbed,
    h1: (props) => (
      <h1 {...props} class={cx(props?.class, text({ size: "4xl" }))} />
    ),
    h2: (props) => (
      <h2 {...props} class={cx(props?.class, text({ size: "3xl" }))} />
    ),
    h3: (props) => (
      <h3 {...props} class={cx(props?.class, text({ size: "2xl" }))} />
    ),
    h4: (props) => (
      <h4 {...props} class={cx(props?.class, text({ size: "xl" }))} />
    ),
    h5: (props) => (
      <h5 {...props} class={cx(props?.class, text({ size: "lg" }))} />
    ),
    h6: (props) => (
      <h6 {...props} class={cx(props?.class, text({ size: "md" }))} />
    ),
    code: (props) => (
      <code
        {...props}
        class={
          props?.class ??
          cx(
            code(),
            css({
              mx: 0.5,
              maxW: "full",
              overflow: "auto",
            }),
          )
        }
      />
    ),
    pre: ({ filename, ...props }) => (
      <pre
        {...props}
        data-filename={filename}
        class={cx(
          props?.class,
          css({
            py: 4,
            rounded: "md",
            overflowX: "auto",
            lineHeight: "normal",
            "& > code": {
              display: "inline-block",
              minW: "full",
              px: 5,
            },
            "&[data-filename]::before": {
              content: "attr(data-filename)",
              display: "block",
              px: 2,
              py: 1,
              ml: 5,
              mt: -4,
              mb: 2,
              fontSize: "sm",
              bg: "gray.dark.7",
              roundedBottom: "md",
              width: "fit-content",
            },
            "& code > span.line.diff": {
              position: "relative",
              display: "inline-block",
              width: "calc(token(spacing.10) + 100%)",
              my: 0,
              mx: -5,
              px: 5,
              _before: {
                position: "absolute",
                display: "flex",
                alignItems: "center",
                insetY: 0,
                left: 1.5,
              },
            },
            "& code > span.line.diff.add": {
              bg: "rgba(16, 185, 30, 0.16)",
              color: "rgb(61, 214, 140)",
              _before: {
                content: "'+'",
              },
            },
            "& code > span.line.diff.remove": {
              bg: "rgba(220, 53, 69, 0.16)",
              color: "rgb(248, 113, 117)",
              _before: {
                content: "'-'",
              },
            },
          }),
        )}
      />
    ),
    span: (props) => (
      <span
        {...props}
        class={cx(
          props?.class,
          props?.class?.includes("katex") &&
            css({
              display: "inline-block",
              maxW: "full",
              overflow: "auto",
              "&[aria-hidden=true]": {
                srOnly: true,
              },
            }),
        )}
      />
    ),
    table: (props) => (
      <table {...props} class={cx(props?.class, tableStyle.root)} />
    ),
    thead: (props) => (
      <thead {...props} class={cx(props?.class, tableStyle.head)} />
    ),
    tr: (props) => <tr {...props} class={cx(props?.class, tableStyle.row)} />,
    th: (props) => (
      <th {...props} class={cx(props?.class, tableStyle.header)} />
    ),
    tbody: (props) => (
      <tbody {...props} class={cx(props?.class, tableStyle.body)} />
    ),
    td: (props) => <td {...props} class={cx(props?.class, tableStyle.cell)} />,
    ul: (props) => (
      <ul {...props} class={cx(props?.class, listRecipe({ style: "disc" }))} />
    ),
    ol: (props) => (
      <ol
        {...props}
        class={cx(props?.class, listRecipe({ style: "decimal" }))}
      />
    ),
    a: (_props) => {
      const props = { ..._props };
      const { href } = props;
      const isInternal = href?.startsWith("/") || href?.startsWith("#");
      if (!isInternal) {
        props.target = "_blank";
        props.rel = "noopener noreferrer";
      }
      return (
        <a
          {...props}
          class={cx(props?.class, link(), css({ wordBreak: "break-all" }))}
        >
          {props.children}
        </a>
      );
    },
    ...components,
  };
}
