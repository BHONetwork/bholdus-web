import React from "react";
import classnames from "classnames";

import Layout from "../../components/layout";
import BlogHero from "../../components/sections/blog-hero";
import Text from "../../components/common/text";
import Image from "../../components/common/image";
import CustomLink from "../../components/elements/custom-link";

import { fetchAPI, getLocale } from "../../lib/api";

const LocalArticle = ({ article }) => {
  const { title, description, image, publishedAt } = article;
  return (
    <div className="flex flex-col text-left">
      <Image className="mb-3" img={image} style={{ maxHeight: 300 }} />
      <Text className="mb-3" color="black" weight="bold">
        {title}
      </Text>
      <Text className="mb-3" color="black">
        {description}
      </Text>
      <Text
        color="lightGrey"
        color="black"
        weight="bold"
        style={{ fontSize: 14 }}
      >
        {publishedAt}
      </Text>
    </div>
  );
};

const LocalArticles = ({ topic, articles, className }) => {
  return (
    <div className={classnames("flex flex-col", className)}>
      <div className="flex flex-row items-center mb-7">
        <div
          className="mr-2"
          style={{ backgroundColor: "#00B871", width: 40, height: 1 }}
        />
        <Text size="small" weight="bold" uppercase color="green">
          {topic}
        </Text>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col lg:space-y-0 space-y-16">
        {articles.map((article) => (
          <CustomLink link={{ url: `/blog/article/${article.slug}` }}>
            <LocalArticle article={article} />
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

const Blog = ({ articlesByTopic, featuredArticle, pageData, global }) => {
  const Hero = () => <BlogHero pageData={pageData} article={featuredArticle} />;
  return (
    <Layout className="mt-20" Hero={Hero} global={global}>
      {Object.keys(articlesByTopic).map((topic) => {
        return (
          <LocalArticles
            className="md:mb-20 mb-10"
            topic={topic}
            articles={articlesByTopic[topic]}
          />
        );
      })}
    </Layout>
  );
};

export async function getStaticProps(ctx) {
  const locale = getLocale(ctx);
  const [topics, featuredArticles, pageData] = await Promise.all([
    fetchAPI(`/topics`),
    fetchAPI(
      `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&_limit=1`
    ),
    fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
  ]);
  const featuredArticle = featuredArticles[0] || null;

  const articlesByTopic = {};
  for (let topicItem of topics) {
    const { id, topic } = topicItem;
    const fetchedArticles = await fetchAPI(
      `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&topics.id=${id}&_limit=3`
    );
    articlesByTopic[topic] = articlesByTopic[topic]
      ? articlesByTopic[topic].push(fetchedArticles)
      : fetchedArticles;
  }

  return {
    props: { articlesByTopic, featuredArticle, pageData: pageData[0] || null },
    revalidate: 1, // redo SSG in the background
  };
}

export default Blog;
