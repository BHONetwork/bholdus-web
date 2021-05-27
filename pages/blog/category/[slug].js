import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Articles from "../../../components/sections/articles";
import Seo from "../../../components/elements/seo";
import { fetchAPI, getLocale } from "../../../lib/api";

import ssgPopularLocales from "../../../i18n/supportedPopularLocales.json";

const Category = ({ category }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div />;
  }

  if (!category) {
    return <ErrorPage statusCode={404} />;
  }

  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  };

  return (
    <>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.reduce((acc, category) => {
      return acc.concat(
        ssgPopularLocales.map((locale) => ({
          params: {
            slug: category.slug,
          },
          locale,
        }))
      );
    }, []),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  const locale = getLocale(ctx);
  const category = await fetchAPI(
    `/categories/${params.slug}?_locale=${locale}`
  );

  return {
    props: { category },
    revalidate: 60, // redo SSG in the background
  };
}

export default Category;
