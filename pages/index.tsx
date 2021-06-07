import { GetStaticProps } from "next";
import ErrorPage from "next/error";

import Layout from "../components/layout";
import LandingPageHero from "../components/sections/landing-page-hero";
import Introduction from "../components/sections/introduction";
import TextSection from "../components/sections/text-section";
import ServiceSection from "../components/sections/service-section";
import RoadmapSection from "../components/sections/roadmap-section";
import UsecaseSection from "../components/sections/usecase-section";
import AdvisorSection from "../components/sections/advisor-section";
import TeamSection from "../components/sections/team-section";

import { fetchAPI, getLocale } from "../utils/api";
import LatestNewsSection from "../components/sections/latest-news-section";

const mapSections = {
  "sections.text-section": TextSection,
  "sections.services-section": ServiceSection,
  "sections.roadmap-section": RoadmapSection,
  "sections.use-cases-section": UsecaseSection,
  "sections.advisor-section": AdvisorSection,
  "sections.team-section": TeamSection,
};

const Home = ({ pageData, latestNews, global }) => {
  if (!pageData) {
    return <ErrorPage statusCode={404} />;
  }
  const enableLatestNews =
    pageData.latestNewsSection !== undefined &&
    pageData.latestNewsSection.enable
      ? true
      : false;

  const Hero = () => <LandingPageHero data={pageData.hero} />;

  return (
    <Layout
      Hero={Hero}
      global={global}
      displayPageBackground={true}
      displayFooterBackground={false}
    >
      <Introduction data={pageData.introduction} />

      {pageData.sections.map((section: any, index: number) => {
        const { __component, ...rest } = section;
        if (__component in mapSections) {
          const Section = mapSections[__component];

          return <Section key={index} data={rest} />;
        }
        return null;
      })}

      {enableLatestNews ? <LatestNewsSection articles={latestNews} /> : null}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = getLocale(context);

  const pageData = await fetchAPI(`/landing-page?_locale=${locale}`);
  const latestNews = await fetchAPI(
    `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&_limit=3`
  );

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }
  return {
    props: {
      pageData,
      latestNews,
    },
    revalidate: 1, // redo SSG in the background
  };
};

export default Home;
