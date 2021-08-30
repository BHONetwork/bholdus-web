import React from "react";
import { stringify } from "qs";

import useTranslation from "next-translate/useTranslation";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Seo from "../../components/elements/seo";
import Layout from "../../components/layout";
import ArticleList from "../blog/ArticleList";

import { fetchAPI, getLocale } from "../../utils/api";

import { ARTICLE_TYPE_SEARCH, PAGE_SIZE } from "../../constants/common";

const articlesOfTopicQuery = ({ locale, pageNumber, q }) =>
  stringify({
    status: "published",
    _sort: "publishedAt:desc",
    _locale: locale,
    _limit: PAGE_SIZE,
    _start: (pageNumber - 1) * PAGE_SIZE,
    _q: q,
  });

const SearchResult = ({ articles, articlesCount, page, global }) => {
  const router = useRouter();
  const { query } = router;

  // const pageNumber = parseInt(query.page as string, 10);

  const translation = useTranslation();
  const { t } = translation;

  return (
    <>
      {/* TODO: seo page search */}
      <Seo metadata={page.seo} seoData={{ type: "blog", data: page }} />
      <Layout
        Hero={() => null}
        global={global}
        mainClass="bg-white search-container"
      >
        <div className="container">
          <div className="search-result-text">
            {t("common:searchResult")}:{" "}
            <span className="font-bold">
              {query.q} ({articlesCount === null ? 0 : articlesCount}{" "}
              {t("common:articles")})
            </span>
          </div>

          <ArticleList
            articles={articles}
            articlesCount={articlesCount}
            articleType={ARTICLE_TYPE_SEARCH}
            pageNumberQuery={parseInt(query.page as string, 10)}
            articleListClassName="searched-article-list"
            isfeaturedArticleAppear={false}
            apiLoadMorePathFunc={({ nextPage, locale }) =>
              `/articles?${articlesOfTopicQuery({
                locale,
                pageNumber: nextPage,
                q: query.q,
              })}`
            }
            navigateLink={`/search?q=${query.q}&page=`}
          />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { q, page } = query;

  const pageNumber = parseInt(page as string, 10);

  if (isNaN(pageNumber)) {
    return {
      redirect: {
        destination: `/search?q=${q}&page=1`,
        permanent: false,
      },
    };
  }

  const locale = getLocale(ctx);

  const [articles, articlesCount, pages] = await Promise.all([
    fetchAPI(`/articles?${articlesOfTopicQuery({ locale, pageNumber, q })}`),
    fetchAPI(
      `/articles/count?${articlesOfTopicQuery({ locale, pageNumber, q })}`
    ),
    // TODO: seo for topic page
    fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
  ]);

  return {
    props: {
      articles,
      articlesCount,
      page: pages[0] || null,
    },
  };
};

export default SearchResult;
