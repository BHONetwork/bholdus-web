import { getMediaUrl } from "../../../utils/media";
import { SeoData, Metadata } from "./types";

const constructDefaultOpenGraph = (metadata: Metadata) => {
  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    ...(metadata.sharedImage && {
      images: Object.values(metadata.sharedImage.formats).map((image) => {
        return {
          url: getMediaUrl(image.url),
          width: image.width,
          height: image.height,
          alt: metadata.sharedImage.alternativeText,
        };
      }),
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
