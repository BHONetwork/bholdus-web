import Link from "next/link";
import { useRouter } from "next/router";

import { CustomLinkProps } from "./types";

const CustomLink = (props: CustomLinkProps) => {
  const { link, children, ...restProps } = props;

  const router = useRouter();
  const { locale } = router;

  const isInternalLink = link.url.startsWith("/");

  if (isInternalLink) {
    return (
      <Link href={link.url} as={link.asPath || link.url} locale={locale}>
        <a style={{ textDecoration: "none" }} {...restProps}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    // eslint-disable-next-line
    <a
      style={{ textDecoration: "none" }}
      href={link.url}
      target={link.newTab ? "_blank" : "_self"}
      rel={link.newTab ? "noopener noreferrer" : ""}
      {...restProps}
    >
      {children}
    </a>
  );
};

export default CustomLink;
