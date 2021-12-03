import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import CustomLink from "../../common/custom-link";
import Button from "../../common/button";
import OptimizedImage from "../../common/optimized-image";
import LanguageSelection from "../language-selection";

import supportedLocales from "../../../i18n/localesWithLabel.json";

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
  transparent,
  showAnnouncement,
  topicInfos = null,
}) => {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);

  const showMobileMenu = (show) => {
    if (show) {
      document.querySelector("body").classList.add("noscroll");
      document
        .querySelector(".header #header")
        .classList.add("overflow-inherit");
    } else {
      document.querySelector("body").classList.remove("noscroll");
      document
        .querySelector(".header #header")
        .classList.remove("overflow-inherit");
    }
    setMobileMenuIsShown(show);
    showAnnouncement(!show);
  };

  const router = useRouter();
  const handleRouteChange = () => {
    showMobileMenu(false);
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      showMobileMenu(false);
    });
  }, []);

  return (
    <header id="header">
      <div className="container">
        <div className="header">
          <div className="wrap-logo">
            <CustomLink link={{ url: "/" }}>
              <OptimizedImage
                img={{
                  url: "/images/logo.svg",
                  alternativeText: "bholdus logo",
                }}
                lazy={false}
              />
            </CustomLink>
          </div>
          <div className="wrap-right">
            <div
              className={classNames("wrap-menu", {
                active: mobileMenuIsShown,
              })}
              id="js-menu-mobile"
            >
              <ul className="menu">
                {navbar.links.map((navLink: any) => (
                  <li key={navLink.id} className="menu-item">
                    <CustomLink link={navLink}>{navLink.text}</CustomLink>
                  </li>
                ))}
              </ul>
              <div className="wrap-social-mobile">
                {mobileMenuIsShown && navbar.button && (
                  <button className="login">
                    <Button button={navbar.button} isLink />
                  </button>
                )}
              </div>
            </div>
            {supportedLocales?.length > 0 && (
              <LanguageSelection languages={supportedLocales} />
            )}
            <div className="icon-menu-mobile">
              <div
                className={classNames("icon-show wrap-icon", {
                  active: mobileMenuIsShown,
                })}
                id="js-icon-menu-show"
                onClick={() => showMobileMenu(true)}
              >
                <OptimizedImage
                  img={{
                    url: "/images/menu_show.svg",
                    alternativeText: "menu_show",
                  }}
                  lazy={false}
                />
              </div>

              <div
                className={classNames("icon-close wrap-icon", {
                  active: mobileMenuIsShown,
                })}
                id="js-icon-menu-close"
                onClick={() => showMobileMenu(false)}
              >
                <OptimizedImage
                  img={{
                    url: "/images/menu_close.svg",
                    alternativeText: "menu_close",
                  }}
                  lazy={false}
                />
              </div>
            </div>
            <div className="wrap-social">
              {navbar.button && (
                <button className="login">
                  <Button button={navbar.button} isLink />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
