import useTranslation from "next-translate/useTranslation";
import OptimizedImage from "../../components/common/optimized-image";
import { formatDate } from "../../utils/datetime";
import Button from "../../components/common/button";

export const FeatureArticle = ({ article }) => {
  const { t, lang } = useTranslation();
  console.log(article);
  if (!article) return null;
  return (
    <div className="intro-blog">
      <div className="bg-intro">
        <OptimizedImage
          img={article.thumbnail ? article.thumbnail : article.image}
          lazy={true}
        />
      </div>
      <div className="info-intro">
        <p className="date">
          {formatDate(lang, article.publishedAt)} <span>|</span>{" "}
          {article.topics[0].topic}
        </p>
        <p className="title">{article.title}</p>
        <p className="desc">{article.description}</p>
        <Button
          isLink
          button={{
            url: `/blog/article/${article.slug}`,
            newTab: false,
          }}
          className="button"
        >
          <p>{t("common:readMore")}</p>
        </Button>
      </div>
    </div>
  );
};
