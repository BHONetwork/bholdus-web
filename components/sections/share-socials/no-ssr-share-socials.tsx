import { FacebookShareButton, TelegramShareButton } from "react-share";

import OptimizedImage from "../../common/optimized-image";
import { ShareSocialsProps, SocialType, SocialTypes } from "./types";

const Icon = ({ img }) => <OptimizedImage img={img} width={28} height={28} />;

const socialTypes: SocialTypes = {
  [SocialType.facebook]: {
    Icon: () => <Icon img={{ url: "/images/facebook_black.svg" }} />,
    ShareComponent: FacebookShareButton,
  },
  [SocialType.telegram]: {
    Icon: () => <Icon img={{ url: "/images/telegram_black.svg" }} />,
    ShareComponent: TelegramShareButton,
  },
};

const ShareSocials = (props: ShareSocialsProps) => {
  const { url, types } = props;
  return (
    <div className="flex flex-row space-x-2 mb-16">
      {types.map((type, index: number) => {
        if (socialTypes[type]) {
          const { Icon, ShareComponent } = socialTypes[type];
          return (
            <ShareComponent key={index} url={url || window.location.href}>
              <Icon />
            </ShareComponent>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ShareSocials;
