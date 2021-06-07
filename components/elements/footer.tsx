import classNames from "classnames";

import Image from "../common/image";
import Text from "../common/text";

const Footer = ({
  footer,
  className = "",
  children,
  displayBackground = false,
}) => {
  return (
    <footer
      className={classNames(className, {
        "bg-footer bg-cover": displayBackground,
      })}
    >
      <div className="container flex flex-col flex-1 justify-between">
        <div>{children}</div>
        <div className="flex flex-col lg:space-y-0 space-y-10 lg:gap-0 lg:flex-row items-center justify-between my-20">
          <Image img={footer.logo} style={{ width: 186, height: 58 }} />

          <div className="flex flex-row items-center gap-1 ml-0 lg:ml-24 lg:space-x-0 space-x-2">
            {footer.socials.map((social: any) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <Image
                  img={{ url: `../../images/${social.type}_grey.svg` }}
                  style={{ width: 28, height: 28 }}
                />
              </a>
            ))}
          </div>
          <Text className="text-center" size="medium">
            {footer.smallText}
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
