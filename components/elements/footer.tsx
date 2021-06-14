import classNames from "classnames";

import OptimizedImage from "../common/optimized-image";
import Text from "../common/text";

const Footer = ({ footer }) => {
  return (
    <footer className={classNames("footer-wrap")}>
      <div className="container">
        <div className="footer-container">
          <div className="footer-logo">
            <OptimizedImage img={footer.logo} width={183} height={55} />
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
      </div>
    </footer>
  );
};

export default Footer;
