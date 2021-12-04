import classNames from "classnames";
import OptimizedImage from "../../common/optimized-image";
import PopOver from "../../common/popover";

import { groupByKey } from "../../../utils/others";

const Social = ({ className, social }) => {
  if (social?.length === 0) return null;
  const groupSocial = groupByKey(social, "type");
  // eslint-disable-next-line array-callback-return
  const socialRender = Object.keys(groupSocial).map((key, index) => {
    const group = groupSocial[key];
    if (group.length === 1) {
      return (
        <a
          key={key}
          href={group[0].url}
          className="social-item"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <OptimizedImage
            img={{
              url: `/images/f-${group[0].type}.svg`,
              alternativeText: group[0].type,
            }}
            width={28}
            height={28}
          />
        </a>
      );
    }
    const buttonSocial = () => (
      <OptimizedImage
        img={{
          url: `/images/f-${key}.svg`,
          alternativeText: key,
        }}
        width={28}
        height={28}
      />
    );
    return (
      <PopOver key={index} button={buttonSocial}>
        <div className="social-urls">
          {group.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {social.title}
            </a>
          ))}
        </div>
      </PopOver>
    );
  });
  return (
    <div className={classNames("social-list", className)}>{socialRender} </div>
  );
};

export default Social;
