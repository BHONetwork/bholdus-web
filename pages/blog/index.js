import React from "react";

import Articles from "../../components/sections/articles";
import Seo from "../../components/elements/seo";
import { fetchAPI, getLocale } from "../../lib/api";

const Blog = ({ articles, page }) => {
  return (
    <>
      <Seo seo={page.metadata} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{page.shortName}</h1>
          <Articles articles={articles} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(ctx) {
  const locale = getLocale(ctx);
  const [articles, categories, page] = await Promise.all([
    fetchAPI(
      `/articles?status=published&_locale=${locale}&_sort=publishedAt:desc`
    ),
    fetchAPI(`/categories?_locale=${locale}`),
    fetchAPI(`/pages?slug=blog&_locale=${locale}&status=published`),
  ]);

  return {
    props: { articles, categories, page },
    revalidate: 1, // redo SSG in the background
  };
}

export default Blog;
