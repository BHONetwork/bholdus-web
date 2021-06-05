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

      {article && (
        <div className="container md:mt-48 mt-16">
          <div className="flex flex-row justify-center">
            <GreenBackground className="flex flex-col justify-between p-10 lg:pt-12 lg:pb-14 lg:pr-9 lg:pl-20 w-full md:w-8/12 lg:w-2/5">
              <div>
                <div className="flex lg:flex-row lg:justify-between items-center flex-col mb-8">
                  <div className="flex lg:flex-row flex-col-reverse items-center">
                    <div
                      className="block lg:mr-2 lg:mb-0 mb-4"
                      style={{
                        backgroundColor: "white",
                        width: 40,
                        height: 1,
                      }}
                    />
                    <Text
                      className="mb-2 lg:mb-0"
                      size="small"
                      weight="bold"
                      uppercase
                    >
                      {article.topics[0].topic}
                    </Text>
                  </div>
                  <Text weight="bold" style={{ fontSize: 14 }}>
                    {article.publishedAt}
                  </Text>
                </div>
                <Text
                  className="mb-5 oneline-text multiline-ellipsi text-center lg:text-left"
                  color="white"
                  weight="bold"
                  style={{ fontSize: 30 }}
                >
                  {article.title}
                </Text>
                <Text
                  className="mb-9 h-20 threeline-text multiline-ellipsi text-center lg:text-left"
                  type="p"
                >
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
                <Text color="green">Read more</Text>
              </Button>
            </GreenBackground>
            <Image
              className="hidden lg:block w-3/5"
              img={article.image}
              alt="article"
              style={{ maxHeight: 400 }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogHero;
