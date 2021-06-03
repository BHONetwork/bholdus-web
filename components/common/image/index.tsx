import classNames from "classnames";
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

const Image = ({ img, className = "", style = {}, ...restProps }) => {
  return (
    <ImageComponent
      className={classNames(className)}
      style={{ ...style }}
      src={img.url}
      alt={img.alternativeText}
      {...restProps}
    />
  );
};

export default Image;
