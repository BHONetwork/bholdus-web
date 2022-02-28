import { omit } from "lodash";

interface HeadingIndexProps {
  level: number;
  children?: React.ReactNode;
  index?: number;
  siblingCount?: number;
  node?: {
    position: {
      start: { line: number; column: number; offset: number };
      [other: string]: any;
    };
    [other: string]: any;
  };
}

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

const HeadingIndex = (props: HeadingIndexProps) => {
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
