import React from "react";
import { stringify } from "qs";
import useTranslation from "next-translate/useTranslation";
import getT from "next-translate/getT";
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

const articlesOfTopicQuery = ({
  isCount,
  locale,
  topicSlug,
  topicPageNumber,
}) =>
  stringify({
    status: "published",
    _sort: "publishedAt:desc",
    _locale: locale,
    "topics.slug": topicSlug,
    _limit: isCount ? undefined : PAGE_SIZE,
    _start: isCount ? undefined : (topicPageNumber - 1) * PAGE_SIZE + 1,
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
  topicName,
  isTopicDetailPage,
}) => {
  const router = useRouter();
  const { query, locale } = router;

  const translation = useTranslation();
  const { t } = translation;

  const Hero = () => (
    <BlogHero topicInfos={{ topics, currentTopic: topicName }} />
  );

  return (
    <>
      <Seo metadata={page.seo} seoData={{ type: "blog", data: page }} />
      <Layout
        Hero={Hero}
        global={global}
        topicInfos={{ topics, currentTopic: topicName }}
        containerClass="page-blog"
        mainClass={isTopicDetailPage ? "" : "page-blog"}
      >
        <div className="content-blog" id="content-blog">
          <div className="container">
            <FeatureArticle article={featuredArticle} />
            <ArticleList
              articles={articles}
              articlesCount={articlesCount}
              articleType={ARTICLE_TYPE_BLOG}
              pageNumberQuery={
                parseInt(
                  isTopicDetailPage ? query.slug[1] : (query.slug[0] as string),
                  10
                ) || 1
              }
              articleListClassName={
                isTopicDetailPage
                  ? "blog-article-items gap-8 sm:gap-y-8 sm:gap-x-8 md:gap-x-4 md:gap-y-6 lg:gap-6 xl:gap-x-20 xl:gap-y-12"
                  : ""
              }
              isfeaturedArticleAppear={!!featuredArticle}
              apiLoadMorePathFunc={({ nextPage }) =>
                isTopicDetailPage
                  ? `/articles?${articlesOfTopicQuery({
                      isCount: false,
                      locale,
                      topicSlug: topicName,
                      topicPageNumber: nextPage,
                    })}`
                  : `/articles?${articlesQuery({
                      isCount: false,
                      locale,
                      pageNumber: nextPage,
                    })}`
              }
              navigateLink={
                isTopicDetailPage ? `/blog/${topicName}/` : "/blog/"
              }
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

const topicDetailGetStaticProps = async ({
  ctx,
  topicSlug,
  topicPageNumber,
}) => {
  if (isNaN(topicPageNumber)) {
    return {
      redirect: { destination: `/blog/${topicSlug}`, permanent: false },
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
          topicPageNumber,
        })}`
      ),
      fetchAPI(
        `/articles/count?${articlesOfTopicQuery({
          isCount: true,
          locale,
          topicSlug,
          topicPageNumber,
        })}`
      ),
      // TODO: seo for topic page
      fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
    ]);

  const featuredArticle = featuredArticles[0] || null;

  return {
    props: {
      topics,
      articles: articlesOfTopic,
      featuredArticle,
      articlesCount: articlesCount - 1,
      topicName: topicSlug,
      page: pages[0] || null,
      isTopicDetailPage: true,
    },
    revalidate: 1, // redo SSG in the background
  };
};

const returnToBlogPage = {
  redirect: { destination: `/blog`, permanent: false },
};

const returnToTopicDetailPage = (topicSlug: string) => ({
  redirect: { destination: `/blog/${topicSlug}`, permanent: false },
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;

  if (params) {
    if (params.slug) {
      // NOTE: firstParam can be blog pageNumber or topicName
      const firstParam = params.slug[0];

      const blogPageNumber = parseInt(firstParam as string, 10);

      if (firstParam) {
        if (isNaN(blogPageNumber)) {
          // NOTE: user access /blog/{topicName}

          // NOTE: secondParam is topicPageNumber
          const secondParam = params.slug[1];

          if (secondParam) {
            let topicPageNumber = parseInt(secondParam as string, 10);
            if (isNaN(topicPageNumber)) {
              topicPageNumber = 1;
            }

            if (topicPageNumber === 1) {
              return returnToTopicDetailPage(firstParam);
            }
            // NOTE: fetch topic page here
            return await topicDetailGetStaticProps({
              ctx,
              topicSlug: firstParam,
              topicPageNumber,
            });
          }

          return await topicDetailGetStaticProps({
            ctx,
            topicSlug: firstParam,
            topicPageNumber: 1,
          });
        } else {
          if (blogPageNumber === 1) {
            return returnToBlogPage;
          }

          // NOTE: user access /blog/{pageNumber}
          const locale = getLocale(ctx);
          const t = await getT(locale, "common");

          const [topics, featuredArticles, articles, articlesCount, pages] =
            await Promise.all([
              fetchAPI(`/topics?_locale=${locale}`),
              fetchAPI(
                `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc&_limit=1`
              ),
              fetchAPI(
                `/articles?${articlesQuery({
                  isCount: false,
                  locale,
                  pageNumber: blogPageNumber,
                })}`
              ),
              fetchAPI(
                `/articles/count?${articlesQuery({
                  isCount: true,
                  locale,
                  pageNumber: blogPageNumber,
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
              topicName: t("common:news"),
              isTopicDetailPage: false,
            },
            revalidate: 1, // redo SSG in the background
          };
        }
      }

      return returnToBlogPage;
    }
    return returnToBlogPage;
  }
  return returnToBlogPage;
};

export default Blog;
