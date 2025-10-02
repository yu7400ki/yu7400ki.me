import { jsxRenderer } from "hono/jsx-renderer";
import { Link } from "honox/server";
import {
  description as DESCRIPTION,
  name as SITE_NAME,
} from "../../public/webmanifest.json";
import { css, cx } from "../../styled-system/css";
import { divider } from "../../styled-system/patterns";
import { ContentSecurityPolicy } from "../components/content-security-policy";
import { InlineScript } from "../components/scripts";

function Footer() {
  const socials = [
    {
      link: "https://x.com/yu7400ki",
      label: "X(yu7400ki)",
      logo: IconFa6BrandsXTwitter,
    },
    {
      link: "https://github.com/yu7400ki",
      label: "GitHub(yu7400ki)",
      logo: IconFa6BrandsGithub,
    },
    {
      link: "https://mixi.social/@yu7400ki",
      label: "mixi2(@yu7400ki)",
      logo: Mixi2,
    },
  ];

  return (
    <footer class={css({ alignSelf: "end" })}>
      <div
        class={css({
          display: "grid",
          gap: "8",
          placeItems: "center",
          pt: "16",
          pb: "20",
          color: "fg.default",
          fontSize: "sm",
          fontFamily: "latin",
        })}
      >
        <p>&copy; 2025 yu7400ki</p>
        <div
          class={css({
            display: "flex",
            justifyContent: "center",
            gap: "4",
          })}
        >
          {socials.map(({ link, logo: Logo, label }) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Logo
                class={css({
                  w: "6",
                  h: "6",
                  transition: "transform 0.2s",
                  _hover: {
                    transform: "scale(1.1)",
                  },
                })}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Mixi2(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      viewBox="0 0 1645 1291"
      width="1em"
      height="1em"
      {...props}
    >
      <title>mixi2</title>
      <path
        d="M0-111.302C-38.401-253.8-149.433-31.421-194.067-155.203c-30.722-85.202-157.128 12.6-187.752 131.288-17.55 68.046 16.689 111.68 106.382 53.649 71.397-46.196 115.343-34.398 107.721 48.024-3.39 36.65 38.984 64.74 101.194 25.633C3.885 59.138 21.092-33.042 0-111.302"
        style={{
          fill: "#fff",
          fillRule: "nonzero",
        }}
        transform="translate(1609.424 780.848) scale(4.16667)"
      />
    </svg>
  );
}

function Navigation({ path }: { path: string }) {
  const navigation = [
    {
      label: "Home",
      href: "/",
      icon: IconLucideHome,
    },
    {
      label: "Works",
      href: "/works",
      icon: IconLucideCode,
    },
    {
      label: "Blog",
      href: "/blog",
      icon: IconLucideLayers,
    },
  ];

  return (
    <nav
      class={css({
        alignSelf: "end",
        position: "sticky",
        bottom: "8",
        zIndex: "1",
        display: "flex",
        gap: "1",
        rounded: "full",
        shadow: "md",
        mx: "auto",
        width: "fit-content",
        bg: "bg.default",
        p: "1",
        fontFamily: "latin",
        fontSize: "sm",
        sm: {
          gap: "2",
        },
      })}
    >
      {navigation.map(({ label, href, icon: Icon }) => (
        <a
          href={href}
          aria-current={path === href ? "page" : undefined}
          class={cx(
            css({
              display: "flex",
              gap: "2",
              alignItems: "center",
              justifyContent: "center",
              rounded: "full",
              h: "8",
              px: "3",
              _hover: { bg: "bg.emphasized" },
              _currentPage: { bg: "bg.emphasized" },
            }),
            "group",
          )}
        >
          <Icon />
          <span
            class={css({
              ".group:not([aria-current=page]) &": {
                srOnly: true,
                sm: { srOnly: false },
              },
            })}
          >
            {label}
          </span>
        </a>
      ))}
      <div
        class={divider({
          orientation: "vertical",
          h: "auto",
          my: "1",
          sm: {
            mx: "-1",
          },
        })}
      />
      <button
        id="theme-toggle"
        type="button"
        class={css({
          display: "grid",
          placeItems: "center",
          rounded: "full",
          cursor: "pointer",
          h: "8",
          w: "8",
          aspectRatio: "1/1",
          _hover: { bg: "bg.emphasized" },
        })}
      >
        <IconLucideMoon
          role="img"
          aria-label="ダークモードに切り替える"
          class={css({
            display: {
              _default: "block",
              _dark: "none",
            },
          })}
        />
        <IconLucideSun
          role="img"
          aria-label="ライトモードに切り替える"
          class={css({
            display: {
              _default: "none",
              _light: "none",
              _dark: "block",
            },
          })}
        />
      </button>
    </nav>
  );
}

export default jsxRenderer(({ children, ...meta }, c) => {
  const { path } = c.req;
  const title = meta.frontmatter?.title ?? meta.title;
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
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

        <ContentSecurityPolicy
          content={{
            "default-src": ["'self'"],
            "script-src": ["'self'", "static.cloudflareinsights.com"],
            "style-src": ["'self'", "'unsafe-inline'"],
          }}
          inlineScripts={["/app/theme.ts"]}
        />

        <meta property="og:url" content={`https://yu7400ki.me${path}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={title ? `${title} | ${SITE_NAME}` : SITE_NAME}
        />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content="https://yu7400ki.me/icon.webp" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="ja_JP" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@yu7400ki" />
        <meta name="twitter:creator" content="@yu7400ki" />

        <Link href="/app/global.css" rel="stylesheet" />
        <InlineScript src="/app/theme.ts" />
      </head>
      <body
        class={css({
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          minH: "100dvh",
          color: "fg.default",
          bg: "bg.canvas",
          lineHeight: "relaxed",
          letterSpacing: "wider",
          fontFamily: "japanese",
          fontSize: { base: "sm", md: "md" },
        })}
      >
        <main
          class={css({
            minW: 0,
          })}
        >
          {children}
        </main>
        <Footer />
        <Navigation path={path} />
      </body>
    </html>
  );
});
