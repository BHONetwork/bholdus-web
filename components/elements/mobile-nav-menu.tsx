import { MdClose, MdChevronRight } from "react-icons/md";

import { useLockBodyScroll } from "../../utils/hooks";

import CustomLink from "../common/custom-link";
import Button from "../common/button";
import Text from "../common/text";
import Image from "../common/image";

const MobileNavMenu = ({ navbar, closeSelf }) => {
  useLockBodyScroll();

  return (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-y-scroll bg-darkGrey z-30 pb-10">
      <div className="container flex flex-col">
        <div className="flex flex-row justify-between py-2 items-center">
          <Image
            img={navbar.logo}
            className="object-contain"
            style={{ width: 186, height: 58 }}
          />

          <button onClick={closeSelf}>
            <MdClose className="h-8 w-auto" color="#fff" />
          </button>
        </div>

        <div className="flex flex-col w-full mx-auto">
          <ul className="flex flex-col list-none gap-6 items-baseline mb-10">
            {navbar.links.map((navLink: any) => (
              <li key={navLink.id} className="w-full">
                <CustomLink link={navLink}>
                  <div className="hover:text-gray-900 py-6 flex flex-row justify-between items-center">
                    <Text>{navLink.text}</Text>
                    <MdChevronRight className="h-8 w-auto" color="#fff" />
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul>

          {navbar.button && <Button button={navbar.button} isLink />}
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenu;
