import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import classNames from "classnames";

import MobileNavMenu from "./mobile-nav-menu";
import SubNav from "./sub-nav";
import CustomLink from "../../common/custom-link";
import Text from "../../common/text";
import Button from "../../common/button";
import OptimizedImage from "../../common/optimized-image";
import LanguageSelection from "../language-selection";

import supportedLocales from "../../../i18n/localesWithLabel.json";

const Navbar = ({ navbar, subnav, transparent, showAnnouncement }) => {
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
      <SubNav subnav={subnav} popoverPossition="bottom" />
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
              onClick={() => {
                setMobileMenuIsShown(true);
                showAnnouncement(false);
              }}
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
        subnav={subnav}
        closeSelf={() => {
          setMobileMenuIsShown(false);
          showAnnouncement(true);
        }}
        mobileMenuIsShown={mobileMenuIsShown}
      />
    </header>
  );
};

export default Navbar;
