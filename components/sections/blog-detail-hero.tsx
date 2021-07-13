import useTranslation from "next-translate/useTranslation";

import { styled } from "../../assets/css/stitches.config";
import { formatDate } from "../../utils/datetime";
import Text from "../common/text";

const Background = styled("div", {
  background: "$darkGrey2",
});

const ArticleHero = ({ article }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="container blog-hero-detail">
      <Background className="blog-hero-detail-wrap">
        {article.topics?.length > 0 && (
          <Text
            className="blog-hero-detail-topic"
            size="small"
            weight="bold"
            uppercase
          >
            {article.topics[0].topic}
          </Text>
        )}
        <Text className="blog-hero-detail-title" type="h1">
          {article.title}
        </Text>
        <Text className="blog-hero-detail-description" type="p">
          {article.description}
        </Text>
        <div className="blog-hero-detail-line" />
        <Text
          className="blog-hero-detail-meta"
          type="p"
          capitalized={!article.author}
        >
          {`${
            article.author
              ? `${t("common:articleByAuthor")} ${article.author.name} `
              : ""
          }${t("common:articleOnDatePublished")} ${formatDate(
            lang,
            article.publishedAt
          )}`}
        </Text>
      </Background>
    </section>
  );
};

export default ArticleHero;
