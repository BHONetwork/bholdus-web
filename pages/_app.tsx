import App from "next/app";
import Head from "next/head";
import AOS from "aos";
import "intl-pluralrules";
import { useRouter } from "next/router";
import { useEffect } from "react";

import DefaultSeo from "../components/elements/seo/default-seo";

import { fetchAPI, getLocale } from "../utils/api";
import "../assets/css/tailwind.css";
import "../styles/main.scss";
import * as ga from "../utils/ga";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });

    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Prevent Next.js behavior when it tries to render the [[...slug]] route

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* Global site metadata. Acts as default SEO, can be overriden on a page by page basis if needed */}
      <DefaultSeo
        defaultSeo={global?.defaultSeo || {}}
        locale={router.locale}
      />

      {/* Render the actual page */}
      <Component {...pageProps} />
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
