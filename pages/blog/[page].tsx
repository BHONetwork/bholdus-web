import React from "react";
import { stringify } from "qs";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import Seo from "../../components/elements/seo";
import Layout from "../../components/layout";
import BlogHero from "../../components/sections/blog-hero";
import Image from "../../components/common/image";
import ArticleList from "./ArticleList";
import FeatureArticle from "./FeatureArticle";
import { fetchAPI, getLocale } from "../../utils/api";
import { formatDate } from "../../utils/datetime";

import {
  ARTICLE_TYPE_BLOG,
  ARTICLE_TYPE_SEARCH,
  PAGE_SIZE,
} from "../../constants/common";
import CustomLink from "../../components/common/custom-link";

const articlesQuery = ({ isCount, locale, pageNumber }) =>
  stringify({
    status: "published",
    _sort: "publishedAt:desc",
    _locale: locale,
    _limit: isCount ? undefined : PAGE_SIZE,
    _start: isCount ? undefined : (pageNumber - 1) * PAGE_SIZE + 1,
  });

export const LocalArticle = ({
  article,
  translation,
  articleType = ARTICLE_TYPE_BLOG,
  isMobile = false,
}) => {
  const { lang } = translation;
  const { title, description, image, publishedAt } = article;
  const LinkWrapper = ({ children, url, className }) =>
    articleType === ARTICLE_TYPE_SEARCH && !isMobile ? (
      children
    ) : (
      <CustomLink link={{ url }} className={className}>
        {children}
      </CustomLink>
    );
  return (
    <LinkWrapper
      key={article.id}
      url={`/blog/article/${article.slug}`}
      className="link-item"
    >
      <div className="wrap-img">
        <Image className="blog-article-item-image" img={image} />
      </div>
      <div className="wrap-content">
        <p className="date">{formatDate(lang, publishedAt)}</p>
        <div className="title">{title}</div>
        <p className="desc">{description}</p>
      </div>
    </LinkWrapper>
  );
};

const Blog = ({
  topics,
  featuredArticle,
  articles,
  articlesCount,
  page,
  global,
}) => {
  const router = useRouter();
  const { query, locale } = router;

  const translation = useTranslation();
  const { t } = translation;

  const Hero = () => (
    <BlogHero topicInfos={{ topics, currentTopic: t("common:news") }} />
  );

  return (
    <>
      <Seo metadata={page.seo} seoData={{ type: "blog", data: page }} />
      <Layout
        Hero={Hero}
        global={global}
        topicInfos={{ topics, currentTopic: t("common:news") }}
        containerClass="page-blog"
        mainClass="page-blog"
      >
        <div className="content-blog" id="content-blog">
          <div className="container">
            <FeatureArticle article={featuredArticle} />
            <ArticleList
              articles={articles}
              articlesCount={articlesCount}
              articleType={ARTICLE_TYPE_BLOG}
              pageNumberQuery={parseInt(query.page as string, 10)}
              articleListClassName=""
              isfeaturedArticleAppear={!!featuredArticle}
              apiLoadMorePathFunc={({ nextPage }) =>
                `/articles?${articlesQuery({
                  isCount: false,
                  locale,
                  pageNumber: nextPage,
                })}`
              }
              navigateLink="/blog/"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

// TODO: getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // const pages = await fetchAPI("/pages?status=published");
  // const articlesCount = await fetchAPI(
  //   `/articles/count?${articlesQuery({
  //     isCount: true,
  //     locale: "en",
  //     pageNumber,
  //   })}`
  // );

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
  const pageNumber = parseInt(params.page as string, 10);

  if (isNaN(pageNumber)) {
    return {
      redirect: { destination: `/blog/1`, permanent: false },
    };
  }

  const locale = getLocale(ctx);

  const [topics, featuredArticles, articles, articlesCount, pages] =
    await Promise.all([
      fetchAPI(`/topics?_locale=${locale}`),
      fetchAPI(
        `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&_limit=1`
      ),
      fetchAPI(
        `/articles?${articlesQuery({ isCount: false, locale, pageNumber })}`
      ),
      fetchAPI(
        `/articles/count?${articlesQuery({
          isCount: true,
          locale,
          pageNumber,
        })}`
      ),
      fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
    ]);

  const featuredArticle = featuredArticles[0] || null;

  return {
    props: {
      topics,
      featuredArticle,
      articles,
      articlesCount,
      page: pages[0] || null,
    },
    revalidate: 1, // redo SSG in the background
  };
};

export default Blog;
