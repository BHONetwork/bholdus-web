import { styled } from "../../assets/css/stitches.config";
import Text from "../common/text";

const GreenBackground = styled("div", {
  background: "$green",
});

const ArticleHero = ({ article }) => {
  return (
    <div className="container md:mt-96 mt-10">
      <div className="flex flex-row">
        <GreenBackground className="flex flex-col items-center text-center p-10 md:pt-7 md:pb-5 md:pr-56 md:pl-56 w-full min-w-3">
          <Text className="mb-3" size="small" weight="bold" uppercase>
            {article.topics[0].topic}
          </Text>
          <Text className="md:mb-14 mb-4" type="h1">
            {article.title}
          </Text>
          <Text className="md:mb-14 mb-8" type="p">
            {article.description}
          </Text>
          <div
            className="mb-3"
            style={{ backgroundColor: "white", width: 40, height: 1 }}
          />
          <Text className="md:mb-9" type="p">
            {`By ${article.author.name} on ${article.publishedAt}`}
          </Text>
        </GreenBackground>
      </div>
    </div>
  );
};

export default ArticleHero;
