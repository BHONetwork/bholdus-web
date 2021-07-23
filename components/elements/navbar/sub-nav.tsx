import classNames from "classnames";

import CustomLink from "../../common/custom-link";
import Text from "../../common/text";
import LanguageSelection from "../language-selection";
import supportedLocales from "../../../i18n/localesWithLabel.json";
import OptimizedImage from "../../common/optimized-image";

const renderSubNav = ({ subnav }) => {
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

export default renderSubNav;
