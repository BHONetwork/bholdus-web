import React from "react";
import classNames from "classnames";
import { MdFilterDrama } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps } from "next";

import Seo from "../../components/elements/seo";
import Layout from "../../components/layout";
import BlogHero from "../../components/sections/blog-hero";
import Text from "../../components/common/text";
import Image from "../../components/common/image";
import CustomLink from "../../components/common/custom-link";

import { fetchAPI, getLocale } from "../../utils/api";
import { formatDate } from "../../utils/datetime";

const LocalArticle = ({ article, translation }) => {
  const { lang } = translation;
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
      <Text color="black" weight="bold" style={{ fontSize: 14 }} capitalized>
        {formatDate(lang, publishedAt)}
      </Text>
    </div>
  );
};

const LocalArticles = ({ topic, articles, className = "", translation }) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <div className="flex flex-row items-center mb-7">
        <div
          className="mr-2"
          style={{ backgroundColor: "#00B871", width: 40, height: 1 }}
        />
        <Text size="small" weight="bold" uppercase color="green">
          {topic}
        </Text>
      </div>

      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 lg:gap-6 md:gap-4 flex flex-col md:space-y-0 space-y-10">
        {articles.map((article: any) => (
          <CustomLink
            key={article.id}
            link={{ url: `/blog/article/${article.slug}` }}
          >
            <LocalArticle article={article} translation={translation} />
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

const Blog = ({ articlesByTopic, featuredArticle, page, global }) => {
  const translation = useTranslation();
  const { t } = translation;

  const Hero = () => <BlogHero article={featuredArticle} />;

  return (
    <>
      <Seo metadata={page.seo} host={global.host} />
      <Layout className="md:mt-20 mt-10" Hero={Hero} global={global}>
        {articlesByTopic ? (
          Object.keys(articlesByTopic).map((topic: any, index: number) => {
            return (
              <LocalArticles
                key={index}
                className="md:mb-20 mb-10 last:mb-0"
                topic={topic}
                articles={articlesByTopic[topic]}
                translation={translation}
              />
            );
          })
        ) : (
          <div className="flex flex-col flex-1 justify-center items-center md:mb-20 mb-10">
            <MdFilterDrama size={200} />
            <Text size="medium" color="black">
              {t("common:noArticles")}
            </Text>
          </div>
        )}
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = getLocale(ctx);
  const [topics, featuredArticles, pages] = await Promise.all([
    fetchAPI(`/topics`),
    fetchAPI(
      `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&_limit=1`
    ),
    fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
  ]);
  const featuredArticle = featuredArticles[0] || null;

  let articlesByTopic = null;
  for (let topicItem of topics) {
    const { id, topic } = topicItem;
    const fetchedArticles = await fetchAPI(
      `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&topics.id=${id}&_limit=3`
    );
    if (fetchedArticles && fetchedArticles.length > 0) {
      if (!articlesByTopic) {
        articlesByTopic = {};
      }
      articlesByTopic[topic] = articlesByTopic[topic]
        ? articlesByTopic[topic].push(fetchedArticles)
        : fetchedArticles;
    }
  }

  return {
    props: { articlesByTopic, featuredArticle, page: pages[0] || null },
    revalidate: 1, // redo SSG in the background
  };
};

export default Blog;
