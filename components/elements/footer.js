import classnames from "classnames";

import Image from "../common/image";
import Text from "../common/text";
import CustomLink from "./custom-link";

const Footer = ({ footer, className, children, displayBackground = false }) => {
  return (
    <footer
      className={classnames(className, {
        "bg-footer bg-cover": displayBackground,
      })}
    >
      <div className="container flex flex-col flex-1 justify-between">
        <div>{children}</div>
        <div className="flex flex-col lg:space-y-0 space-y-10 lg:gap-0 lg:flex-row items-center justify-between my-20">
          <CustomLink link={{ url: "/" }}>
            <Image img={footer.logo} style={{ width: 186, height: 58 }} />
          </CustomLink>
          <div className="flex flex-row items-center gap-1 ml-0 lg:ml-24">
            <Image
              img={{ url: "../../images/facebook_grey.svg" }}
              style={{ width: 28, height: 28 }}
            />
            <Image
              img={{ url: "../../images/instagram_grey.svg" }}
              style={{ width: 28, height: 28 }}
            />
            <Image
              img={{ url: "../../images/telegram_grey.svg" }}
              style={{ width: 28, height: 28 }}
            />
          </div>
          <Text size="medium">{footer.smallText}</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
