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
    <div className="blog-article-item">
      <div className="blog-article-item-cover">
        <Image className="blog-article-item-image" img={image} />
      </div>

      <Text className="blog-article-item-title" color="black" weight="bold">
        {title}
      </Text>
      <Text className="blog-article-item-description" color="black">
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
    <div className={classNames("blog-article", className)}>
      <div className="blog-article-category">
        <div className="blog-article-line" />
        <Text size="small" weight="bold" uppercase color="green">
          {topic}
        </Text>
      </div>

      <div className="blog-article-items">
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
      <Seo metadata={page.seo} seoData={{ type: "blog", data: page }} />
      <Layout Hero={Hero} global={global} mainClass="bg-white blog-container">
        <div className="container">
          {articlesByTopic ? (
            Object.keys(articlesByTopic).map((topic: any, index: number) => {
              return (
                <LocalArticles
                  key={index}
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
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = getLocale(ctx);
  const [topics, featuredArticles, pages] = await Promise.all([
    fetchAPI(`/topics?_locale=${locale}`),
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
    if (fetchedArticles?.length > 0) {
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
