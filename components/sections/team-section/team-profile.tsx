import Image from "../../common/image";
import Text from "../../common/text";

import { getSocials } from "../../../lib/api";

const TeamProfile = ({ data }) => {
  const socials = getSocials(data);

  return (
    <div className="flex flex-row">
      <Image
        img={data.avatar}
        className="mr-9"
        rounded
        style={{ width: 130, height: 130 }}
      />
      <div className="flex flex-col text-left">
        <Text type="h4">{data.name}</Text>
        <Text className="mb-5" type="p">
          {data.title}
        </Text>
        {data.bio && (
          <Text className="mb-7" type="p">
            {data.bio}
          </Text>
        )}
        <div className="flex flex-row flex-wrap">
          {socials.map(({ type, url }) => (
            // eslint-disable-next-line
            <a className="mr-2 mb-2" href={url} target="_blank" rel="nofollow">
              <Image
                img={{ url: `../../${type}.svg`, alt: type }}
                style={{ width: 40, height: 40 }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
