import useTranslation from "next-translate/useTranslation";

import { styled } from "../../assets/css/stitches.config";
import { formatDate } from "../../utils/datetime";

import Button from "../common/button";
import Image from "../common/image";
import Text from "../common/text";

const Background = styled("div", {
  background: "$darkGrey2",
});

const BlogHero = ({ article }) => {
  const { t, lang } = useTranslation();

  if (!article) {
    return null;
  }

  return (
    <section className="container blog-hero">
      <Background className="blog-hero-left">
        <div className="blog-hero-content">
          <div className="blog-hero-header">
            <div className="blog-hero-topic">
              <div className="line" />
              {article.topics?.length > 0 && (
                <Text
                  className="blog-hero-topic-text"
                  size="small"
                  weight="bold"
                  uppercase
                >
                  {article.topics[0].topic}
                </Text>
              )}
            </div>
            <Text
              className="blog-hero-topic-time"
              weight="bold"
              style={{ fontSize: 14 }}
              capitalized
            >
              {formatDate(lang, article.publishedAt)}
            </Text>
          </div>
          <Text
            className="blog-hero-topic-title"
            color="white"
            weight="bold"
            style={{ fontSize: 30 }}
          >
            {article.title}
          </Text>
          <Text className="blog-hero-topic-description" type="p">
            {article.description}
          </Text>
        </div>
        <Button
          isLink
          button={{
            url: `/blog/article/${article.slug}`,
            newTab: false,
          }}
          buttonType="secondary"
          border="rounded"
        >
          <Text color="green">{t("common:readMore")}</Text>
        </Button>
      </Background>
      <Image
        className="hidden lg:block"
        img={article.image}
        alt="article"
        style={{ maxHeight: 400 }}
        lazy={false}
      />
    </section>
  );
};

export default BlogHero;
