import ReactMarkdown from "react-markdown";

import Layout from "../../../components/layout";
import BlogDetailHero from "../../../components/sections/blog-detail-hero.tsx";

import Image from "../../../components/common/image";
import Text from "../../../components/common/text";

import { fetchAPI, getLocale } from "../../../lib/api";
import ssgPopularLocales from "../../../i18n/supportedPopularLocales.json";
import { isArray } from "lodash";

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

const LocalArticleDetail = ({ article }) => {
  const { content, image, topics, relatedArticles } = article;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mb-16">
        <Image img={image} className="mb-9" style={{ maxHeight: 500 }} />
        <ReactMarkdown
          className="article-content"
          source={content}
          escapeHtml={false}
        />
      </div>

      <div className="flex flex-row gap-1 mb-16">
        <Image
          img={{ url: "../../social_3_black.svg" }}
          src="../../social_3_black.svg"
          style={{ width: 28, height: 28 }}
        />
        <Image
          img={{ url: "../../social_2_black.svg" }}
          style={{ width: 28, height: 28 }}
        />
        <Image
          img={{ url: "../../social_1_black.svg" }}
          style={{ width: 28, height: 28 }}
        />
      </div>

      <div className="flex flex-col mb-20">
        <Text className="mb-6" size="medium" weight="bold" color="black">
          Tagged Topics
        </Text>
        <div className="flex flex-row flex-wrap">
          {topics.map((topic) => (
            <div
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

      {relatedArticles && isArray(relatedArticles) && (
        <div className="flex flex-col">
          <Text className="mb-6" size="medium" weight="bold" color="black">
            More stories
          </Text>
          <div className="grid grid-cols-3 gap-4">
            {relatedArticles.map((article) => (
              <LocalArticle article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Article = ({ article, global }) => {
  const Hero = () => <BlogDetailHero article={article} />;

  return (
    <Layout className="mt-14" Hero={Hero} global={global}>
      <LocalArticleDetail article={article} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles?status=published");

  return {
    paths: articles.reduce((acc, article) => {
      return acc.concat(
        ssgPopularLocales.map((locale) => ({
          params: {
            slug: article.slug,
          },
          locale,
        }))
      );
    }, []),
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
    revalidate: 60, // redo SSG in the background
  };
}

export default Article;
