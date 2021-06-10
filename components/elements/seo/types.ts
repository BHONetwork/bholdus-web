import { Enum } from "@martin_hotell/rex-tils";

export type Metadata = {
  metaTitleTemplate?: string;
  metaTitle?: string;
  metaDescription?: string;
  sharedImage: {
    alternativeText?: string;
    formats?: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
};

export const SeoDataType = Enum("blog", "faq");
export type SeoData = {
  type?: Enum<typeof SeoDataType>;
  data?: any;
};

export type SeoProps = {
  metadata: Metadata;
  seoData?: SeoData;
  host?: string;
};
