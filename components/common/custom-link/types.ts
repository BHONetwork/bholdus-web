import React from "react";

type CustomLinkLink = {
  id?: string | number;
  url: string;
  asPath?: string;
  text?: string;
  newTab?: boolean;
};

export type CustomLinkProps = {
  link: CustomLinkLink;
  children?: React.ReactText | React.ReactElement;
  [other: string]: any;
};
