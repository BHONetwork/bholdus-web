import React from "react";
import { stringify } from "qs";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import Seo from "../../../components/elements/seo";
import Layout from "../../../components/layout";
import BlogHero from "../../../components/sections/blog-hero";

import ArticleList from "../ArticleList";

import { fetchAPI, getLocale } from "../../../utils/api";

import { ARTICLE_TYPE_BLOG, PAGE_SIZE } from "../../../constants/common";

const articlesOfTopicQuery = ({ isCount, locale, topicSlug, pageNumber }) =>
  stringify({
    status: "published",
    _sort: "publishedAt:desc",
    _locale: locale,
    "topics.slug": topicSlug,
    _limit: isCount ? undefined : PAGE_SIZE,
    _start: isCount ? undefined : (pageNumber - 1) * PAGE_SIZE + 1,
  });

const TopicDetail = ({
  topics,
  articlesOfTopic,
  articlesCount,
  featuredArticle,
  page,
  global,
}) => {
  const router = useRouter();
  const { locale } = router;
  const topicSlug = router.query.slug[0];

  const Hero = () => <BlogHero article={featuredArticle} />;

  return (
    <>
      {/* TODO: seo for topic page */}
      <Seo metadata={page.seo} seoData={{ type: "blog", data: page }} />
      <Layout
        Hero={Hero}
        global={global}
        topicInfos={{ topics, currentTopic: topicSlug }}
        mainClass="bg-white blog-container"
      >
        <div className="container">
          <ArticleList
            articles={articlesOfTopic}
            articlesCount={articlesCount}
            articleType={ARTICLE_TYPE_BLOG}
            pageNumberQuery={parseInt(router.query.slug[1], 10)}
            articleListClassName="blog-article-items gap-8 sm:gap-y-8 sm:gap-x-8 md:gap-x-4 md:gap-y-6 lg:gap-6 xl:gap-x-20 xl:gap-y-12"
            isfeaturedArticleAppear={!!featuredArticle}
            apiLoadMorePathFunc={({ nextPage }) =>
              `/articles?${articlesOfTopicQuery({
                isCount: false,
                locale,
                topicSlug,
                pageNumber: nextPage,
              })}`
            }
            navigateLink={`/blog/topic/${topicSlug}/`}
          />
        </div>
      </Layout>
    </>
  );
};

// TODO: getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // const pages = await fetchAPI("/pages?status=published");

  // const paths = pages
  //   .filter((page: any) => page.slug !== "blog")
  //   .reduce((acc: any, page: any) => {
  //     return acc.concat(
  //       popularLocales.map((locale) => ({
  //         params: { slug: [page.slug] },
  //         locale,
  //       }))
  //     );
  //   }, []);
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const topicSlug = params.slug[0];
  const pageNumber = parseInt(params.slug[1], 10);

  if (isNaN(pageNumber)) {
    return {
      redirect: { destination: `/blog/topic/${topicSlug}/1`, permanent: false },
    };
  }

  const locale = getLocale(ctx);

  const featuredArticleQuery = stringify({
    status: "published",
    _sort: "publishedAt:desc",
    _locale: locale,
    _limit: 1,
    "topics.slug": topicSlug,
  });

  const [topics, featuredArticles, articlesOfTopic, articlesCount, pages] =
    await Promise.all([
      fetchAPI(`/topics?_locale=${locale}`),
      fetchAPI(`/articles?${featuredArticleQuery}`),
      fetchAPI(
        `/articles?${articlesOfTopicQuery({
          isCount: false,
          locale,
          topicSlug,
          pageNumber,
        })}`
      ),
      fetchAPI(
        `/articles/count?${articlesOfTopicQuery({
          isCount: true,
          locale,
          topicSlug,
          pageNumber,
        })}`
      ),
      // TODO: seo for topic page
      fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
    ]);

  const featuredArticle = featuredArticles[0] || null;

  return {
    props: {
      topics,
      articlesOfTopic,
      featuredArticle,
      articlesCount: articlesCount - 1,
      page: pages[0] || null,
    },
    revalidate: 1, // redo SSG in the background
  };
};

export default TopicDetail;
