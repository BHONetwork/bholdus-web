import classNames from "classnames";
import React from "react";
import CustomLink from "../../common/custom-link";
import { BreadcrumbItemType, BreadcrumbProps } from "./type";

const Breadcrumb = (props: BreadcrumbProps) => {
  const { breadcrumbList, className } = props;

  if (breadcrumbList && breadcrumbList.length > 0) {
    return (
      <ol className={classNames("breadcrumb", className)}>
        {breadcrumbList.map((breadcrumbItem: BreadcrumbItemType) => (
          <li>
            {breadcrumbItem.link ? (
              <CustomLink link={{ url: breadcrumbItem.link }}>
                {breadcrumbItem.label}
              </CustomLink>
            ) : (
              breadcrumbItem.label
            )}
          </li>
        ))}
      </ol>
    );
  }
  return null;
};

export default Breadcrumb;
