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
    capitalized: {
      true: {
        textTransform: "capitalize",
      },
    },
    color: {
      white: {
        color: "$white",
      },
      grey: {
        color: "$grey",
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
      red: {
        color: "$brightRed",
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
    type: {
      div: {
        fontSize: "$normal",
        fontWeight: "$normal",
      },
      p: {
        fontSize: "$normal",
        fontWeight: "$normal",
      },
      h1: {
        fontSize: "$xLarge",
        fontWeight: "$bold",
      },
      h2: {
        fontSize: "$large",
        fontWeight: "$bold",
      },
      h3: {
        fontSize: "$large",
        fontWeight: "$bold",
      },
      h4: {
        fontSize: "$xMedium",
        fontWeight: "$bold",
      },
      h5: {
        fontSize: "$medium",
        fontWeight: "$normal",
      },
      h6: {
        fontSize: "$normal",
        fontWeight: "$normal",
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
