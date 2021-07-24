import classNames from "classnames";
import { useEffect, useState } from "react";
import OptimizedImage from "../../common/optimized-image";
import PopOver from "../../common/popover";

const groupByKey = (list, key) =>
  list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );

const Social = ({ className, social, position }) => {
  if (social?.length === 0) return null;
  const groupSocial = groupByKey(social, "type");
  // eslint-disable-next-line array-callback-return
  const socialRender = Object.entries(groupSocial).map(([key, group]) => {
    if (group.length === 1) {
      return (
        <a
          key={key}
          href={group[0].url}
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
      <PopOver key={key} button={buttonSocial} position={position}>
        <ul className="">
          {group.map((social) => (
            <li>{social.title}</li>
          ))}
        </ul>
      </PopOver>
    );
  });
  return (
    <ul className={classNames("social-list", className)}>{socialRender} </ul>
  );
};

export default Social;
