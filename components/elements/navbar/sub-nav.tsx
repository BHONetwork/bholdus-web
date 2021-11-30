import classNames from "classnames";

import CustomLink from "../../common/custom-link";
import LanguageSelection from "../language-selection";
import supportedLocales from "../../../i18n/localesWithLabel.json";
import Social from "../social";

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
                    <div className={classNames("px-2 py-1 navbar-second-link")}>
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
            <Social className="navbar-second-socials" social={subnav.social} />
          </div>
        </div>
      </nav>
    );
  return null;
};

export default renderSubNav;
