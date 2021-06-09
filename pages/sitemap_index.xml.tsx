import { GetServerSideProps } from "next";
import dayjs from "dayjs";

import supportedLocales from "../i18n/locales.json";

const SitemapIndex = () => {};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const host = req?.headers?.host || process.env.HOST;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${supportedLocales
        .map(
          (locale) => `<sitemap>
        <loc>${
          locale !== "en"
            ? `https://${host}/${locale}/sitemap.xml`
            : `https://${host}/sitemap.xml`
        }</loc>
        <lastmod>${dayjs().format("YYYY-MM-DD")}</lastmod>
      </sitemap>`
        )
        .join("")}
    </sitemapindex>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SitemapIndex;
