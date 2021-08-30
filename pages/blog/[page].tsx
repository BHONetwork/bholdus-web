import React from "react";
import classNames from "classnames";
import { stringify } from "qs";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import Seo from "../../components/elements/seo";
import Layout from "../../components/layout";
import BlogHero from "../../components/sections/blog-hero";
import Text from "../../components/common/text";
import Image from "../../components/common/image";
import CustomLink from "../../components/common/custom-link";
import OptimizedImage from "../../components/common/optimized-image";
import ArticleList from "./ArticleList";

import { fetchAPI, getLocale } from "../../utils/api";
import { formatDate } from "../../utils/datetime";

import {
  ARTICLE_TYPE_BLOG,
  ARTICLE_TYPE_SEARCH,
  PAGE_SIZE,
} from "../../constants/common";

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
  const { title, description, image, publishedAt, slug } = article;

  const TextWrapper = ({ children }) =>
    articleType === ARTICLE_TYPE_SEARCH ? (
      <div className="text-wrapper">{children}</div>
    ) : (
      children
    );

  return (
    <div
      className={classNames("blog-article-item", {
        searched: articleType === ARTICLE_TYPE_SEARCH,
      })}
    >
      <div className="blog-article-item-cover">
        <Image className="blog-article-item-image" img={image} />
      </div>

      <TextWrapper>
        <Text className="blog-article-item-title" color="black" weight="bold">
          {title}
        </Text>
        <Text className="blog-article-item-description" color="black">
          {description}
        </Text>
        <Text color="black" weight="bold" style={{ fontSize: 14 }} capitalized>
          {formatDate(lang, publishedAt)}
        </Text>
        {articleType === ARTICLE_TYPE_SEARCH && !isMobile && (
          <CustomLink link={{ url: `/blog/article/${slug}` }}>
            <div className="blog-article-item-read-action">
              <Text color="green">Read this article </Text>
              <OptimizedImage
                className="blog-article-item-read-action-icon"
                img={{
                  url: "/images/right_arrow_green.svg",
                  alternativeText: "right-arrow",
                }}
                width={25}
                height={25}
              />
            </div>
          </CustomLink>
        )}
      </TextWrapper>
    </div>
  );
};

// const LocalArticles = ({ topic, articles, className = "", translation }) => {
//   return (
//     <div className={classNames("blog-article", className)}>
//       <div className="blog-article-category">
//         <div className="blog-article-line" />
//         <Text size="small" weight="bold" uppercase color="green">
//           {topic}
//         </Text>
//       </div>

//       <div className="blog-article-items">
//         {articles.map((article: any) => (
//           <CustomLink
//             key={article.id}
//             link={{ url: `/blog/article/${article.slug}` }}
//           >
//             <LocalArticle article={article} translation={translation} />
//           </CustomLink>
//         ))}
//       </div>
//     </div>
//   );
// };

export const TopicList = ({
  className = "",
  topicInfos,
  setMobileBlogMenuIsShown,
}) => {
  const translation = useTranslation();

  if (topicInfos) {
    const { topics, currentTopic } = topicInfos;
    if (topics && topics.length) {
      const { t } = translation;

      return (
        <div
          className={classNames(
            "topic-list flex flex-row flex-wrap justify-center gap-x-12 gap-y-4 pb-3 sm:pd-3 md:pd-6 bg-white",
            className
          )}
        >
          <CustomLink link={{ url: "/blog" }}>
            <Text
              className={classNames(
                currentTopic === t("common:blog")
                  ? ["border-b-2", "border-black"]
                  : null
              )}
              weight={currentTopic === t("common:blog") ? "bold" : "normal"}
              color="black"
            >
              {t("common:blog")}
            </Text>
          </CustomLink>

          {topics.map((topic: any, index: number) => {
            return (
              <CustomLink
                key={`topic-navigate-${topic.slug}-${index}`}
                link={{ url: `/blog/topic/${topic.slug}/1` }}
                onClick={() => setMobileBlogMenuIsShown(false)}
              >
                <Text
                  className={classNames(
                    currentTopic === topic.slug
                      ? ["border-b-2", "border-black"]
                      : null
                  )}
                  color="black"
                  weight={currentTopic === topic.slug ? "bold" : "normal"}
                >
                  {topic.topic}
                </Text>
              </CustomLink>
            );
          })}
        </div>
      );
    }
  }

  return null;
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

  const Hero = () => <BlogHero article={featuredArticle} />;

  return (
    <>
      <Seo metadata={page.seo} seoData={{ type: "blog", data: page }} />
      <Layout
        Hero={Hero}
        global={global}
        topicInfos={{ topics, currentTopic: t("common:blog") }}
        mainClass="bg-white blog-container"
      >
        <div className="container">
          <ArticleList
            articles={articles}
            articlesCount={articlesCount}
            articleType={ARTICLE_TYPE_BLOG}
            pageNumberQuery={parseInt(query.page as string, 10)}
            articleListClassName="blog-article-items gap-8 sm:gap-y-8 sm:gap-x-8 md:gap-x-4 md:gap-y-6 lg:gap-6 xl:gap-x-20 xl:gap-y-12"
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
