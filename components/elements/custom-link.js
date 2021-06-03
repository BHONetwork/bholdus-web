import Link from "next/link";
import PropTypes from "prop-types";
import { linkPropTypes } from "../../lib/types";

const CustomLink = ({ link, children, ...restProps }) => {
  const isInternalLink = link.url.startsWith("/");

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href={link.url} as={link.url}>
        <a style={{ textDecoration: "none" }}>{children}</a>
      </Link>
    );
  }

  // Plain <a> tags for external links
  return (
    <a
      style={{ textDecoration: "none" }}
      href={link.url}
      // Change target and rel attributes is newTab is turned on
      target={link.newTab ? "_blank" : "_self"}
      rel={link.newTab ? "noopener noreferrer" : ""}
      {...restProps}
    >
      {children}
    </a>
  );
};

CustomLink.propTypes = {
  link: linkPropTypes,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CustomLink;
