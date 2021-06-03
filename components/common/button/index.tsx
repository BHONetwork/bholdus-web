import React from "react";
import { styled } from "../../../assets/css/stitches.config";
import CustomLink from "../../elements/custom-link";

const ButtonComponent = styled("button", {
  padding: "1rem 2.8rem",
  fontFamily: "$default",
  textAlign: "center",
  fontSize: "$normal",
  variants: {
    color: {
      green: {
        background: "$green",
      },
      pink: {
        background: "$pink",
      },
      orange: {
        background: "$orange",
      },
      purple: {
        background: "$purple",
      },
    },
    type: {
      primary: {
        background: "$green",
        color: "$white",
      },
      secondary: {
        background: "$white",
        color: "$green2",
      },
    },
    border: {
      rounded: {
        borderRadius: 2,
      },
      roundedMd: {
        borderRadius: 5,
      },
    },
  },
  defaultVariants: {
    type: "primary",
    border: "rounded",
  },
});

export type ButtonProps = any;

const Button = (props: ButtonProps) => {
  const { button, icon, isLink, children, ...restProps } = props;

  const Component = ({ as = "button" }) => (
    <ButtonComponent as={as} {...restProps}>
      {React.isValidElement(children) ? (
        children
      ) : (
        <>
          {/* {icon && <Icon icon={icon}/>} */}
          <div>{button.text}</div>
        </>
      )}
    </ButtonComponent>
  );

  if (isLink) {
    return (
      <CustomLink link={{ url: button.url, newTab: button.newTab }}>
        <Component as="div" />
      </CustomLink>
    );
  }
  return <Component />;
};

export default Button;
