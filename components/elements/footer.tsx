import OptimizedImage from "../common/optimized-image";
import CustomLink from "../common/custom-link";
import Text from "../common/text";
import Social from "./social";

const Footer = ({ footer }) => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="container">
          <div className="footer">
            <div className="logo-copyright">
              <div className="wrap-logo">
                <OptimizedImage
                  img={{
                    url: "/images/logo.svg",
                    alternativeText: "bholdus logo",
                  }}
                  lazy={false}
                />
              </div>
              <p className="copyright">{footer.smallText}</p>
              <Social className="wrap-social" social={footer.socials} />
            </div>
            <div className="nav">
              {footer.menu.map((menu: any, index: number) => {
                if (menu.enable)
                  return (
                    <div className="item-nav" key={index}>
                      <p className="title title-small">{menu.title}</p>
                      <ul className="list">
                        {menu.Links.map((link: any, lindex: number) => (
                          <li className="item" key={lindex}>
                            <CustomLink link={link} className="link">
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
      </div>
    </footer>
  );
};

export default Footer;
