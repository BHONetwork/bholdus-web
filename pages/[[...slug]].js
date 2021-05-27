import ErrorPage from "next/error";
import { useRouter } from "next/dist/client/router";

import Seo from "../components/elements/seo";
import Sections from "../components/sections/sections";
import { getBackendUrl, fetchAPI, getLocale } from "../lib/api";

import ssgPopularLocales from "../i18n/supportedPopularLocales.json";

const DynamicPage = ({ sections, metadata, preview }) => {
  const router = useRouter();

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />;
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>;
  }

  return (
    <>
      <Seo metadata={metadata} />
      <Sections sections={sections} preview={preview} />
    </>
  );
};

export async function getStaticPaths() {
  const pages = await (await fetch(getBackendUrl("/pages"))).json();
  const paths = pages
    .filter((page) => page.slug !== "blog")
    .reduce((acc, page) => {
      const slugArray = page.slug.split("__");
      return acc.concat(
        ssgPopularLocales.map((locale) => ({
          params: { slug: slugArray },
          locale,
        }))
      );
    }, []);
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { params, preview = null } = context;
  const locale = getLocale(context);

  // Fetch pages. Include drafts if preview mode is on
  const slug = params?.slug || "";
  let pageData;
  if (preview) {
    pageData = (
      await fetchAPI(`/pages?slug=${slug}&_locale=${locale}&status=draft`)
    )[0];
  } else {
    pageData = (
      await fetchAPI(`/pages?slug=${slug}&_locale=${locale}&status=published`)
    )[0];
  }

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  const { contentSections, metadata } = pageData;
  return {
    props: {
      preview,
      sections: contentSections,
      metadata,
    },
    revalidate: 60, // redo SSG in the background
  };
}

export default DynamicPage;
