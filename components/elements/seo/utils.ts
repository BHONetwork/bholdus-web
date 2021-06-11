import { getMediaUrl } from "../../../utils/media";
import { SeoData, Metadata } from "./types";

/**
 * OG data
 */

const constructDefaultOpenGraph = (metadata: Metadata) => {
  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    ...(metadata.sharedImage && {
      images: [
        {
          url: getMediaUrl(metadata.sharedImage.url),
          width: metadata.sharedImage.width,
          height: metadata.sharedImage.height,
        },
      ],
    }),
  };
};

export const constructOpenGraph = (metadata: Metadata, seoData: SeoData) => {
  const { type = "" } = seoData;

  const defaultOpenGraph = constructDefaultOpenGraph(metadata);
  let openGraphData = {};

  switch (type) {
    default:
      openGraphData = {};
  }
  return {
    ...defaultOpenGraph,
    ...openGraphData,
  };
};

/**
 * Seo data
 */

export const getSeoData = (page: any): any => {
  if (page.slug === "faq") {
    return {};
    // const faqData = page.sections.find(
    //   (section: any) =>
    //     section.__component === "sections.collapsible-items-section"
    // )?.collapsibleItems;
    // if (faqData) {
    //   return { type: "faq", data: faqData };
    // }
  }
  return {};
};
