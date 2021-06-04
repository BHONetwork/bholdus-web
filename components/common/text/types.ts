import { Enum } from "@martin_hotell/rex-tils";
import { CSSProperties } from "react";

export const TextTypes = Enum("h1", "h2", "h3", "h4", "h5", "h6", "div", "p");
type TextTypes = Enum<typeof TextTypes>;

export const TextColor = Enum("white", "lightGrey", "black", "green");
type TextColor = Enum<typeof TextColor>;

export const TextSize = Enum(
  "small",
  "normal",
  "medium",
  "xMedium",
  "large",
  "xLarge"
);
type TextSize = Enum<typeof TextSize>;

export const TextWeight = Enum("normal", "semiBold", "bold");
type TextWeight = Enum<typeof TextWeight>;

export type TextProps = {
  type?: TextTypes;
  uppercase?: boolean;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  children: React.ReactText;
  style?: CSSProperties;
  [other: string]: any;
};
