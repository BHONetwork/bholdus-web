import { DefaultSeo } from "next-seo";
import { DEFAULT_HOST } from "../../../constants/common";

import { getMediaUrl } from "../../../utils/media";

const defaultTitle = "Bholdus | Real World DeFi";
const defaultTitleTemplate = "%s | Real World DeFi";
const defaultDescription =
  "A blockchain dedicated to DeFi apps and NFTs with unprecedented transaction throughput and security";

const MyDefaultSeo = ({ defaultSeo, locale }) => {
  return (
    <DefaultSeo
      titleTemplate={defaultSeo?.metaTitleTemplate || defaultTitleTemplate}
      title={defaultSeo.metaTitle}
      defaultTitle={defaultTitle}
      description={defaultSeo.metaDescription || defaultDescription}
      openGraph={{
        site_name: defaultSeo.metaTitle || defaultTitle,

        // Will be possibly overridden on a page by page basis if needed
        url: locale === "en" ? DEFAULT_HOST : `${DEFAULT_HOST}/${locale}`,
        type: "website",
        locale: locale || "en",
        ...(defaultSeo?.sharedImage && {
          images: [
            {
              url: getMediaUrl(defaultSeo.sharedImage.url),
              width: defaultSeo.sharedImage.width,
              height: defaultSeo.sharedImage.height,
            },
          ],
        }),
      }}
    />
  );
};

export default MyDefaultSeo;
