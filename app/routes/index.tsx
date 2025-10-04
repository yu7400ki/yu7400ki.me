import type { PropsWithChildren } from "hono/jsx";
import { createRoute } from "honox/factory";
import { css, cx } from "../../styled-system/css";
import { circle, container } from "../../styled-system/patterns";

function Profile() {
  return (
    <div
      class={css({
        display: "grid",
        gap: "16",
        md: {
          gap: "32",
        },
      })}
    >
      <div
        class={css({
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "8",
          md: {
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20",
          },
        })}
      >
        <img
          src="/icon.webp"
          alt="icon"
          class={css({
            rounded: "full",
            w: "full",
            maxW: "56",
            aspectRatio: "1/1",
          })}
          fetchpriority="high"
        />
        <div
          class={css({ display: "flex", flexDirection: "column", gap: "4" })}
        >
          <div
            class={css({
              display: "flex",
              flexDirection: "column",
              gap: "2",
              fontFamily: "latin",
              fontSize: "6xl",
              md: { fontSize: "8xl" },
            })}
          >
            <h1
              class={css({
                fontWeight: "bold",
                letterSpacing: "tight",
                wordBreak: "break-all",
              })}
            >
              yu7400ki
            </h1>
            <p
              class={css({
                fontSize: "0.5em",
                color: "colorPalette.text",
              })}
            >
              Aiming to be a front-end engineer.
            </p>
          </div>
        </div>
      </div>
      <p class={css({ fontSize: "md", md: { fontSize: "lg" } })}>
        フロントエンドが好きです。ときどきバックエンドも触ります。
        <br />
        あとは気の向くままにいろいろやってます。
      </p>
    </div>
  );
}

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section class={css({ display: "grid", gap: "8" })}>
      <h2
        class={css({
          fontSize: "5xl",
          fontWeight: "bold",
          fontFamily: "latin",
          md: { fontSize: "6xl" },
        })}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Skills() {
  const skills = [
    {
      light: IconSkillIconsHtml,
      dark: IconSkillIconsHtml,
    },
    {
      light: IconSkillIconsCss,
      dark: IconSkillIconsCss,
    },
    {
      light: IconSkillIconsJavascript,
      dark: IconSkillIconsJavascript,
    },
    {
      light: IconSkillIconsTypescript,
      dark: IconSkillIconsTypescript,
    },
    {
      light: IconSkillIconsReactLight,
      dark: IconSkillIconsReactDark,
    },
    {
      light: IconSkillIconsNextjsLight,
      dark: IconSkillIconsNextjsDark,
    },
    {
      light: IconSkillIconsPythonLight,
      dark: IconSkillIconsPythonDark,
    },
    {
      light: IconSkillIconsRust,
      dark: IconSkillIconsRust,
    },
    {
      light: IconSkillIconsCloudflareLight,
      dark: IconSkillIconsCloudflareDark,
    },
    {
      light: IconSkillIconsWorkersLight,
      dark: IconSkillIconsWorkersDark,
    },
    {
      light: IconSkillIconsBunLight,
      dark: IconSkillIconsBunDark,
    },
    {
      light: IconSkillIconsNodejsLight,
      dark: IconSkillIconsNodejsDark,
    },
    {
      light: IconSkillIconsDocker,
      dark: IconSkillIconsDocker,
    },
    {
      light: IconSkillIconsGithubLight,
      dark: IconSkillIconsGithubDark,
    },
    {
      light: IconSkillIconsTauriLight,
      dark: IconSkillIconsTauriDark,
    },
    {
      light: IconSkillIconsViteLight,
      dark: IconSkillIconsViteDark,
    },
  ] as const;

  const details = [
    {
      title: "フロントエンド",
      content:
        "一番得意な分野で、目指すところでもあります。SolidJSから入りましたが、最近は専らReactのエコシステムを使ってます。推しはVite + React + Honoの構成です。",
    },
    {
      title: "バックエンド",
      content:
        "個人開発ではHonoを使ってCloudflare Workersにデプロイすることが多いです。PythonのFlaskやDjangoの経験も少々。",
    },
    {
      title: "競技プログラミング",
      content:
        "一年生の5月に始めて、二年生の9月に入水しました。最近はあまり取り組んでないです。",
    },
    {
      title: "その他",
      content:
        "RustでのCLIツール開発や、拡張機能開発など。Tauriでデスクトップアプリも作ってました。",
    },
  ];

  const Card = ({ title, content }: { title: string; content: string }) => (
    <div
      class={css({
        display: "grid",
        gap: "4",
        padding: "4",
        alignContent: "start",
        borderRadius: "lg",
        boxShadow: "md",
      })}
    >
      <h3 class={css({ fontWeight: "bold" })}>{title}</h3>
      <p>{content}</p>
    </div>
  );

  return (
    <Section title="Skills">
      <div
        class={css({
          display: "grid",
          justifyContent: "space-between",
          gap: "4",
          gridTemplateColumns: "repeat(auto-fill, 4rem)",
          md: {
            gap: "8",
            gridTemplateColumns: "repeat(auto-fill, 6rem)",
          },
        })}
      >
        {skills.map(({ light: Light, dark: Dark }) => (
          <>
            <div
              class={css({
                aspectRatio: "1/1",
                w: "4rem",
                h: "4rem",
                md: {
                  w: "6rem",
                  h: "6rem",
                },
                transition: "transform 0.2s",
                _hover: {
                  transform: "scale(1.1) rotate(5deg)",
                },
              })}
            >
              <Light
                class={css({
                  w: "full",
                  h: "full",
                  display: {
                    _default: "block",
                    _dark: "none",
                  },
                })}
              />
              <Dark
                class={css({
                  w: "full",
                  h: "full",
                  display: {
                    _default: "none",
                    _light: "none",
                    _dark: "block",
                  },
                })}
              />
            </div>
          </>
        ))}
      </div>
      <div
        class={css({
          display: "grid",
          gap: "8",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(24rem, 100%), 1fr))",
        })}
      >
        {details.map(({ title, content }) => (
          <Card title={title} content={content} />
        ))}
      </div>
    </Section>
  );
}

function Timeline() {
  const events = [
    {
      date: "2021/04",
      title: "基本情報技術者試験 合格",
    },
    {
      date: "2022/04",
      title: "東洋大学 情報連携学部 入学",
    },
    {
      date: "2024/09/02 - 2024/09/13",
      title: "株式会社ナレッジワーク インターン",
    },
    {
      date: "2025/05 -",
      title: "ちょっと株式会社 アルバイト",
    },
  ];

  const Step = ({ date, title }: { date: string; title: string }) => {
    return (
      <div
        class={cx(
          css({
            display: "grid",
            gridTemplateAreas: `
            "circle date"
            "circle content"
          `,
            justifyContent: "start",
            columnGap: "4",
            py: "4",
          }),
          "step",
        )}
      >
        <div
          class={css({
            position: "relative",
            gridArea: "circle",
            alignSelf: "stretch",
            my: "-4",
            display: "grid",
            placeItems: "center",
            _before: {
              content: '""',
              position: "absolute",
              h: "51%",
              w: "3px",
              bottom: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              bg: "border.default",
              ".step:first-child &": {
                display: "none",
              },
            },
            _after: {
              content: '""',
              position: "absolute",
              h: "50%",
              w: "3px",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              bg: "border.default",
              ".step:last-child &": {
                display: "none",
              },
            },
          })}
        >
          <div
            class={circle({
              size: "5",
              bg: "bg.default",
              borderWidth: "3",
              borderColor: "border.default",
              zIndex: "1",
            })}
          />
        </div>
        <span
          class={css({
            fontSize: "sm",
            color: "fg.muted",
            gridArea: "date",
          })}
        >
          {date}
        </span>
        <span
          class={css({
            gridArea: "content",
          })}
        >
          {title}
        </span>
      </div>
    );
  };

  return (
    <Section title="Timeline">
      <div>
        {events.map(({ date, title }) => (
          <Step date={date} title={title} />
        ))}
      </div>
    </Section>
  );
}

export default createRoute((c) => {
  return c.render(
    <div
      class={container({
        display: "grid",
        gap: "16",
        pt: "32",
        pb: "16",
        md: { pt: "56", gap: "32" },
      })}
    >
      <Profile />
      <Skills />
      <Timeline />
    </div>,
  );
});
