import { useState } from "react";
import PropTypes from "prop-types";
import { MdMenu } from "react-icons/md";
import classNames from "classnames";
import MobileNavMenu from "./mobile-nav-menu";
import Image from "../common/image";
import {
  mediaPropTypes,
  linkPropTypes,
  buttonLinkPropTypes,
} from "../../lib/types";
import CustomLink from "./custom-link";
import Text from "../common/text";
import Button from "../common/button";
import LangDropdown from "./langDropdown";

const Navbar = ({ navbar }) => {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  return (
    <>
      <nav className="py-6 sm:py-2 sticky">
        <div className="container flex flex-row items-center justify-between">
          {/* Navbar items */}
          <div className="flex flex-row items-center">
            <CustomLink link={{ url: "/" }}>
              <Image img={navbar.logo} style={{ width: 186, height: 58 }} />
            </CustomLink>
            <ul className="hidden list-none xl:flex flex-row gap-4 items-baseline ml-10">
              {navbar.links.map((navLink, index) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink}>
                    <Text
                      className={classNames("px-2 py-1", {
                        underline: index === 0,
                      })}
                      type="div"
                    >
                      {navLink.text}
                    </Text>
                  </CustomLink>
                </li>
              ))}
            </ul>

            <LangDropdown />
          </div>

          {/* Hamburger menu on small screens */}
          <button
            onClick={() => setMobileMenuIsShown(true)}
            className="p-1 block xl:hidden"
          >
            <MdMenu className="h-8 w-auto" style={{ color: "white" }} />
          </button>

          {/* CTA button on desktop */}
          {navbar.button && (
            <div className="hidden xl:block">
              <Button button={navbar.button} isLink />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  );
};

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: mediaPropTypes,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
};

export default Navbar;
