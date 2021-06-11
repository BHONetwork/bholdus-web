import { BlogJsonLd, ArticleJsonLd, FAQPageJsonLd } from "next-seo";

import { getMediaUrl } from "../../../utils/media";

const BlogJsonLD = ({ data, url }) => {
  return (
    <BlogJsonLd
      url={url}
      title={data.seo.metaTitle}
      images={Object.values(data.seo.sharedImage.formats).map((image: any) =>
        getMediaUrl(image.url)
      )}
      datePublished={data.created_at}
      dateModified={data.updated_at}
      authorName={[]}
      description={data.seo.metaDescription}
    />
  );
};

const BlogPostJsonLD = ({ data, url, globalSeoData }) => {
  return (
    <ArticleJsonLd
      url={url}
      title={data.title}
      images={Object.values(data.image.formats).map((image: any) =>
        getMediaUrl(image.url)
      )}
      datePublished={data.publishedAt}
      dateModified={data.updated_at}
      authorName={[data.author.name]}
      publisherName={globalSeoData.metaTitleTemplate.replace(
        "%s",
        globalSeoData.metaTitle
      )}
      publisherLogo={globalSeoData.sharedImage.url}
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

const JsonLD = ({ seoData, url, globalSeoData }) => {
  const { type = "", data } = seoData;
  switch (type) {
    case "blog":
      return <BlogJsonLD data={data} url={url} />;
    case "blog-post":
      return (
        <BlogPostJsonLD data={data} url={url} globalSeoData={globalSeoData} />
      );
    case "faq":
      return <FAQPageJsonLD data={data} />;
    default:
      return null;
  }
};

export default JsonLD;
