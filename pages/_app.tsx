import App from "next/app";
import Head from "next/head";
import AOS from "aos";
import "intl-pluralrules";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Layout from "../components/layout";
import DefaultSeo from "../components/elements/seo/default-seo";

import { getMediaUrl } from "../utils/media";
import { fetchAPI, getLocale } from "../utils/api";
import "../assets/css/tailwind.css";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
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

  return (
    <>
      {/* Head */}
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {/* Favicon */}
        <link rel="shortcut icon" href={getMediaUrl(global.favicon.url)} />
      </Head>

      {/* Global site metadata. Acts as default SEO, can be overriden on a page by page basis if needed */}
      <DefaultSeo
        defaultSeo={global?.defaultSeo || {}}
        locale={router.locale}
      />

      {/* Render the actual page */}
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

MyApp.getInitialProps = async (ctx: any) => {
  const appProps = await App.getInitialProps(ctx);

  // Fetch global settings & supported languages
  const locale = getLocale(ctx?.ctx || {});
  const global = await fetchAPI(`/global?_locale=${locale}`);
  const supportedLocales = await fetchAPI("/i18n/locales");

  return {
    ...appProps,
    pageProps: { global: { ...global, supportedLocales } },
  };
};

export default MyApp;
