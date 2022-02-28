import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

import HeadingIndex from "./HeadingIndex";

import { ArticleTableOfContentsProps } from "./type";

const emptyFunc = () => null;
const ArticleTableOfContents = (props: ArticleTableOfContentsProps) => {
  const tocWrapperRef = useRef<HTMLOListElement>();
  const { t } = useTranslation();
  const { className, article } = props;

  useEffect(() => {
    const childElement = tocWrapperRef.current.querySelectorAll("*");
    if (childElement.length > 0) {
      tocWrapperRef.current.style.display = "block";
    } else {
      tocWrapperRef.current.style.display = "none";
    }
  });

  if (article) {
    const { content } = article;

    if (content) {
      return (
        <ol
          ref={tocWrapperRef}
          className={classNames(
            "table-of-contents table-of-contents-article",
            className
          )}
          data-title={t("common:tableOfContents")}
        >
          <ReactMarkdown
            includeElementIndex
            components={{
              a: emptyFunc,
              p: emptyFunc,
              text: emptyFunc,
              ol: emptyFunc,
              ul: emptyFunc,
              li: emptyFunc,
              img: emptyFunc,
              code: emptyFunc,
              blockquote: emptyFunc,
              q: emptyFunc,
              strong: emptyFunc,
              b: emptyFunc,
              em: emptyFunc,
              i: emptyFunc,
              u: emptyFunc,
              ins: emptyFunc,
              s: emptyFunc,
              del: emptyFunc,
              h1: HeadingIndex,
              h2: HeadingIndex,
              h3: HeadingIndex,
              h4: HeadingIndex,
              h5: HeadingIndex,
              h6: HeadingIndex,
            }}
          >
            {content}
          </ReactMarkdown>
        </ol>
      );
    }

    return null;
  }
  return null;
};

export default ArticleTableOfContents;
