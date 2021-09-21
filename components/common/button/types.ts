import { Enum } from "@martin_hotell/rex-tils";
import React, { CSSProperties } from "react";

export const ButtonColor = Enum("green", "pink", "orange", "purple");
export const ButtonType = Enum(
  "primary",
  "secondary",
  "darkBlue",
  "orange",
  "disabled"
);
export const ButtonBorder = Enum("rounded", "roundedMd");

type Button = {
  text?: string;
  url?: string;
  newTab?: boolean;
};

export type ButtonProps = {
  button?: Button;
  isLink?: boolean;
  loading?: boolean;
  color?: Enum<typeof ButtonColor>;
  buttonType?: Enum<typeof ButtonType>;
  border?: Enum<typeof ButtonBorder>;
  children?: React.ReactText | React.ReactElement;
  style?: CSSProperties;
  [other: string]: any;
};
