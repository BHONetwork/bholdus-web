import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import classNames from "classnames";

import MobileNavMenu from "./mobile-nav-menu";
import CustomLink from "../../common/custom-link";
import Text from "../../common/text";
import Button from "../../common/button";
import OptimizedImage from "../../common/optimized-image";
import LanguageSelection from "../language-selection";

import supportedLocales from "../../../i18n/localesWithLabel.json";

const Navbar = ({ navbar, subnav, transparent }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const windowsScrollTop = window.pageYOffset;
      let offsetFromOtherElement = 0;
      if (document.getElementById("notification-banner")) {
        offsetFromOtherElement = document.getElementById(
          "notification-banner"
        ).clientHeight;
      }
      if (windowsScrollTop >= offsetFromOtherElement + 10) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
    return () => setIsScrolling(false);
  }, []);

  const renderSubNav = () => {
    if (subnav?.enable)
      return (
        <nav className="navbar-second">
          <div className="navbar-second-container container">
            <div className="navbar-second-left">
              {supportedLocales?.length > 0 && subnav.enable && (
                <LanguageSelection languages={supportedLocales} />
              )}
            </div>
            <div className="navbar-second-right">
              <ul className="navbar-second-links">
                {subnav.links.map((navLink: any) => (
                  <li key={navLink.id}>
                    <CustomLink link={navLink}>
                      <Text
                        className={classNames("px-2 py-1 navbar-second-link")}
                        type="div"
                      >
                        {navLink.text}
                      </Text>
                    </CustomLink>
                  </li>
                ))}
              </ul>
              <div className="navbar-second-socials">
                {subnav.social.map((social: any) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <OptimizedImage
                      img={{
                        url: `/images/f-${social.type}.svg`,
                        alternativeText: social.type,
                      }}
                      width={28}
                      height={28}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      );
    return null;
  };

  return (
    <header
      className={classNames(
        "navbar",
        {
          sticky: isScrolling,
        },
        {
          "bg-darkGrey2 top-0 md:py-0": !transparent,
          "top-3 md:top-0": transparent,
        }
      )}
    >
      {renderSubNav()}
      <nav className={classNames("navbar-primary")}>
        <div className="container navbar-primary-container">
          <div className="flex justify-start items-center">
            <CustomLink link={{ url: "/" }}>
              <OptimizedImage
                img={navbar.logo}
                width={183}
                height={50}
                loading="eager"
              />
            </CustomLink>
          </div>
          <div className="flex flex-row items-center justify-end">
            <ul className="hidden list-none lg:flex flex-row gap-4 items-baseline ml-10">
              {navbar.links.map((navLink: any) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink}>
                    <Text className={classNames("px-2 py-1")} type="div">
                      {navLink.text}
                    </Text>
                  </CustomLink>
                </li>
              ))}
            </ul>
            {supportedLocales?.length > 0 && !subnav?.enable && (
              <LanguageSelection languages={supportedLocales} />
            )}
            {/* Hamburger menu on small screens */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block lg:hidden"
              aria-label="hamburger-menu"
            >
              <MdMenu className="h-8 w-auto" color="#fff" />
            </button>

            {/* CTA button on large screens */}
            {navbar.button && (
              <div className="hidden lg:block">
                <Button button={navbar.button} isLink />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileNavMenu
        navbar={navbar}
        closeSelf={() => setMobileMenuIsShown(false)}
        mobileMenuIsShown={mobileMenuIsShown}
      />
    </header>
  );
};

export default Navbar;
