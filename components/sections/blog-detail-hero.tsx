import useTranslation from "next-translate/useTranslation";

import { formatDate } from "../../utils/datetime";
import Breadcrumb from "../elements/breadcrumb";

const generateArticleBreadcrumbList = ({ article, t }) => {
  if (article) {
    const { topics } = article;

    if (topics && topics[0]) {
      return [
        { link: "/", label: t("common:homepage") },
        {
          link: `/blog/${topics[0].slug}`,
          label: topics[0].topic,
        },
      ];
    }

    return [];
  }
  return [];
};

const ArticleHero = ({ article }) => {
  const { t, lang } = useTranslation();

  return (
    <section id="banner">
      <div className="container">
        <div className="banner banner-topic">
          <Breadcrumb
            className="breadcrumb-article"
            breadcrumbList={generateArticleBreadcrumbList({ article, t })}
          />
          <h1 className="title-banner">{article.title}</h1>

          <p className="title-description">{article.description}</p>
          <p className="blog-hero-detail-meta">
            {`${
              article.author
                ? `${t("common:articleByAuthor")} ${article.author.name} `
                : ""
            }${t("common:articleOnDatePublished")} ${formatDate(
              lang,
              article.publishedAt
            )}`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
