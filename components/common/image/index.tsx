import classNames from "classnames";
import LazyLoad from "react-lazyload";

// import { styled } from "../../../assets/css/stitches.config";

// const ImageComponent = styled("img", {
//   variants: {
//     rounded: {
//       true: {
//         borderRadius: "50%",
//       },
//     },
//   },
// });

const Image = ({
  img,
  className = "",
  classWrapName = "",
  style = {},
  lazy = true,
  ...restProps
}) => {
  const url = img?.url
    ? img.url.replace(
        "bholdus.s3.ap-southeast-1.amazonaws.com",
        "cdn.bholdus.com"
      )
    : null;
  if (!url) return null;
  const Component = () => (
    <img
      className={classNames(className)}
      style={{ ...style }}
      src={url}
      alt={img.alternativeText}
      {...restProps}
    />
  );
  if (lazy) {
    return (
      <LazyLoad
        className={classNames(classWrapName)}
        height="100%"
        offset={200}
        once
      >
        <Component />
      </LazyLoad>
    );
  }
  return <Component />;
};

export default Image;
