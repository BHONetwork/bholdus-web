import { omit } from "lodash";

const Paragraph = ({ children, ...restProps }) => {
  const hasImage = !!children.find(
    (child: any) =>
      typeof child === "object" && child.key && !!child.key.match(/img|image/g)
  );
  return hasImage ? (
    children
  ) : (
    <p {...omit(restProps, ["node", "index", "siblingCount"])}>{children}</p>
  );
};

export default Paragraph;
