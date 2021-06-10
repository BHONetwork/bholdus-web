import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import JsonLD from "./jsonLD";

import { constructOpenGraph } from "./utils";
import { SeoProps } from "./types";

const Seo = (props: SeoProps) => {
  const { locale, asPath } = useRouter();
  const { metadata, seoData = {}, host } = props;
  const url =
    locale === "en"
      ? `${host}${asPath.split("?")[0]}`
      : `${host}/${locale}${asPath.split("?")[0]}`;

  if (!metadata) return null;

  return (
    <>
      <NextSeo
        titleTemplate={metadata.metaTitleTemplate || "%s | Real World DeFi"}
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        openGraph={{
          ...constructOpenGraph(metadata, seoData),
          url,
          locale: locale || "en",
        }}
      />
      <JsonLD seoData={seoData} url={url} />
    </>
  );
};

export default Seo;
