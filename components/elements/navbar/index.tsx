import { useEffect, useRef, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import classNames from "classnames";
import { useRouter } from "next/router";

import MobileNavMenu from "./mobile-nav-menu";
import SubNav from "./sub-nav";
import CustomLink from "../../common/custom-link";
import Text from "../../common/text";
import Button from "../../common/button";
import OptimizedImage from "../../common/optimized-image";
import ShareSocials from "../../sections/share-socials";
import LanguageSelection from "../language-selection";

import supportedLocales from "../../../i18n/localesWithLabel.json";
import { TopicList } from "../../../pages/blog/[page]";

const SearchInput = ({ isSearchExpand, setIsSearchExpand }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const { query } = router;
  const [searchValue, setSearchValue] = useState(query.q || "");
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchValue) {
      setIsSearchExpand(false);
      router.push(`/search?q=${searchValue}`);
    }
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        isSearchExpand &&
        e.target &&
        searchRef &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setIsSearchExpand(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("click", handleClickOutSide);
      return () => {
        window.removeEventListener("click", handleClickOutSide);
      };
    }
  }, [isSearchExpand, setIsSearchExpand]);

  const onClickSearchIcon = () => {
    if (isSearchExpand) {
      if (searchValue) {
        setIsSearchExpand(false);
        router.push(`/search?q=${searchValue}`);
      }
    } else {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }

      setIsSearchExpand(true);
    }
  };

  return (
    <div ref={searchRef} className="search-wrapper relative">
      <form action="/search" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          className={classNames("search-input px-4 py-3 border", {
            expanded: isSearchExpand,
          })}
          name="q"
          type="text"
          placeholder="Search ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <div className="search-icon" onClick={onClickSearchIcon}>
        <OptimizedImage
          img={{
            url: "/images/search.svg",
            alternativeText: "search-icon",
          }}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

const Navbar = ({
  navbar,
  subnav,
  transparent,
  showAnnouncement,
  topicInfos = null,
}) => {
  const router = useRouter();
  const isBlogPage =
    router.route.indexOf("/blog/") > -1 || router.route.indexOf("/search") > -1;

  const [isScrolling, setIsScrolling] = useState(false);
  const [isSearchExpand, setIsSearchExpand] = useState(false);

  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  const [mobileBlogMenuIsShown, setMobileBlogMenuIsShown] = useState(false);

  const showMobileMenu = (show) => {
    if (show) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
    setMobileMenuIsShown(show);
    showAnnouncement(!show);
  };

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
          "blog-nav": isBlogPage,
          "search-expanded": isSearchExpand,
        }
      )}
    >
      <SubNav subnav={subnav} />
      <nav className={classNames("navbar-primary")}>
        <div className="container navbar-primary-container">
          {isBlogPage && (
            <>
              {/* Hamburger menu on small screens */}
              <button
                onClick={() => setMobileBlogMenuIsShown(!mobileBlogMenuIsShown)}
                className="mobile-nav-blog-menu p-1 block lg:hidden"
                aria-label="hamburger-menu"
              >
                {mobileBlogMenuIsShown ? (
                  <MdClose className="h-8 w-auto" />
                ) : (
                  <MdMenu className="h-8 w-auto" />
                )}
              </button>
              <div className="justify-start items-center hidden lg:flex">
                <ShareSocials types={["facebook", "telegram"]} color="blue" />
              </div>
            </>
          )}
          <div className="logo-wrapper flex justify-start items-center">
            <CustomLink link={{ url: "/#" }}>
              <OptimizedImage
                img={isBlogPage ? navbar.logo_blue : navbar.logo}
                className="navbar-primary-logo"
                width={183}
                height={50}
                loading="eager"
              />
            </CustomLink>
          </div>
          {isBlogPage ? (
            <SearchInput
              isSearchExpand={isSearchExpand}
              setIsSearchExpand={setIsSearchExpand}
            />
          ) : (
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
                onClick={() => showMobileMenu(true)}
                className="mobile-nav-menu p-1 block lg:hidden"
                aria-label="hamburger-menu"
              >
                <MdMenu className="h-8 w-auto" color="#fff" />
              </button>

              {/* CTA button on large screens */}
              {navbar.button && (
                <div className="hidden lg:block ml-6">
                  <Button button={navbar.button} isLink />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {isBlogPage && (
        <div className="container mt-3 sm:mt-3 md:mt-7">
          <TopicList
            className={classNames({
              showed: mobileBlogMenuIsShown,
            })}
            setMobileBlogMenuIsShown={setMobileBlogMenuIsShown}
            topicInfos={topicInfos}
          />
        </div>
      )}

      {!isBlogPage && (
        // Mobile menu
        <MobileNavMenu
          navbar={navbar}
          subnav={subnav}
          closeSelf={() => showMobileMenu(false)}
          mobileMenuIsShown={mobileMenuIsShown}
        />
      )}
    </header>
  );
};

export default Navbar;
