import { Enum } from "@martin_hotell/rex-tils";
import { CSSProperties } from "react";
import { styled } from "../../../assets/css/stitches.config";

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
      p: {
        color: "$white",
        fontSize: "$normal",
        fontWeight: "$normal",
      },
      div: {
        color: "$white",
        fontSize: "$normal",
        fontWeight: "$normal",
      },
      label: {
        color: "$white",
        fontSize: "$normal",
        fontWeight: "$bold",
      },
      title: {
        color: "$white",
        fontSize: "$xMedium",
        fontWeight: "$bold",
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

export const TextTypes = Enum(
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "p",
  "label",
  "title"
);
export type TextTypes = Enum<typeof TextTypes>;

export type TextProps = {
  type?: TextTypes;
  uppercase?: boolean;
  children: React.ReactText;
  style?: CSSProperties;
  [other: string]: any;
};

const Text = (props: TextProps) => {
  const { children, type = "div", ...restProps } = props;
  return (
    <TextComponent as={type} type={type} {...restProps}>
      {children}
    </TextComponent>
  );
};

export default Text;
