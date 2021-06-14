import { MdClose, MdChevronRight } from "react-icons/md";
import classNames from "classnames";

import CustomLink from "../../common/custom-link";
import Button from "../../common/button";
import Text from "../../common/text";
import OptimizedImage from "../../common/optimized-image";

const MobileNavMenu = ({ navbar, closeSelf, mobileMenuIsShown }) => {
  return (
    <div
      className={classNames(
        "w-screen h-screen fixed top-0 left-0 bg-darkGrey z-30 p-2.5 transition-all duration-400",
        {
          "overflow-y-scroll overflow-hidden visible opacity-100 block":
            mobileMenuIsShown,
          "invisible opacity-0": !mobileMenuIsShown,
        }
      )}
    >
      <div className="container flex flex-col ">
        <div className="flex flex-row justify-between items-center md:my-1.5 sm:my-1">
          <OptimizedImage img={navbar.logo} width={183} height={55} />

          <button onClick={closeSelf}>
            <MdClose className="h-14 w-auto" color="#fff" />
          </button>
        </div>

        <div className="flex flex-col w-full mx-auto py-5 px-10">
          <ul className="flex flex-col list-none items-baseline mb-10">
            {navbar.links.map((navLink: any) => (
              <li key={navLink.id} className="w-full">
                <CustomLink
                  link={navLink}
                  className="transition-all duration-200"
                  onClick={closeSelf}
                >
                  <div className="hover:text-gray-900 py-6 flex flex-row justify-between items-center">
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
    </div>
  );
};

export default MobileNavMenu;
