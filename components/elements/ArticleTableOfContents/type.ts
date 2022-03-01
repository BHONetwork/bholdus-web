export interface ArticleTableOfContentsProps {
  className?: string;
  article: {
    content: string;
    slug: string;
    [other: string]: any;
  };
}
