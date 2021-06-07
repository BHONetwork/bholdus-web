import { FacebookShareButton, TelegramShareButton } from "react-share";

import Image from "../../common/image";
import { ShareSocialsProps, SocialType, SocialTypes } from "./types";

const Icon = ({ src }) => (
  <Image img={{ url: src }} style={{ width: 28, height: 28 }} />
);

const socialTypes: SocialTypes = {
  [SocialType.facebook]: {
    Icon: () => <Icon src="../../images/facebook_black.svg" />,
    ShareComponent: FacebookShareButton,
  },
  [SocialType.telegram]: {
    Icon: () => <Icon src="../../images/telegram_black.svg" />,
    ShareComponent: TelegramShareButton,
  },
};

const ShareSocials = (props: ShareSocialsProps) => {
  const { url, types } = props;
  return (
    <div className="flex flex-row space-x-2 mb-16">
      {types.map((type) => {
        if (socialTypes[type]) {
          const { Icon, ShareComponent } = socialTypes[type];
          return (
            <ShareComponent url={url || window.location.href}>
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
