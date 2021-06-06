/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

import Text from "../common/text";

const NextLink = ({ pathname, asPath, locale, children, ...restProps }) => {
  return (
    <Link href={pathname} as={asPath} locale={locale}>
      <a style={{ textDecoration: "none" }} {...restProps}>
        {children}
      </a>
    </Link>
  );
};

const LanguageSelection = ({ languages }) => {
  const router = useRouter();
  const { pathname, asPath, locale } = router;

  return (
    <Menu as="div" className="relative inline-block text-left ml-4">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 focus:outline-none">
              <Text type="div">{locale}</Text>
              <MdKeyboardArrowDown
                className="-mr-1 ml-2 mt-1 h-5 w-5"
                style={{ color: "white" }}
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-2 pr-2 bg-darkGrey rounded-md focus:outline-none z-20">
              <div className="px-4 py-2">
                {languages.map((language: any, index: number) => (
                  <Menu.Item key={index}>
                    {() => (
                      <NextLink
                        className="flex flex-row items-center"
                        pathname={pathname}
                        asPath={asPath}
                        locale={language.code}
                      >
                        <Text size="normal" className="whitespace-nowrap mr-2">
                          {language.name}
                        </Text>
                        {locale === language.code && (
                          <MdCheck
                            className="flex-shrink-0"
                            color="#fff"
                            size={15}
                          />
                        )}
                      </NextLink>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default LanguageSelection;
