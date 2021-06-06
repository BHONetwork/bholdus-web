import { Enum } from "@martin_hotell/rex-tils";
import { CSSProperties } from "react";

export const TextTypes = Enum("h1", "h2", "h3", "h4", "h5", "h6", "div", "p");
export const TextColor = Enum("white", "grey", "lightGrey", "black", "green");
export const TextSize = Enum(
  "small",
  "normal",
  "medium",
  "xMedium",
  "large",
  "xLarge"
);
export const TextWeight = Enum("normal", "semiBold", "bold");

export type TextProps = {
  type?: Enum<typeof TextTypes>;
  uppercase?: boolean;
  color?: Enum<typeof TextColor>;
  size?: Enum<typeof TextSize>;
  weight?: Enum<typeof TextWeight>;
  children: React.ReactText;
  style?: CSSProperties;
  [other: string]: any;
};
