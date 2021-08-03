import classNames from "classnames";
import NextImage from "next/image";
import { ImageProps } from "./types";
import Image from "../image";

const OptimizedImage = (props: ImageProps) => {
  const {
    className,
    img,
    layout = "fixed",
    width,
    height,
    ...restProps
  } = props;
  if (img?.url) {
    if (layout === "fill" || !width || !height) {
      return (
        <Image
          className={classNames(className, "image-fill")}
          img={img}
          alt={img.alternativeText}
          {...restProps}
        />
      );
    }
    return (
      <Image
        className={classNames(className, "image-fill")}
        img={img}
        alt={img.alternativeText}
        width={width}
        height={height}
        {...restProps}
      />
    );

    if (layout === "fill" || !width || !height) {
      return (
        <NextImage
          className={classNames(className)}
          src={img.url}
          alt={img.alternativeText}
          layout="fill"
          {...restProps}
        />
      );
    }

    return (
      <NextImage
        className={classNames(className)}
        src={img.url}
        alt={img.alternativeText}
        width={width}
        height={height}
        layout={layout}
        {...restProps}
      />
    );
  }
  return null;
};

export default OptimizedImage;
