import classNames from "classnames";

import OptimizedImage from "../common/optimized-image";
import CustomLink from "../common/custom-link";
import Text from "../common/text";
import Social from "./social";

const Footer = ({ footer }) => {
  return (
    <footer className={classNames("footer-wrap")}>
      <div className="container">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo">
              <OptimizedImage img={footer.logo} width={183} height={50} />
            </div>
            <Social
              className="footer-social"
              social={footer.socials}
              position="top"
            />
            <Text className="footer-copyright">{footer.smallText}</Text>
          </div>
          <div className="footer-right">
            {footer.menu.map((menu: any, index: number) => {
              if (menu.enable)
                return (
                  <div className="menu" key={index}>
                    <div className="menu-title">{menu.title}</div>
                    <ul className="menu-links">
                      {menu.Links.map((link: any, lindex: number) => (
                        <li key={lindex}>
                          <CustomLink link={link}>
                            <Text type="div">{link.text}</Text>
                          </CustomLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              return null;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
