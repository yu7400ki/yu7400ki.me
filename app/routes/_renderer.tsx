import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { name as SITE_NAME } from "../../public/webmanifest.json";
import { css } from "../../styled-system/css";

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <link rel="manifest" href="/webmanifest.json" />
        <Link href="/app/global.css" rel="stylesheet" />
        <Script src="/app/client.ts" async={true} />
      </head>
      <body
        class={css({
          minH: "100dvh",
          color: "fg.default",
          bg: "bg.canvas",
        })}
      >
        {children}
      </body>
    </html>
  );
});
