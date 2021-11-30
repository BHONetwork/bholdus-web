import React, { useEffect, useState } from "react";
import { MdFilterDrama } from "react-icons/md";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import classNames from "classnames";

import Button from "../../components/common/button";
import CustomLink from "../../components/common/custom-link";
import Text from "../../components/common/text";
import Pagination from "../../components/elements/pagination";

import { LocalArticle } from "./[page]";

import { isUAMobileMatch } from "../../utils/others";

import { ARTICLE_TYPE_SEARCH, PAGE_SIZE } from "../../constants/common";
import { fetchAPI } from "../../utils/api";

const PaginateWrapper = ({ children, pageNumber, totalPage }) => {
  const isMobile = navigator ? isUAMobileMatch(navigator.userAgent) : false;

  return (
    <div
      className={
        isMobile
          ? classNames("flex justify-center mt-8", {
              hidden: pageNumber >= totalPage,
            })
          : "pagination-wrapper md:mt-16"
      }
    >
      {children}
    </div>
  );
};

const PaginateWrapperNoSSR = dynamic(() => Promise.resolve(PaginateWrapper), {
  ssr: false,
});

const ArticleList = ({
  articles,
  articlesCount,
  articleType,
  pageNumberQuery,
  articleListClassName,
  isfeaturedArticleAppear,
  apiLoadMorePathFunc,
  navigateLink,
}) => {
  const isMobile =
    typeof navigator !== "undefined"
      ? isUAMobileMatch(navigator.userAgent)
      : false;

  // NOTE: for mobile loadmore
  const [articleList, setArticleList] = useState(isMobile ? articles : null);
  const displayArticles = isMobile ? articleList : articles;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [pageNumberMobile, setPageNumberMobile] = useState(pageNumberQuery);
  const pageNumber = isMobile ? pageNumberMobile : pageNumberQuery;

  // NOTE: -1 featuredArticletotalPage
  const totalPage = Math.ceil(
    (articlesCount - (isfeaturedArticleAppear ? 1 : 0)) / PAGE_SIZE
  );

  const translation = useTranslation();
  const { t } = translation;

  const LinkWrapper = ({ children, url }) =>
    articleType === ARTICLE_TYPE_SEARCH && !isMobile ? (
      children
    ) : (
      <CustomLink link={{ url }}>{children}</CustomLink>
    );

  useEffect(() => {
    setArticleList(articles);
  }, [articles]);

  const onClickLoadMore = () => {
    setIsLoadingMore(true);

    fetchAPI(apiLoadMorePathFunc({ nextPage: pageNumber + 1 })).then(
      (data: Array<object>) => {
        setPageNumberMobile(pageNumber + 1);
        setIsLoadingMore(false);
        if (data && data.length) {
          setArticleList(articleList.concat(data));
        }
      }
    );
  };

  return (
    <div className="list-post-blog">
      {displayArticles && displayArticles.length ? (
        <ul className="list-post">
          {displayArticles.map((article: any, index: number) => (
            <LinkWrapper key={article.id} url={`/blog/article/${article.slug}`}>
              <LocalArticle
                article={article}
                translation={translation}
                articleType={articleType}
                isMobile={isMobile}
              />
            </LinkWrapper>
          ))}
        </ul>
      ) : (
        !isfeaturedArticleAppear && (
          <div className="page-404">
            <MdFilterDrama size={200} />
            <p>{t("common:blogNoArticles")}</p>
          </div>
        )
      )}

      <PaginateWrapperNoSSR pageNumber={pageNumber} totalPage={totalPage}>
        {isMobile ? (
          <Button
            button={{ text: "Load more" }}
            className="loadmore"
            loading={isLoadingMore}
            onClick={onClickLoadMore}
          />
        ) : (
          <Pagination
            totalPage={totalPage}
            currentPage={pageNumber}
            numOfPageDisplay={5}
            generateNavigateLink={(page: number) => `${navigateLink}${page}`}
          />
        )}
      </PaginateWrapperNoSSR>
    </div>
  );
};

export default ArticleList;
