import classNames from "classnames";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";

import HeadingIndex from "./HeadingIndex";

import { ArticleTableOfContentsProps } from "./type";

const emptyFunc = () => null;

const ArticleTableOfContents = (props: ArticleTableOfContentsProps) => {
  const { t } = useTranslation();
  const { className, article, ...restProps } = props;

  if (article) {
    const { content } = article;

    if (content) {
      return (
        <ol
          className={classNames("table-of-contents article", className)}
          data-title={t("common:tableOfContents")}
        >
          <ReactMarkdown
            className="table-of-contents-heading"
            unwrapDisallowed
            components={{
              a: emptyFunc,
              p: emptyFunc,
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
