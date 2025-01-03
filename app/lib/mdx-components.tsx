import type { MDXComponents } from "mdx/types";
import { css, cva, cx } from "../../styled-system/css";
import { code, link, table, text } from "../../styled-system/recipes";

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
      <code {...props} class={props?.class ?? cx(code(), css({ mx: 0.5 }))} />
    ),
    pre: (props) => (
      <pre
        {...props}
        class={cx(
          props?.class,
          css({ p: 4, rounded: "md", overflowX: "auto" }),
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
        <a {...props} class={cx(props?.class, link())}>
          {props.children}
        </a>
      );
    },
    ...components,
  };
}
