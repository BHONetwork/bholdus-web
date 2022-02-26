import { omit } from "lodash";

interface HeadingProps {
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

const Heading = (props: HeadingProps) => {
  const { level, children, node, ...restProps } = props;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  let id: string;
  if (node && node.position && node.position.start) {
    const { line, column, offset } = node.position.start;
    id = `h${level}-${line}-${column}-${offset}`;
  }

  return (
    <HeadingTag id={id} {...omit(restProps, ["node"])}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
