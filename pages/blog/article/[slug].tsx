import { isArray } from "lodash";
import useTranslation from "next-translate/useTranslation";
import { GetStaticPaths, GetStaticProps } from "next";

import Layout from "../../../components/layout";
import NotFoundPage from "../../404";
import BlogDetailHero from "../../../components/sections/blog-detail-hero";

import Image from "../../../components/common/image";
import Text from "../../../components/common/text";
import RichText from "../../../components/common/rich-text";
import CustomLink from "../../../components/common/custom-link";

import { fetchAPI, getLocale } from "../../../utils/api";
import ssgPopularLocales from "../../../i18n/supportedPopularLocales.json";
import ShareSocials from "../../../components/sections/share-socials";

const LocalArticle = ({ article }) => {
  const { title, image } = article;
  return (
    <div className="flex flex-col text-left">
      <Image className="mb-3" img={image} style={{ maxHeight: 300 }} />
      <Text className="mb-3" color="black" weight="bold">
        {title}
      </Text>
    </div>
  );
};

const LocalArticleDetail = ({ article, t }) => {
  const { content, image, topics, relatedArticles } = article;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mb-16">
        <Image img={image} className="mb-9" style={{ maxHeight: 500 }} />
        <RichText children={content} />
      </div>

      <ShareSocials types={["facebook", "telegram"]} />

      <div className="flex flex-col mb-20">
        <Text className="mb-6" size="medium" weight="bold" color="black">
          {t("common:articleTopics")}
        </Text>
        <div className="flex flex-row flex-wrap">
          {topics.map((topic: any) => (
            <div
              key={topic.id}
              className="py-4 px-14 mr-2 mb-2"
              style={{ border: "1px solid #000000", borderRadius: "2px" }}
            >
              <Text size="medium" color="black" weight="semiBold">
                {topic.topic}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {relatedArticles && isArray(relatedArticles.articles) && (
        <div className="flex flex-col">
          <Text className="mb-6" size="medium" weight="bold" color="black">
            {t("common:articleRelated")}
          </Text>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col lg:space-y-0 space-y-10">
            {relatedArticles.articles.map((article: any) => (
              <CustomLink
                key={article.id}
                link={{ url: `/blog/article/${article.slug}` }}
              >
                <LocalArticle article={article} />
              </CustomLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Article = ({ article, global }) => {
  const { t } = useTranslation();

  if (!article) {
    return (
      <Layout className="mt-14 mb-14" Hero={() => null} global={global}>
        <NotFoundPage />
      </Layout>
    );
  }

  const Hero = () => <BlogDetailHero article={article} />;

  return (
    <Layout className="mt-14 mb-14" Hero={Hero} global={global}>
      <LocalArticleDetail article={article} t={t} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchAPI("/articles?status=published");

  return {
    paths: articles
      ? articles.reduce((acc: any, article: any) => {
          return acc.concat(
            ssgPopularLocales.map((locale) => ({
              params: {
                slug: article.slug,
              },
              locale,
            }))
          );
        }, [])
      : [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const locale = getLocale(ctx);
  const article = await fetchAPI(
    `/articles/${params.slug}?status=published&_locale=${locale}`
  );

  return {
    props: { article },
    revalidate: 1, // redo SSG in the background
  };
};

export default Article;
