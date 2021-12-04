import useTranslation from "next-translate/useTranslation";
import { GetStaticPaths, GetStaticProps } from "next";
import { stringify } from "qs";

import Seo from "../../../components/elements/seo";
import Layout from "../../../components/layout";
import BlogDetailHero from "../../../components/sections/blog-detail-hero";

import Image from "../../../components/common/image";
import RichText from "../../../components/common/rich-text";
import CustomLink from "../../../components/common/custom-link";
import ShareSocials from "../../../components/sections/share-socials";

import { fetchAPI, getLocale } from "../../../utils/api";
import popularLocales from "../../../i18n/popularLocales.json";
import { formatDate } from "../../../utils/datetime";
const LocalArticle = ({ article }) => {
  const { t, lang } = useTranslation();
  const { title, image } = article;
  return (
    <li className="item-post">
      <div className="wrap-img">
        <CustomLink
          key={article.id}
          link={{ url: `/blog/article/${article.slug}` }}
          className="link-item"
        >
          <Image img={image} />
        </CustomLink>
      </div>
      <div className="wrap-content">
        <p className="date">
          {formatDate(lang, article.publishedAt)} <span>|</span>{" "}
          {article.topics[0].topic}
        </p>
        <p className="title">
          <CustomLink
            key={article.id}
            link={{ url: `/blog/article/${article.slug}` }}
            className="link-item"
          >
            {title}
          </CustomLink>
        </p>
      </div>
    </li>
  );
};

const LocalArticleDetail = ({ article, relatedArticles, t }) => {
  const { content, image, topics } = article;

  return (
    <section id="content-blog-detail">
      <div className="container">
        <div className="article">
          <Image img={image} className="mb-9" style={{ maxHeight: 500 }} />
          <RichText className="container" children={content} />
        </div>
        {topics?.length > 0 && (
          <div className="tagged-topics">
            <p className="title">{t("common:articleTopics")}</p>
            <div className="hashtags-social">
              <div className="hashtags">
                {topics.map((topic: any) => (
                  <CustomLink
                    key={topic.id}
                    link={{ url: `/blog/topic/${topic.slug}` }}
                    className="link-tag"
                  >
                    <span>{topic.topic}</span>
                  </CustomLink>
                ))}
              </div>
              <div className="social">
                <ShareSocials types={["facebook", "telegram"]} />
              </div>
            </div>
          </div>
        )}

        {relatedArticles?.length > 0 && (
          <div className="more-stories">
            <div className="title"> {t("common:articleRelated")}</div>
            <ul className="list-post">
              {relatedArticles.map((article: any, index) => (
                <LocalArticle article={article} key={index} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

const Article = ({ article, relatedArticles, metadata, global }) => {
  const { t } = useTranslation();

  const Hero = () => <BlogDetailHero article={article} />;

  return (
    <>
      <Seo
        metadata={metadata}
        seoData={{ type: "blog-post", data: article }}
        globalSeoData={global.defaultSeo}
      />
      <Layout
        Hero={Hero}
        global={global}
        mainClass="bg-white"
        containerClass="page-blog"
      >
        <LocalArticleDetail
          article={article}
          relatedArticles={relatedArticles}
          t={t}
        />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchAPI("/articles?status=published");

  return {
    paths: articles
      ? articles.reduce((acc: any, article: any) => {
          return acc.concat(
            popularLocales.map((locale) => ({
              params: {
                slug: article.slug,
              },
              locale,
            }))
          );
        }, [])
      : [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const locale = getLocale(ctx);
  const [article, page] = await Promise.all([
    fetchAPI(`/articles/${params.slug}?status=published&_locale=${locale}`),
    fetchAPI(`/pages/blog?_locale=${locale}&status=published`),
  ]);

  if (!article) {
    return { notFound: true };
  }

  const metadata = article
    ? article.metadata
      ? {
          ...article.metadata,
          metaTitleTemplate: page?.seo?.metaTitleTemplate || "%s",
        }
      : {
          metaTitle: article?.title || "",
          metaDescription: article?.description || "",
          metaTitleTemplate: page?.seo?.metaTitleTemplate || "%s",
          sharedImage: article?.image || {},
        }
    : null;

  let relatedArticles = [];

  if (article?.relatedArticles?.random === false) {
    relatedArticles = article.relatedArticles.articles;
  } else if (article) {
    const query = stringify({
      id_nin: article.id,
      status: "published",
      _locale: locale,
      _limit: 3,
      "topics.id_in": article.topics.map((topic: any) => topic.id),
    });
    relatedArticles = await fetchAPI(`/articles?${query}`);
  }

  return {
    props: { article, relatedArticles, metadata },
    revalidate: 1, // redo SSG in the background
  };
};

export default Article;
