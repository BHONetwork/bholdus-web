import { BlogJsonLd, FAQPageJsonLd } from "next-seo";

import { getMediaUrl } from "../../../utils/media";

const BlogJsonLD = ({ data, url }) => {
  return (
    <BlogJsonLd
      url={url}
      title={data.title}
      images={Object.values(data.image.formats).map((image: any) =>
        getMediaUrl(image.url)
      )}
      datePublished={data.publishedAt}
      dateModified={data.updated_at}
      authorName={[data.author.name]}
      description={data.description}
    />
  );
};

const FAQPageJsonLD = ({ data }) => {
  return (
    <FAQPageJsonLd
      mainEntity={data.map((item: any) => ({
        questionName: item.title,
        acceptedAnswerText: item.content,
      }))}
    />
  );
};

const JsonLD = ({ seoData, url }) => {
  const { type = "", data } = seoData;
  switch (type) {
    case "blog":
      return <BlogJsonLD data={data} url={url} />;
    case "faq":
      return <FAQPageJsonLD data={data} />;
    default:
      return null;
  }
};

export default JsonLD;
