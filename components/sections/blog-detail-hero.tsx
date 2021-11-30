import useTranslation from "next-translate/useTranslation";

import { formatDate } from "../../utils/datetime";

const ArticleHero = ({ article }) => {
  const { t, lang } = useTranslation();

  return (
    <section id="banner">
      <div className="container">
        <div className="banner banner-topic">
          {article.topics[0] && (
            <p className="title-topic">{article.topics[0].topic} </p>
          )}
          <p className="title-banner">{article.title}</p>

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
