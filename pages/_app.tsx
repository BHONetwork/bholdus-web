import App from "next/app";
import Head from "next/head";
import AOS from "aos";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/layout";

import { getMediaUrl } from "../utils/media";
import { fetchAPI, getLocale } from "../utils/api";
import "aos/dist/aos.css";
import "../assets/css/tailwind.css";
import "../assets/css/github-markdown.css";
import "../assets/css/style.css";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <link rel="shortcut icon" href={getMediaUrl(global.favicon.url)} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Titillium+Web"
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
      {router.pathname !== "/404" ? (
        <Component {...pageProps} />
      ) : (
        <Layout Hero={() => null} global={global}>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
};

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const locale = getLocale(ctx?.ctx || {});
  const global = await fetchAPI(`/global?_locale=${locale}`);

  const supportedLocales = await fetchAPI("/i18n/locales");

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { global: { ...global, supportedLocales } },
  };
};

export default MyApp;
