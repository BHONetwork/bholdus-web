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
import TokenomicSection from "../components/sections/tokenomic-section";
import { fetchAPI, getLocale } from "../utils/api";
import { useState } from "react";
import dynamic from "next/dynamic";
const ReactModalVideo = dynamic(() => import("react-modal-video"), {
  ssr: false,
});

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
  "sections.tokenomic-section": TokenomicSection,
};

const Home = ({ pageData, latestNews, global }) => {
  const [displayIntroductionVideo, setDisplayIntroductionVideo] =
    useState(false);
  const setDisplayVideo = (show) => {
    if (show) document.querySelector("body").classList.add("noscroll");
    else document.querySelector("body").classList.remove("noscroll");
    setDisplayIntroductionVideo(show);
  };
  const ModalVideo = () =>
    pageData.introduction &&
    pageData.introduction.enable &&
    pageData.introduction.introductionVideoLink && (
      <ReactModalVideo
        channel="youtube"
        autoplay={1}
        allowFullScreen={true}
        isOpen={displayIntroductionVideo}
        videoId={pageData.introduction.introductionVideoLink}
        onClose={() => setDisplayVideo(false)}
      />
    );
  const Hero = () => <LandingPageHero data={pageData.hero} />;
  return (
    <Layout
      Hero={Hero}
      global={global}
      transparentNavbar={true}
      containerClass="page-home"
      videobg={true}
      ModalVideo={ModalVideo}
    >
      {pageData.introduction && pageData.introduction.enable && (
        <Introduction
          data={pageData.introduction}
          setDisplayVideo={setDisplayVideo}
        />
      )}

      {pageData.sections.map((section: any, index: number) => {
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
    `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&_limit=6`
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
