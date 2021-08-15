import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import highlight from "rehype-highlight";
import remark2rehype from "remark-rehype";
import remarkSlug from "remark-slug";
import Image from "./image";
import Paragraph from "./paragraph";

const MarkDown = (props) => {
  const { className = "", skipHtml = false, ...restProps } = props;
  return (
    <ReactMarkdown
      className={classNames("markdown-body", className)}
      linkTarget="_blank"
      skipHtml={skipHtml}
      components={{ img: Image, p: Paragraph }}
      remarkPlugins={[remark2rehype, remarkGfm, remarkSlug, highlight]}
      {...restProps}
    />
  );
};

export default MarkDown;
