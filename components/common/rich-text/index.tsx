import classNames from "classnames";
import ReactMarkdown from "react-markdown";

import { RichTextProps } from "./types";

const RichText = (props: RichTextProps) => {
  const { className = "", skipHtml = false, ...restProps } = props;
  return (
    <ReactMarkdown
      className={classNames("markdown-body", className)}
      linkTarget="_blank"
      skipHtml={skipHtml}
      {...restProps}
    />
  );
};

export default RichText;
