import { styled } from "../../../assets/css/stitches.config";
import { TextProps } from "./types";

const TextComponent = styled("p", {
  fontFamily: "$default",
  letterSpacing: "$normal",
  variants: {
    uppercase: {
      true: {
        textTransform: "uppercase",
      },
    },
    color: {
      white: {
        color: "$white",
      },
      lightGrey: {
        color: "$lightGrey",
      },
      black: {
        color: "$black",
      },
      green: {
        color: "$green2",
      },
    },
    size: {
      small: {
        fontSize: "$small",
      },
      normal: {
        fontSize: "$normal",
      },
      medium: {
        fontSize: "$medium",
      },
      xMedium: {
        fontSize: "$xMedium",
      },
      large: {
        fontSize: "$large",
      },
      xLarge: {
        fontSize: "$xLarge",
      },
    },
    weight: {
      normal: {
        fontWeight: "$normal",
      },
      semiBold: {
        fontWeight: "$semiBold",
      },
      bold: {
        fontWeight: "$bold",
      },
    },
    type: {
      div: {
        color: "$white",
        fontSize: "$normal",
        fontWeight: "$normal",
      },
      p: {
        color: "$white",
        fontSize: "$normal",
        fontWeight: "$normal",
      },
      h1: {
        color: "$white",
        fontSize: "$xLarge",
        fontWeight: "$bold",
      },
      h2: {
        color: "$white",
        fontSize: "$large",
        fontWeight: "$bold",
      },
      h3: {
        color: "$white",
        fontSize: "$large",
        fontWeight: "$bold",
      },
      h4: {
        color: "$white",
        fontSize: "$xMedium",
        fontWeight: "$bold",
      },
      h5: {
        color: "$lightGrey",
        fontSize: "$medium",
        fontWeight: "$normal",
      },
      h6: {
        color: "$white",
        fontSize: "$normal",
        fontWeight: "$normal",
      },
    },
  },
  defaultVariants: {
    color: "white",
    weight: "normal",
    size: "normal",
  },
});

const Text = (props: TextProps) => {
  const { children, type = "div", ...restProps } = props;
  return (
    <TextComponent as={type} type={type} {...restProps}>
      {children}
    </TextComponent>
  );
};

export default Text;
