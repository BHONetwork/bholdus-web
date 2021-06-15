import classNames from "classnames";
import LazyLoad from "react-lazyload";

import { styled } from "../../../assets/css/stitches.config";

const ImageComponent = styled("img", {
  variants: {
    rounded: {
      true: {
        borderRadius: "50%",
      },
    },
  },
});

const Image = ({
  img,
  className = "",
  style = {},
  lazy = true,
  ...restProps
}) => {
  const Component = () => (
    <ImageComponent
      className={classNames(className)}
      style={{ ...style }}
      src={img.url}
      alt={img.alternativeText}
      {...restProps}
    />
  );
  if (lazy) {
    return (
      <LazyLoad height="100%" offset={200} once>
        <Component />
      </LazyLoad>
    );
  }
  return <Component />;
};

export default Image;
