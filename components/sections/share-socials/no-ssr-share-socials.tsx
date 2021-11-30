import { FacebookShareButton, TelegramShareButton } from "react-share";

import OptimizedImage from "../../common/optimized-image";
import { ShareSocialsProps, SocialType, SocialTypes } from "./types";

const Icon = ({ img }) => <OptimizedImage img={img} width={28} height={28} />;

const socialTypes: SocialTypes = {
  [SocialType.facebook]: {
    Icon: ({ color = "black" }) => (
      <Icon img={{ url: `/images/facebook_${color}.svg` }} />
    ),
    ShareComponent: FacebookShareButton,
  },
  [SocialType.telegram]: {
    Icon: ({ color = "black" }) => (
      <Icon img={{ url: `/images/telegram_${color}.svg` }} />
    ),
    ShareComponent: TelegramShareButton,
  },
};

const ShareSocials = (props: ShareSocialsProps) => {
  const { url, types, color } = props;
  return (
    <>
      {types.map((type, index: number) => {
        if (socialTypes[type]) {
          const { Icon, ShareComponent } = socialTypes[type];
          return (
            <ShareComponent key={index} url={url || window.location.href}>
              <Icon color={color} />
            </ShareComponent>
          );
        }
        return null;
      })}
    </>
  );
};

export default ShareSocials;
