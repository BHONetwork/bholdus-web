import { GetStaticPaths, GetStaticProps } from "next";

import Seo from "../components/elements/seo";
import Layout from "../components/layout";
import NotFoundPage from "./404";
import PageHero from "../components/sections/page-hero";
import RichTextSection from "../components/sections/rich-text-section";
import ContentCollapsibleSection from "../components/sections/content-collapsible-section";

import { fetchAPI, getLocale } from "../utils/api";
import { getSeoData } from "../components/elements/seo/utils";
import popularLocales from "../i18n/popularLocales.json";

const mapSections = {
  "sections.rich-text-section": RichTextSection,
  "sections.collapsible-items-section": ContentCollapsibleSection,
};

const Page = ({ page, global }) => {
  if (!page) {
    return <NotFoundPage global={global} />;
  }

  const Hero = () => <PageHero page={page} />;

  return (
    <>
      <Seo metadata={page.seo} seoData={getSeoData(page)} />
      <Layout Hero={Hero} global={global} mainClass="bg-white">
        {page.sections.map((section: any, index: number) => {
          const { __component, ...rest } = section;
          if (__component in mapSections && section.enable) {
            const Section = mapSections[__component];

            return <Section key={index} data={rest} />;
          }
          return null;
        })}
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchAPI("/pages?status=published");

  const paths = pages
    .filter((page: any) => page.slug !== "blog")
    .reduce((acc: any, page: any) => {
      return acc.concat(
        popularLocales.map((locale) => ({
          params: { slug: [page.slug] },
          locale,
        }))
      );
    }, []);
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const locale = getLocale(ctx);
  const page = await fetchAPI(
    `/pages/${params.slug}?status=published&_locale=${locale}`
  );

  return {
    props: { page },
    revalidate: 1, // redo SSG in the background
  };
};

export default Page;
