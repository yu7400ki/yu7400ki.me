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
      <Timeline />
    </div>,
  );
});
