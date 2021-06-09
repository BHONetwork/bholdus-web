import useTranslation from "next-translate/useTranslation";

import { styled } from "../../assets/css/stitches.config";
import { formatDate } from "../../utils/datetime";

import Button from "../common/button";
import Image from "../common/image";
import Text from "../common/text";

const GreenBackground = styled("div", {
  background: "$darkGrey2",
});

const BlogHero = ({ article }) => {
  const { t, lang } = useTranslation();

  if (!article) {
    return null;
  }

  return (
    <section className="container md:mt-36 mt-24">
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
              <Text weight="bold" style={{ fontSize: 14 }} capitalized>
                {formatDate(lang, article.publishedAt)}
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
            <Text color="green">{t("common:readMore")}</Text>
          </Button>
        </GreenBackground>
        <Image
          className="hidden lg:block w-3/5"
          img={article.image}
          alt="article"
          style={{ maxHeight: 400 }}
        />
      </div>
    </section>
  );
};

export default BlogHero;
