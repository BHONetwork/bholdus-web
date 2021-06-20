import classNames from "classnames";

import OptimizedImage from "../common/optimized-image";
import CustomLink from "../common/custom-link";
import Text from "../common/text";

const Footer = ({ footer }) => {
  return (
    <footer className={classNames("footer-wrap")}>
      <div className="container">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo">
              <OptimizedImage img={footer.logo} width={183} height={50} />
            </div>

            <div className="footer-social">
              {footer.socials.map((social: any) => (
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
