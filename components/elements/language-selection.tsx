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
    <Menu as="div" className="language">
      {({ open }) => (
        <>
          <Menu.Button className="language-menu">
            <div>{locale}</div>
            <MdKeyboardArrowDown style={{ color: "white" }} />
          </Menu.Button>

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
            <Menu.Items className="language-content">
              {languages.map((language: any, index: number) => (
                <Menu.Item key={index}>
                  {() => (
                    <NextLink
                      className="flex flex-row items-center"
                      pathname={pathname}
                      asPath={asPath}
                      locale={language.code}
                    >
                      <p>{language.name}</p>
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
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default LanguageSelection;
