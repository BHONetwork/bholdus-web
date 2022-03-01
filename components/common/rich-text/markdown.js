import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import highlight from "rehype-highlight";
import remark2rehype from "remark-rehype";
import remarkSlug from "remark-slug";
import Image from "./image";
import Paragraph from "./paragraph";
import Heading from "./heading";

const MarkDown = (props) => {
  const { className = "", skipHtml = false, ...restProps } = props;
  return (
    <ReactMarkdown
      className={classNames("markdown-body", className)}
      linkTarget="_blank"
      skipHtml={skipHtml}
      components={{
        img: Image,
        p: Paragraph,
        h1: Heading,
        h2: Heading,
        h3: Heading,
        h4: Heading,
        h5: Heading,
        h6: Heading,
      }}
      remarkPlugins={[remark2rehype, remarkGfm, remarkSlug, highlight]}
      {...restProps}
    />
  );
};

export default MarkDown;
