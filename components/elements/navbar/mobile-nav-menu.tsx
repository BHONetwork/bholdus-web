import { MdClose, MdChevronRight } from "react-icons/md";
import classNames from "classnames";
import SubNav from "./sub-nav";
import CustomLink from "../../common/custom-link";
import Button from "../../common/button";
import Text from "../../common/text";
import OptimizedImage from "../../common/optimized-image";

const MobileNavMenu = ({ navbar, subnav, closeSelf, mobileMenuIsShown }) => {
  return (
    <div
      className={classNames("navbar-mobile", {
        "overflow-y-scroll overflow-hidden visible opacity-100 block":
          mobileMenuIsShown,
        "invisible opacity-0": !mobileMenuIsShown,
      })}
    >
      <div className="container navbar-mobile-container">
        <div className="navbar-mobile-content">
          <div className="navbar-mobile-logo">
            <OptimizedImage
              img={navbar.logo}
              width={183}
              height={50}
              loading="eager"
            />

            <button onClick={closeSelf}>
              <MdClose className="navbar-mobile-close" color="#fff" />
            </button>
          </div>

          <div className="navbar-mobile-menu">
            <ul className="flex flex-col list-none items-baseline mb-10">
              {navbar.links.map((navLink: any) => (
                <li key={navLink.id}>
                  <CustomLink
                    link={navLink}
                    className="transition-all duration-200"
                    onClick={closeSelf}
                  >
                    <div className="navbar-mobile-menu-item">
                      <Text>{navLink.text}</Text>
                      <MdChevronRight className="h-8 w-auto" color="#fff" />
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          {navbar.button && (
            <div className="flex justify-center">
              <Button button={navbar.button} isLink />
            </div>
          )}
        </div>

        <SubNav subnav={subnav} popoverPossition="top" />
      </div>
    </div>
  );
};

export default MobileNavMenu;
