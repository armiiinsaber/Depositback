import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style={{margin:0,padding:0,background:'#08121f'}}>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PMG1FCF45T"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PMG1FCF45T');
        `}} />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          html, body, #__next { margin: 0 !important; padding: 0 !important; background: #08121f !important; overflow-x: hidden; }
        `}</style>
      </Head>
      <body style={{margin:0,padding:0,background:'#08121f'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
