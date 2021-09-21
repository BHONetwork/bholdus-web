import { GetStaticProps } from "next";

import Layout from "../components/layout";
import LandingPageHero from "../components/sections/landing-page-hero";
import Introduction from "../components/sections/introduction";
import TextSection from "../components/sections/text-section";
import ServiceSection from "../components/sections/service-section";
import RoadmapSection from "../components/sections/roadmap-section";
import UsecaseSection from "../components/sections/usecase-section";
import AdvisorSection from "../components/sections/advisor-section";
import TeamSection from "../components/sections/team-section";
import LatestNewsSection from "../components/sections/latest-news-section";
import ContactSection from "../components/sections/contact-section";
import PartnerSection from "../components/sections/partner-section";
import PressSection from "../components/sections/press-section";
import NotableStatisticsSection from "../components/sections/notable-statistics";
import AboutTokenSection from "../components/sections/about-token";
import TokenDistributionSection from "../components/sections/token-distribution";
import FAQSection from "../components/sections/faq-section";
import {
  ABOUT_NOTABLE_STATISTICS_SECTION_DATA,
  ABOUT_NOTABLE_STATISTICS_SECTION_KEY,
  ABOUT_TOKEN_SECTION_DATA,
  ABOUT_TOKEN_SECTION_KEY,
  ABOUT_DISTRIBUTION_SECTION_KEY,
  ABOUT_DISTRIBUTION_SECTION_DATA,
  ABOUT_FAQ_SECTION_KEY,
  ABOUT_FAQ_SECTION_DATA,
} from "../constants/extraSections";
import { fetchAPI, getLocale } from "../utils/api";

const mapSections = {
  "sections.text-section": TextSection,
  "sections.services-section": ServiceSection,
  "sections.roadmap-section": RoadmapSection,
  "sections.use-cases-section": UsecaseSection,
  "sections.advisor-section": AdvisorSection,
  "sections.team-section": TeamSection,
  "sections.contact-section": ContactSection,
  "sections.latest-news": LatestNewsSection,
  "sections.partner-section": PartnerSection,
  "sections.press-section": PressSection,
  [ABOUT_TOKEN_SECTION_KEY]: AboutTokenSection,
  [ABOUT_DISTRIBUTION_SECTION_KEY]: TokenDistributionSection,
  [ABOUT_FAQ_SECTION_KEY]: FAQSection,
  [ABOUT_NOTABLE_STATISTICS_SECTION_KEY]: NotableStatisticsSection,
};

const Home = ({ pageData, latestNews, global }) => {
  const Hero = () => <LandingPageHero data={pageData.hero} />;
  const extraPageDataSections = [...pageData.sections];
  extraPageDataSections.splice(
    3,
    0,
    ABOUT_NOTABLE_STATISTICS_SECTION_DATA,
    ABOUT_TOKEN_SECTION_DATA,
    ABOUT_DISTRIBUTION_SECTION_DATA,
    ABOUT_FAQ_SECTION_DATA
  );

  return (
    <Layout Hero={Hero} global={global} transparentNavbar={true}>
      {pageData.introduction && pageData.introduction.enable && (
        <Introduction data={pageData.introduction} />
      )}

      {extraPageDataSections.map((section: any, index: number) => {
        const { __component, ...rest } = section;
        if (__component in mapSections && section.enable) {
          const Section = mapSections[__component];
          if (__component === "sections.latest-news")
            return <Section key={index} data={rest} articles={latestNews} />;
          return <Section key={index} data={rest} />;
        }
        return null;
      })}
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
    return { notFound: true };
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
