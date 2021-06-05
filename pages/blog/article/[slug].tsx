import { isArray } from "lodash";

import Layout from "../../../components/layout";
import BlogDetailHero from "../../../components/sections/blog-detail-hero";
import ErrorPage from "../../404";

import Image from "../../../components/common/image";
import Text from "../../../components/common/text";
import RichText from "../../../components/common/rich-text";

import { fetchAPI, getLocale } from "../../../utils/api";
import ssgPopularLocales from "../../../i18n/supportedPopularLocales.json";

const LocalArticle = ({ article }) => {
  const { title, image } = article;
  return (
    <div key={article.id} className="flex flex-col text-left">
      <Image className="mb-3" img={image} style={{ maxHeight: 300 }} />
      <Text className="mb-3" color="black" weight="bold">
        {title}
      </Text>
    </div>
  );
};

const LocalArticleDetail = ({ article }) => {
  const { content, image, topics, relatedArticles } = article;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mb-16">
        <Image img={image} className="mb-9" style={{ maxHeight: 500 }} />
        <RichText children={content} />
      </div>

      <div className="flex flex-row gap-1 mb-16">
        <Image
          img={{ url: "../../images/facebook_black.svg" }}
          style={{ width: 28, height: 28 }}
        />
        <Image
          img={{ url: "../../images/instagram_black.svg" }}
          style={{ width: 28, height: 28 }}
        />
        <Image
          img={{ url: "../../images/telegram_black.svg" }}
          style={{ width: 28, height: 28 }}
        />
      </div>

      <div className="flex flex-col mb-20">
        <Text className="mb-6" size="medium" weight="bold" color="black">
          Tagged Topics
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
            More stories
          </Text>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col lg:space-y-0 space-y-10">
            {relatedArticles.articles.map((article: any) => (
              <LocalArticle key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Article = ({ article, global }) => {
  if (!article) {
    return (
      <Layout className="mt-14 mb-14" Hero={() => null} global={global}>
        <ErrorPage />
      </Layout>
    );
  }

  const Hero = () => <BlogDetailHero article={article} />;

  return (
    <Layout className="mt-14 mb-14" Hero={Hero} global={global}>
      <LocalArticleDetail article={article} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles?status=published");

  return {
    paths: articles
      ? articles.reduce((acc, article) => {
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
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  const locale = getLocale(ctx);
  const article = await fetchAPI(
    `/articles/${params.slug}?status=published&_locale=${locale}`
  );

  return {
    props: { article },
    revalidate: 1, // redo SSG in the background
  };
}

export default Article;
