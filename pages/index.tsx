import { GetStaticProps } from "next";
import ErrorPage from "next/error";

import Layout from "../components/layout.js";
import LandingPageHero from "../components/sections/landing-page-hero";
import Introduction from "../components/sections/introduction";
import TextSection from "../components/sections/text";
import ServiceSection from "../components/sections/service-section";
import RoadmapSection from "../components/sections/roadmap-section";
import UsecaseSection from "../components/sections/usecase-section";
import AdvisorSection from "../components/sections/advisor-section";
import TeamSection from "../components/sections/team-section";

import { fetchAPI, getLocale } from "../lib/api";
import LatestNewsSection from "../components/sections/latest-news-section";

const mapSections = {
  "sections.text-section": TextSection,
  "sections.services-section": ServiceSection,
  "sections.roadmap-section": RoadmapSection,
  "sections.use-cases-section": UsecaseSection,
};

const Home = ({ pageData, latestNews, global }) => {
  if (!pageData) {
    return <ErrorPage statusCode={404} />;
  }

  const Hero = () => <LandingPageHero data={pageData.hero} />;

  return (
    <Layout
      Hero={Hero}
      global={global}
      displayPageBackground={true}
      displayFooterBackground={false}
    >
      <Introduction data={pageData.introduction} />

      {pageData.sections.map((section: any) => {
        const { __component, ...rest } = section;
        const Section = mapSections[__component];

        return <Section data={rest} />;
      })}

      <AdvisorSection data={pageData.advisorsSection} />

      <TeamSection data={pageData.teamSection} />

      <LatestNewsSection articles={latestNews} />
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
