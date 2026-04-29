import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; background: #08121f; overflow-x: hidden; }
        `}</style>
      </Head>
      <body style={{ margin: 0, padding: 0, background: '#08121f' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
