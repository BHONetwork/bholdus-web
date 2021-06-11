import classNames from "classnames";

import Image from "../common/image";
import Text from "../common/text";

const Footer = ({ footer, className = "", children }) => {
  return (
    <footer className="container footer-wrap">
      <div>{children}</div>
      <div className="footer-container">
        <div className="footer-logo">
          <Image img={footer.logo} />
        </div>

        <div className="footer-social">
          {footer.socials.map((social: any) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <Image
                img={{
                  url: `/images/${social.type}_grey.svg`,
                  alternativeText: social.type,
                }}
                style={{ width: 28, height: 28 }}
              />
            </a>
          ))}
        </div>
        <Text className="footer-copyright">{footer.smallText}</Text>
      </div>
    </footer>
  );
};

export default Footer;
