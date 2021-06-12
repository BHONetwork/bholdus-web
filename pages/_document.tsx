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
            name="keywords"
            content="Blockchain, DeFi, Real World DeFi, NFT, DApps, DeFi DApps, BHO, BHO token, BHO price, Crosschain, Digital Assets, DEX, Decentralized Exchange, Bholdus"
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
