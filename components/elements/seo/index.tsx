import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import JsonLD from "./jsonLD";

import { constructOpenGraph } from "./utils";
import { SeoProps } from "./types";

const Seo = (props: SeoProps) => {
  const { locale } = useRouter();
  const { metadata, seoData = {} } = props;

  if (!metadata) return null;

  return (
    <>
      <NextSeo
        titleTemplate={metadata.metaTitleTemplate || "%s | Real World DeFi"}
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        openGraph={constructOpenGraph(metadata, seoData, locale)}
      />
      <JsonLD seoData={seoData} locale={locale} />
    </>
  );
};

export default Seo;
