import { styled } from "../../assets/css/stitches.config";

import Button from "../common/button";
import Image from "../common/image";
import Text from "../common/text";

const GreenBackground = styled("div", {
  background: "$green",
});

const BlogHero = ({ pageData, article }) => {
  return (
    <>
      <div className="container flex flex-row justify-center md:mt-40 mt-16">
        <Text type="h1" style={{ fontSize: "30px" }}>
          {pageData.title}
        </Text>
      </div>

      <div className="container md:mt-48 mt-16">
        <div className="flex flex-row">
          <GreenBackground className="min-w-3 p-10 md:pt-12 md:pb-14 md:pr-9 md:pl-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div className="flex flex-row items-center">
                <div
                  className="hidden md:block mr-2"
                  style={{ backgroundColor: "white", width: 40, height: 1 }}
                />
                <Text
                  className="mb-1 md:mb-0"
                  size="small"
                  weight="bold"
                  uppercase
                >
                  {article.topics[0].topic}
                </Text>
              </div>
              <div className="flex flex-row items-center">
                <Text weight="bold" style={{ fontSize: 14 }}>
                  {article.publishedAt}
                </Text>
              </div>
            </div>
            <Text
              className="mb-5"
              color="white"
              weight="bold"
              style={{ fontFamily: "Playfair Display", fontSize: 30 }}
            >
              {article.title}
            </Text>
            <Text className="mb-9" type="p">
              {article.description}
            </Text>
            <Button
              isLink
              button={{ url: `/blog/article/${article.slug}`, newTab: false }}
              type="secondary"
              border="rounded"
            >
              <Text color="green">Read more</Text>
            </Button>
          </GreenBackground>
          <Image
            className="hidden md:block"
            img={article.image}
            alt="article"
            style={{ maxHeight: 400 }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogHero;
