import { DefaultSeo } from "next-seo";

import { getMediaUrl } from "../../../utils/media";

const defaultTitle = "Bholdus | Real World DeFi";
const defaultTitleTemplate = "%s | Real World DeFi";
const defaultDescription =
  "A blockchain dedicated to DeFi apps and NFTs with unprecedented transaction throughput and security";

const MyDefaultSeo = ({ defaultSeo, host, locale }) => {
  return (
    <DefaultSeo
      titleTemplate={defaultSeo?.metaTitleTemplate || defaultTitleTemplate}
      title={defaultSeo.metaTitle}
      defaultTitle={defaultTitle}
      description={defaultSeo.metaDescription || defaultDescription}
      openGraph={{
        url: locale === "en" ? host : `${host}/${locale}`,
        type: "website",
        site_name: defaultSeo.metaTitle || defaultTitle,
        locale: locale || "en",
        ...(defaultSeo?.sharedImage && {
          images: Object.values(defaultSeo.sharedImage.formats || {}).map(
            (image: any) => {
              return {
                url: getMediaUrl(image.url),
                width: image.width,
                height: image.height,
                alt: defaultSeo?.sharedImage?.alternativeText,
              };
            }
          ),
        }),
      }}
    />
  );
};

export default MyDefaultSeo;
