import classNames from "classnames";
import React from "react";
import { styled } from "../../../assets/css/stitches.config";

import CustomLink from "../../common/custom-link";
import Loader from "../../elements/loader";

import { ButtonProps } from "./types";

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
    buttonType: {
      primary: {
        background: "$green",
        color: "$white",
      },
      secondary: {
        background: "$white",
        color: "$green2",
      },
      disabled: {
        background: "$darkGrey",
        color: "$white",
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
    buttonType: "primary",
    border: "rounded",
  },
});

const Button = (props: ButtonProps) => {
  const {
    button,
    isLink = false,
    loading = false,
    children,
    ...restProps
  } = props;

  const Component = (componentProps: any) => (
    <ButtonComponent
      className={classNames({
        "flex flex-row items-center justify-center": loading,
      })}
      {...restProps}
      {...componentProps}
    >
      {loading && <Loader />}
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
