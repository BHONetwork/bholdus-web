import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import useTranslation from "next-translate/useTranslation";

import Image from "../../../components/elements/image";
import Seo from "../../../components/elements/seo";
import { fetchAPI, getLocale } from "../../../lib/api";
import { getMediaUrl } from "../../../lib/media";

import ssgPopularLocales from "../../../i18n/supportedPopularLocales.json";

const Article = ({ article }) => {
  const router = useRouter();
  const { t } = useTranslation();

  if (router.isFallback) {
    return <div />;
  }

  if (!article) {
    return <ErrorPage statusCode={404} />;
  }

  const imageUrl = getMediaUrl(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown source={article.content} escapeHtml={false} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.author?.picture && (
                <Image
                  media={article.author.picture || {}}
                  style={{
                    position: "static",
                    borderRadius: "50%",
                    height: 30,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              {article.author && (
                <p className="uk-margin-remove-bottom">
                  {t("common:byAuthor")} {article.author?.name || ""}
                </p>
              )}
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.reduce((acc, article) => {
      return acc.concat(
        ssgPopularLocales.map((locale) => ({
          params: {
            slug: article.slug,
          },
          locale,
        }))
      );
    }, []),
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  const locale = getLocale(ctx);
  const article = await fetchAPI(
    `/articles/${params.slug}?status=published&_locale=${locale}`
  );

  return {
    props: { article },
    revalidate: 60, // redo SSG in the background
  };
}

export default Article;
