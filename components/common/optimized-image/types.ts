import { Enum } from "@martin_hotell/rex-tils";

export const LayoutType = Enum("fill", "fixed", "intrinsic", "responsive");

export type ImageProps = {
  className?: string;
  img: {
    url: string;
    alternativeText?: string;
  };
  width?: number;
  height?: number;
  layout?: Enum<typeof LayoutType>;
  [other: string]: any;
};
