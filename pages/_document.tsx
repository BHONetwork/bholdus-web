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
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          /> */}
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
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG}');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            <iframe
              title="google tag"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG}`}
              height="0"
              width="0"
              className="google-tag"
            ></iframe>
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
