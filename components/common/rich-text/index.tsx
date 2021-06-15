import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import Image from "./image";
import Paragraph from "./paragraph";

import { RichTextProps } from "./types";

const RichText = (props: RichTextProps) => {
  const { className = "", skipHtml = false, ...restProps } = props;
  return (
    <ReactMarkdown
      className={classNames("markdown-body", className)}
      linkTarget="_blank"
      skipHtml={skipHtml}
      components={{ img: Image, p: Paragraph }}
      {...restProps}
    />
  );
};

export default RichText;
