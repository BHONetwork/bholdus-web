import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import JsonLD from "./jsonLD";

import { constructOpenGraph } from "./utils";
import { SeoProps } from "./types";
import { DEFAULT_HOST } from "../../../constants/common";

const Seo = (props: SeoProps) => {
  const { locale, asPath } = useRouter();
  const { metadata, seoData = {}, globalSeoData = {} } = props;
  const url =
    locale === "en"
      ? `${DEFAULT_HOST}${asPath.split("?")[0]}`
      : `${DEFAULT_HOST}/${locale}${asPath.split("?")[0]}`;

  return (
    <>
      {metadata && (
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
      )}
      {seoData && (
        <JsonLD seoData={seoData} url={url} globalSeoData={globalSeoData} />
      )}
    </>
  );
};

export default Seo;
