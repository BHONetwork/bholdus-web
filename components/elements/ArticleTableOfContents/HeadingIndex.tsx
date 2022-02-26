import { omit } from "lodash";

interface HeadingIndexProps {
  level: number;
  children?: React.ReactNode;
  node?: {
    position: {
      start: { line: number; column: number; offset: number };
      [other: string]: any;
    };
    [other: string]: any;
  };
}

const HeadingIndex = (props: HeadingIndexProps) => {
  const { level, children, node, ...restProps } = props;

  const HeadingIndexTag = "li" as keyof JSX.IntrinsicElements;

  let id: string;
  if (node && node.position && node.position.start) {
    const { line, column, offset } = node.position.start;
    id = `h${level}-${line}-${column}-${offset}`;
  }

  return (
    <HeadingIndexTag
      {...omit(restProps, ["node"])}
      className={`heading-index-item level-${level}`}
    >
      <a href={`#${id}`}>{children}</a>
    </HeadingIndexTag>
  );
};

export default HeadingIndex;
