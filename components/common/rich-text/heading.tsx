import { omit } from "lodash";

interface HeadingProps {
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

const Heading = (props: HeadingProps) => {
  const { level, children, node, index, siblingCount, ...restProps } = props;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  let id: string;
  if (typeof index !== undefined) {
    id = `h${level}-${index}`;
  }

  return (
    <HeadingTag id={id} {...omit(restProps, ["node", "index", "siblingCount"])}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
