/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import Text from "../common/text";

const NextLink = ({ pathname, asPath, locale, children, ...restProps }) => {
  return (
    <Link href={pathname} as={asPath} locale={locale}>
      <a {...restProps}>{children}</a>
    </Link>
  );
};

export default function Example() {
  const router = useRouter();
  const { pathname, asPath, locale } = router;

  return (
    <Menu
      as="div"
      className="relative inline-block text-left bg-transparent ml-4"
    >
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 bg-darkGrey rounded-md focus:outline-none">
              <div className="px-4 py-2">
                <Menu.Item>
                  {({ active }) => (
                    <NextLink pathname={pathname} asPath={asPath} locale="en">
                      <Text size="normal" className="whitespace-nowrap">
                        en (English)
                      </Text>
                    </NextLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <NextLink pathname={pathname} asPath={asPath} locale="vi">
                      <Text size="normal" className="whitespace-nowrap">
                        vi (Tiếng Việt)
                      </Text>
                    </NextLink>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
