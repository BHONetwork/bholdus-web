import App from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

import { getMediaUrl } from "../lib/media";
import { fetchAPI, getLocale } from "../lib/api";

import "../assets/css/style.css";

const MyApp = ({ Component, pageProps }) => {
  // Prevent Next.js behavior when it tries to render the [[...slug]] route
  const router = useRouter();
  if (router.asPath === "/[[...slug]]") {
    return null;
  }

  const { global } = pageProps;
  if (global == null) {
    return null;
  }

  const seoShareImageFormats = global.defaultSeo?.shareImage?.formats || {};

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="shortcut icon" href={getMediaUrl(global.favicon.url)} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${global.defaultSeo.metaTitle}`}
        title={global.defaultSeo.metaTitle}
        description={global.defaultSeo.metaDescription}
        openGraph={{
          images: Object.values(seoShareImageFormats).map((image: any) => {
            return {
              url: getMediaUrl(image.url),
              width: image.width,
              height: image.height,
            };
          }),
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const locale = getLocale(ctx?.ctx || {});
  const global = await fetchAPI(`/global`);

  const supportedLocales = await fetchAPI("/i18n/locales");

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { global: { ...global, supportedLocales } },
  };
};

export default MyApp;
