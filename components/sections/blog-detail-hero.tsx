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
    <section className="container md:mt-36 mt-24">
      <div className="flex flex-row">
        <Background className="flex flex-col items-center text-center p-10 md:pt-7 md:pb-5 md:pr-56 md:pl-56 w-full min-w-3">
          {article.topics?.length > 0 && (
            <Text className="mb-3" size="small" weight="bold" uppercase>
              {article.topics[0].topic}
            </Text>
          )}
          <Text className="md:mb-14 mb-4" type="h1">
            {article.title}
          </Text>
          <Text className="md:mb-14 mb-8" type="p">
            {article.description}
          </Text>
          <div
            className="mb-10"
            style={{ backgroundColor: "white", width: 40, height: 1 }}
          />
          <Text className="md:mb-5" type="p" capitalized={!article.author}>
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
      </div>
    </section>
  );
};

export default ArticleHero;
