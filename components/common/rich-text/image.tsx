import { omit } from "lodash";

import ImageComponent from "../image";

const Image = (props: any) => {
  const { src, alt, ...restProps } = props;

  return (
    <ImageComponent
      img={{ url: src, alternativeText: alt }}
      {...omit(restProps, ["node", "index", "siblingCount"])}
    />
  );
};

export default Image;
