import { parse, stringify } from "qs";
import { isArray } from "lodash";

export function getBackendUrl(path) {
  return `${process.env.BACKEND_URL}${path}`;
}

// Helper to make GET requests to Strapi
async function retryWithoutLocale(path, options) {
  const queryString = path.split("?")[1];
  const queryStringObj = parse(queryString);
  delete queryStringObj._locale;
  const newQueryString = stringify(queryStringObj);
  const newPath = `${path.split("?")[0]}?${newQueryString}`;
  return await fetchAPI(newPath, options);
}

export async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  const requestUrl = getBackendUrl(path);
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    if (response.status === 404 && path.indexOf("_locale=") !== -1) {
      return await retryWithoutLocale(path, options);
    }
    console.error(response.statusText);
    return null;
  }

  const data = (await response.json()) || null;

  if (isArray(data) && !data.length && path.indexOf("_locale=") !== -1) {
    return await retryWithoutLocale(path, options);
  }

  return data;
}

export async function getPageData(slug, preview = false) {
  // Find the pages that match this slug
  const pagesData = await fetchAPI(
    `/pages?slug=${slug}&status=published${preview ? "&status=draft" : ""}`
  );

  // Make sure we found something, otherwise return null
  if (pagesData == null || pagesData.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData[0];
}

export function getLocale(context) {
  const { locale, defaultLocale } = context;
  return locale || defaultLocale || "en";
}
