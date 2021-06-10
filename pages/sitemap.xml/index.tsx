import { GetServerSideProps } from "next";
import dayjs from "dayjs";

import sitemapConfig, { Page } from "../../constants/sitemap.config";

import { fetchAPI, getLocale } from "../../utils/api";
import supportedLocales from "../../i18n/locales.json";

const Sitemap = () => {};

const getUrls = async (
  host: string,
  mainLocale: string,
  allLocales: string[],
  page: Page
) => {
  const { type, url, apiEndpoint } = page;
  switch (type) {
    case "dynamic-single-types": {
      const item = await fetchAPI(
        apiEndpoint.indexOf("?") !== -1
          ? `${apiEndpoint}&_locale=${mainLocale}`
          : `${apiEndpoint}?_locale=${mainLocale}`
      );
      if (item) {
        const mainUrl =
          mainLocale === "en"
            ? `https://${host}${url}`
            : `https://${host}/${mainLocale}${url}`;
        return `
        <url>
          <loc>${mainUrl}</loc>
          ${allLocales
            .map((locale) =>
              locale === mainLocale
                ? `<xhtml:link rel="alternate" hreflang="${locale}" href="${mainUrl}" />`
                : `<xhtml:link rel="alternate" hreflang="${locale}" href="${`https://${host}/${locale}${url}`}" />`
            )
            .join("")}
          <lastmod>${dayjs(item.updated_at).format("YYYY-MM-DD")}</lastmod>
        </url>`;
      }
      return [];
    }

    case "dynamic-collection-types": {
      const items = await fetchAPI(
        apiEndpoint.indexOf("?") !== -1
          ? `${apiEndpoint}&_locale=${mainLocale}`
          : `${apiEndpoint}?_locale=${mainLocale}`
      );
      return items
        .map((item: any) => {
          const mainUrl =
            mainLocale === "en"
              ? `https://${host}${url.replace("[slug]", item.slug)}`
              : `https://${host}/${mainLocale}${url.replace(
                  "[slug]",
                  item.slug
                )}`;
          return `
            <url>
              <loc>${mainUrl}</loc>
              ${allLocales
                .map((locale) =>
                  locale === mainLocale
                    ? `<xhtml:link rel="alternate" hreflang="${locale}" href="${mainUrl}" />`
                    : `<xhtml:link rel="alternate" hreflang="${locale}" href="${`https://${host}/${locale}${url.replace(
                        "[slug]",
                        item.slug
                      )}`}" />`
                )
                .join("")}
              <lastmod>${dayjs(item.updated_at).format("YYYY-MM-DD")}</lastmod>
            </url>`;
        })
        .join("");
    }

    case "static": {
      const mainUrl =
        mainLocale === "en"
          ? `https://${host}${url}`
          : `https://${host}/${mainLocale}${url}`;
      return `
        <url>
          <loc>${mainUrl}</loc>
          ${allLocales
            .map((locale) =>
              locale === mainLocale
                ? `<xhtml:link rel="alternate" hreflang="${locale}" href="${mainUrl}" />`
                : `<xhtml:link rel="alternate" hreflang="${locale}" href="${`https://${host}/${locale}${url}`}" />`
            )
            .join("")}
        </url>`;
    }

    default:
      return [];
  }
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const locale = getLocale(ctx);
  const host = req?.headers?.host || process.env.HOST;

  const urls = await Promise.all(
    sitemapConfig.map(async (page) => {
      return await getUrls(host, locale, supportedLocales, page);
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${urls.join("")}
    </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
