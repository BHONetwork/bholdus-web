import React from "react";
import { stringify } from "qs";

import { MdFilterDrama } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps, GetStaticPaths } from "next";

import Seo from "../../../components/elements/seo";
import Pagination from "../../../components/elements/pagination";
import Layout from "../../../components/layout";
import BlogHero from "../../../components/sections/blog-hero";
import Text from "../../../components/common/text";
import CustomLink from "../../../components/common/custom-link";
import { LocalArticle } from "../[page]";

import { fetchAPI, getLocale } from "../../../utils/api";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "../../../constants/common";

const TopicDetail = ({
  topics,
  articlesOfTopic,
  articlesCount,
  featuredArticle,
  page,
  global,
}) => {
  const router = useRouter();
  const topicSlug = router.query.slug[0];
  const pageNumber = parseInt(router.query.slug[1], 10);

  const translation = useTranslation();
  const { t } = translation;

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
          {articlesOfTopic && articlesOfTopic.length ? (
            <div className="blog-article-items gap-8 sm:gap-y-8 sm:gap-x-8 md:gap-x-4 md:gap-y-6 lg:gap-6 xl:gap-x-20 xl:gap-y-12">
              {articlesOfTopic.map((article: any) => (
                <CustomLink
                  key={article.id}
                  link={{ url: `/blog/article/${article.slug}` }}
                >
                  <LocalArticle article={article} translation={translation} />
                </CustomLink>
              ))}
            </div>
          ) : (
            !featuredArticle && (
              <div className="flex flex-col flex-1 justify-center items-center md:mb-20 mb-10">
                <MdFilterDrama size={200} />
                <Text size="medium" color="black">
                  {t("common:blogNoArticles")}
                </Text>
              </div>
            )
          )}

          <div className="pagination-wrapper md:mt-16">
            <Pagination
              totalPage={Math.ceil(articlesCount / PAGE_SIZE)}
              currentPage={pageNumber}
              numOfPageDisplay={5}
              generateNavigateLink={(page: number) =>
                `/blog/topic/${topicSlug}/${page}`
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

  const articlesOfTopicQuery = (isCount: boolean) =>
    stringify({
      status: "published",
      _sort: "publishedAt:desc",
      _locale: locale,
      "topics.slug": topicSlug,
      _limit: isCount ? undefined : PAGE_SIZE,
      _start: isCount ? undefined : (pageNumber - 1) * PAGE_SIZE + 1,
    });

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
      fetchAPI(`/articles?${articlesOfTopicQuery(false)}`),
      fetchAPI(`/articles/count?${articlesOfTopicQuery(true)}`),
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
