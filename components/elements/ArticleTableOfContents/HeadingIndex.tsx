import { omit } from "lodash";

const getChildrenText = (children) => {
  if (children) {
    let digDeep = children;
    while (digDeep && digDeep[0] && typeof digDeep[0] !== "string") {
      if (digDeep[0].props && digDeep[0].props.children) {
        digDeep = digDeep[0].props.children;
      }
    }
    return digDeep;
  }
  return children;
};

const HeadingIndex = (props: any) => {
  const { level, children, node, index, siblingCount, ...restProps } = props;

  const HeadingIndexTag = "li" as keyof JSX.IntrinsicElements;

  let id: string;
  if (typeof index !== undefined) {
    id = `h${level}-${index}`;
  }

  return (
    <HeadingIndexTag
      {...omit(restProps, ["node", "index", "siblingCount"])}
      className={`heading-index-item level-${level}`}
    >
      <a href={`#${id}`}>{getChildrenText(children)}</a>
    </HeadingIndexTag>
  );
};

export default HeadingIndex;
