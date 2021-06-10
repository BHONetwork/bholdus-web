export type Page = {
  type: string;
  url: string;
  apiEndpoint?: string;
};

const siteMapConfig: Page[] = [
  {
    type: "dynamic-single-types",
    url: "", // homepage
    apiEndpoint: "/landing-page",
  },
  {
    type: "dynamic-collection-types",
    url: "/[slug]",
    apiEndpoint: "/pages?status=published",
  },
  {
    type: "dynamic-collection-types",
    url: "/blog/article/[slug]",
    apiEndpoint: "/articles?status=published",
  },
];

export default siteMapConfig;
