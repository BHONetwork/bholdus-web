import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="keywords"
            content="Blockchain, DeFi, Real World DeFi, NFTs, DApps, DeFi DApps, BHO, BHO token, BHO price, Crosschain, Digital Assets, DEX, Decentralized Exchange, Bholdus"
          />
          <meta
            name="facebook-domain-verification"
            content="fsziqyuede69feaju8ag82bg45qa55"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(I,n,f,o,b,i,p){I[b]=I[b]||function(){(I[b].q=I[b].q||[]).push(arguments)};
            I[b].t=1*new Date();i=n.createElement(f);i.async=1;i.src=o;
            p=n.getElementsByTagName(f)[0];p.parentNode.insertBefore(i,p)})
            (window,document,'script','https://livechat.infobip.com/widget.js','liveChat');
            
            liveChat('init', '9807e206-fc76-45fa-ad55-e9fbabe8ed9c');
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
