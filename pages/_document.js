import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-48x48.png"
          sizes="48x48"
          type="image/png"
        />
        <title>Account Book</title>
        <meta
          name="description"
          content="Simplifying finance management! AccountBook helps track income and expenses effortlessly, giving users a clear view of their financial situation."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
